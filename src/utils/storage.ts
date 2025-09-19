import fs from 'fs-extra';
import * as path from 'node:path';
import * as os from 'node:os';

export interface Store {
  name: string;
  apiToken: string;
}

export interface StoredData {
  stores: Store[];
}

const CONFIG_DIR = path.join(os.homedir(), '.themedestroyer');
const CONFIG_FILE = path.join(CONFIG_DIR, 'config.json');

export class StorageManager {
  private static instance: StorageManager;
  private data: StoredData;

  private constructor() {
    this.data = { stores: [] };
  }

  public static getInstance(): StorageManager {
    if (!StorageManager.instance) {
      StorageManager.instance = new StorageManager();
    }
    return StorageManager.instance;
  }

  private async loadData(): Promise<void> {
    try {
      await fs.ensureDir(CONFIG_DIR);
      if (await fs.pathExists(CONFIG_FILE)) {
        this.data = await fs.readJson(CONFIG_FILE);
      }
    } catch (error) {
      console.warn('Failed to load config file, starting with empty data:', error);
      this.data = { stores: [] };
    }
  }

  private async saveData(): Promise<void> {
    try {
      await fs.ensureDir(CONFIG_DIR);
      await fs.writeJson(CONFIG_FILE, this.data, { spaces: 2 });
    } catch (error) {
      throw new Error(`Failed to save config: ${error}`);
    }
  }

  public async addStore(name: string, apiToken: string): Promise<void> {
    await this.loadData();
    
    // Check if store already exists
    const existingStoreIndex = this.data.stores.findIndex(store => store.name === name);
    
    if (existingStoreIndex >= 0) {
      // Update existing store
      this.data.stores[existingStoreIndex].apiToken = apiToken;
    } else {
      // Add new store
      this.data.stores.push({ name, apiToken });
    }
    
    await this.saveData();
  }

  public async getStores(): Promise<Store[]> {
    await this.loadData();
    return [...this.data.stores];
  }

  public getStore(name: string): Store | undefined {
    return this.data.stores.find(store => store.name === name);
  }

  public async removeStore(name: string): Promise<void> {
    this.data.stores = this.data.stores.filter(store => store.name !== name);
    await this.saveData();
  }

  public maskToken(token: string): string {
    if (token.length <= 4) {
      return '*'.repeat(token.length);
    }
    return '*'.repeat(token.length - 4) + token.slice(-4);
  }
}
