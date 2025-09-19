import {Command, Flags, Args} from '@oclif/core';
import {StorageManager} from '../../utils/storage.js';
import {ShopifyAPI} from '../../utils/shopify.js';
import inquirer from 'inquirer';

export default class StoreSearch extends Command {
  static description = 'Search for themes by keyword in a specific store';

  static examples = [
    '<%= config.bin %> <%= command.id %> "dark"',
    '<%= config.bin %> <%= command.id %> "theme" --store my-store',
  ];

  static flags = {
    store: Flags.string({
      char: 's',
      description: 'Store name to search themes in',
    }),
  };

  static args = {
    keyword: Args.string({
      description: 'Keyword to search for in theme names',
      required: true,
    }),
  };

  public async run(): Promise<void> {
    const {args, flags} = await this.parse(StoreSearch);
    const {keyword} = args;
    const {store: storeFlag} = flags;

    const storage = StorageManager.getInstance();
    const stores = await storage.getStores();

    if (stores.length === 0) {
      this.error('No stores found. Please add a store first using "themedestroyer store add <store-name>"');
    }

    let selectedStore;
    if (storeFlag) {
      selectedStore = stores.find(s => s.name === storeFlag);
      if (!selectedStore) {
        this.error(`Store "${storeFlag}" not found. Available stores: ${stores.map(s => s.name).join(', ')}`);
      }
    } else if (stores.length === 1) {
      selectedStore = stores[0];
    } else {
      const {store} = await inquirer.prompt([
        {
          type: 'list',
          name: 'store',
          message: 'Select a store to search themes in:',
          choices: stores.map(s => ({name: s.name, value: s})),
        },
      ]);
      selectedStore = store;
    }

    if (!selectedStore) {
      this.error('No store selected');
    }

    this.log(`\n🔍 Searching themes in "${selectedStore.name}" for keyword: "${keyword}"`);
    this.log('=' .repeat(60));

    try {
      const shopifyAPI = new ShopifyAPI(selectedStore.name, selectedStore.apiToken);
      const themes = await shopifyAPI.getThemes();

      // Filter themes by keyword (case-insensitive)
      const matchingThemes = themes.filter(theme => 
        theme.name.toLowerCase().includes(keyword.toLowerCase())
      );

      if (matchingThemes.length === 0) {
        this.log(`\n❌ No themes found matching "${keyword}"`);
        this.log(`\nAvailable themes:`);
        themes.forEach(theme => {
          this.log(`  • ${theme.name} (ID: ${theme.id})`);
        });
        return;
      }

      this.log(`\n✅ Found ${matchingThemes.length} theme(s) matching "${keyword}":`);
      this.log('');

      matchingThemes.forEach(theme => {
        const role = theme.role ? ` (${theme.role})` : '';
        const createdAt = theme.created_at ? new Date(theme.created_at).toLocaleDateString() : 'Unknown';
        this.log(`  🎨 ${theme.name}${role}`);
        this.log(`     ID: ${theme.id}`);
        this.log(`     Created: ${createdAt}`);
        this.log('');
      });

      // Ask if user wants to delete any of the found themes
      const {deleteThemes} = await inquirer.prompt([
        {
          type: 'confirm',
          name: 'deleteThemes',
          message: `Would you like to delete any of these ${matchingThemes.length} theme(s)?`,
          default: false,
        },
      ]);

      if (deleteThemes) {
        this.log('\n🗑️  Theme Deletion Mode');
        this.log('=' .repeat(40));
        
        // Show checkbox list for theme selection
        const {selectedThemes} = await inquirer.prompt([
          {
            type: 'checkbox',
            name: 'selectedThemes',
            message: 'Select themes to delete:',
            choices: matchingThemes.map(theme => ({
              name: `${theme.name} (ID: ${theme.id})${theme.role ? ` - ${theme.role}` : ''}`,
              value: theme,
            })),
            validate: (answer) => {
              if (answer.length === 0) {
                return 'Please select at least one theme to delete.';
              }
              return true;
            },
          },
        ]);

        if (selectedThemes.length === 0) {
          this.log('\n❌ No themes selected for deletion.');
          return;
        }

        // Confirmation prompt
        const {confirm} = await inquirer.prompt([
          {
            type: 'confirm',
            name: 'confirm',
            message: `Are you sure you want to delete ${selectedThemes.length} theme(s)? This action cannot be undone.`,
            default: false,
          },
        ]);

        if (!confirm) {
          this.log('\n❌ Deletion cancelled.');
          return;
        }

        // Delete selected themes
        this.log(`\n🗑️  Deleting ${selectedThemes.length} theme(s)...`);
        let deletedCount = 0;
        let errorCount = 0;

        for (const theme of selectedThemes) {
          try {
            await shopifyAPI.deleteTheme(theme.id);
            this.log(`  ✅ Deleted: ${theme.name} (ID: ${theme.id})`);
            deletedCount++;
          } catch (error: any) {
            this.log(`  ❌ Failed to delete ${theme.name} (ID: ${theme.id}): ${error.message}`);
            errorCount++;
          }
        }

        this.log(`\n🎉 Deletion complete!`);
        this.log(`  ✅ Successfully deleted: ${deletedCount} theme(s)`);
        if (errorCount > 0) {
          this.log(`  ❌ Failed to delete: ${errorCount} theme(s)`);
        }
      } else {
        this.log('\n👋 Search complete. No themes selected for deletion.');
      }

    } catch (error: any) {
      this.error(`Failed to search themes: ${error.message}`);
    }
  }
}
