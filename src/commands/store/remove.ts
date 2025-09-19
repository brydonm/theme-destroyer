import {Args, Command} from '@oclif/core';
import inquirer from 'inquirer';
import {StorageManager} from '../../utils/storage.js';

export default class StoreRemove extends Command {
  static description = 'Remove a Shopify store from storage';

  static examples = [
    '<%= config.bin %> store remove davidprotein-dev',
    '<%= config.bin %> store remove',
  ];

  static args = {
    store: Args.string({
      description: 'Store name to remove (if not provided, will show selection)',
      required: false,
    }),
  };

  async run(): Promise<void> {
    const {args} = await this.parse(StoreRemove);
    const storage = StorageManager.getInstance();
    const stores = await storage.getStores();

    if (stores.length === 0) {
      this.log('No stores found. Use "themedestroyer store add <store-name>" to add a store.');
      return;
    }

    let storeToRemove: string;

    if (args.store) {
      // Check if the specified store exists
      const storeExists = stores.some(store => store.name === args.store);
      if (!storeExists) {
        this.error(`Store "${args.store}" not found. Available stores: ${stores.map(s => s.name).join(', ')}`);
      }
      storeToRemove = args.store;
    } else {
      // Show interactive selection
      const storeChoices = stores.map(store => ({
        name: store.name,
        value: store.name,
      }));

      const response = await inquirer.prompt([
        {
          type: 'list',
          name: 'store',
          message: 'Select a store to remove:',
          choices: storeChoices,
        },
      ]) as {store: string};

      storeToRemove = response.store;
    }

    // Show confirmation
    const confirmResponse = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'confirmed',
        message: `Are you sure you want to remove store "${storeToRemove}"?`,
        default: false,
      },
    ]) as {confirmed: boolean};

    if (!confirmResponse.confirmed) {
      this.log('❌ Store removal cancelled.');
      return;
    }

    try {
      await storage.removeStore(storeToRemove);
      this.log(`✅ Successfully removed store: ${storeToRemove}`);
    } catch (error) {
      this.error(`Failed to remove store: ${error}`);
    }
  }
}
