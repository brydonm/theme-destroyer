import {Command, Flags} from '@oclif/core';
import inquirer from 'inquirer';
import {StorageManager} from '../utils/storage.js';
import {ShopifyAPI, type Theme} from '../utils/shopify.js';

export default class Index extends Command {
  static description = 'Fetch themes from Shopify and delete selected ones';

  static examples = [
    '<%= config.bin %>',
    '<%= config.bin %> --store davidprotein-dev',
  ];

  static flags = {
    store: Flags.string({
      char: 's',
      description: 'Store name to use (if not provided, will show selection)',
    }),
  };

  async run(): Promise<void> {
    const {flags} = await this.parse(Index);
    const storage = StorageManager.getInstance();
    const stores = await storage.getStores();

    if (stores.length === 0) {
      this.error('No stores found. Please add a store first using "themedestroyer store add <store-name>"');
    }

    let selectedStore = stores.find(store => store.name === flags.store);
    
    // If no store specified or store not found, show selection
    if (!selectedStore) {
      if (flags.store) {
        this.error(`Store "${flags.store}" not found. Available stores: ${stores.map((s: any) => s.name).join(', ')}`);
      }

      const storeChoices = stores.map((store: any) => ({
        name: store.name,
        value: store,
      }));

      const storeResponse = await inquirer.prompt([
        {
          type: 'list',
          name: 'store',
          message: 'Select a store:',
          choices: storeChoices,
        },
      ]) as {store: any};

      selectedStore = storeResponse.store;
    }

    this.log(`\n🔍 Fetching themes from ${selectedStore!.name}...`);

    try {
      const shopify = new ShopifyAPI(selectedStore!.name, selectedStore!.apiToken);
      const themes = await shopify.getThemes();

      if (themes.length === 0) {
        this.log('No themes found in this store.');
        return;
      }

      this.log(`\n📋 Found ${themes.length} theme(s):\n`);

      // Create choices for the checkbox list
      const themeChoices = themes.map((theme: Theme) => ({
        name: `${theme.name} (ID: ${theme.id}, Role: ${theme.role})`,
        value: theme,
        checked: false, // Don't pre-select any themes
      }));

      const selectionResponse = await inquirer.prompt([
        {
          type: 'checkbox',
          name: 'selectedThemes',
          message: 'Select themes to delete:',
          choices: themeChoices,
          validate: (answer: Theme[]) => {
            if (answer.length === 0) {
              return 'You must select at least one theme to delete.';
            }
            return true;
          },
        },
      ]);

      const selectedThemes = selectionResponse.selectedThemes as Theme[];

      // Show confirmation
      this.log(`\n⚠️  You are about to delete ${selectedThemes.length} theme(s):`);
      for (const theme of selectedThemes) {
        this.log(`   - ${theme.name} (ID: ${theme.id})`);
      }

      const confirmResponse = await inquirer.prompt([
        {
          type: 'confirm',
          name: 'confirmed',
          message: 'Are you sure you want to delete these themes?',
          default: false,
        },
      ]);

      if (!confirmResponse.confirmed) {
        this.log('❌ Theme deletion cancelled.');
        return;
      }

      // Delete themes
      this.log('\n🗑️  Deleting themes...');
      const themeIds = selectedThemes.map(theme => theme.id);
      
      try {
        await shopify.deleteThemes(themeIds);
        this.log(`✅ Successfully deleted ${selectedThemes.length} theme(s)!`);
      } catch (error) {
        this.error(`Failed to delete themes: ${error}`);
      }

    } catch (error) {
      this.error(`Failed to fetch themes: ${error}`);
    }
  }
}
