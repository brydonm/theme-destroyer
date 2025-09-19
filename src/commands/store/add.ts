import {Args, Command, Flags} from '@oclif/core';
import inquirer from 'inquirer';
import {StorageManager} from '../../utils/storage.js';

export default class StoreAdd extends Command {
  static description = 'Add a new Shopify store and API token';

  static examples = [
    '<%= config.bin %> store add store-name',
    '<%= config.bin %> store add store-name --token shpat_abc123...',
  ];

  static args = {
    store: Args.string({
      description: 'Store name (e.g., store-name)',
      required: true,
    }),
  };

  static flags = {
    token: Flags.string({
      char: 't',
      description: 'API token (if not provided, will be prompted)',
    }),
  };

  async run(): Promise<void> {
    const {args, flags} = await this.parse(StoreAdd);
    const storage = StorageManager.getInstance();

    let apiToken = flags.token;

    // If no token provided via flag, prompt for it
    if (!apiToken) {
      const response = await inquirer.prompt([
        {
          type: 'password',
          name: 'token',
          message: 'Enter your Shopify API token:',
          validate: (input: string) => {
            if (!input || input.trim().length === 0) {
              return 'API token is required';
            }
            return true;
          },
        },
      ]);
      apiToken = response.token as string;
    }

    try {
      await storage.addStore(args.store, apiToken);
      this.log(`✅ Successfully added store: ${args.store}`);
    } catch (error) {
      this.error(`Failed to add store: ${error}`);
    }
  }
}
