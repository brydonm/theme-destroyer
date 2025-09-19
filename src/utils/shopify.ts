export interface Theme {
  id: number;
  name: string;
  role: string;
  created_at: string;
  updated_at: string;
}

export class ShopifyAPI {
  private storeName: string;
  private apiToken: string;
  private baseUrl: string;

  constructor(storeName: string, apiToken: string) {
    this.storeName = storeName;
    this.apiToken = apiToken;
    this.baseUrl = `https://${storeName}.myshopify.com/admin/api/2024-01`;
  }

  private async makeRequest(endpoint: string, method: string = 'GET'): Promise<any> {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method,
      headers: {
        'X-Shopify-Access-Token': this.apiToken,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  async getThemes(): Promise<Theme[]> {
    try {
      const response = await this.makeRequest('/themes.json');
      return response.themes;
    } catch (error) {
      throw new Error(`Failed to fetch themes: ${error}`);
    }
  }

  async deleteTheme(themeId: number): Promise<void> {
    try {
      await this.makeRequest(`/themes/${themeId}.json`, 'DELETE');
    } catch (error) {
      throw new Error(`Failed to delete theme ${themeId}: ${error}`);
    }
  }

  async deleteThemes(themeIds: number[]): Promise<void> {
    const deletePromises = themeIds.map(id => this.deleteTheme(id));
    await Promise.all(deletePromises);
  }
}
