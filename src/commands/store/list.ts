import {Command} from '@oclif/core';
import {StorageManager} from '../../utils/storage.js';

export default class StoreList extends Command {
  static description = 'List all stored Shopify stores and their API tokens (masked)';

  static examples = [
    '<%= config.bin %> store list',
  ];

  async run(): Promise<void> {
    const storage = StorageManager.getInstance();
    const stores = await storage.getStores();

    if (stores.length === 0) {
      this.log('No stores found. Use "themedestroyer store add <store-name>" to add a store.');
      return;
    }

    this.log('\n📦 Stored Shopify Stores:');
    this.log('========================\n');

    stores.forEach((store: any, index: number) => {
      const maskedToken = storage.maskToken(store.apiToken);
      this.log(`${index + 1}. Store: ${store.name}`);
      this.log(`   Token: ${maskedToken}\n`);
    });
  }
}
