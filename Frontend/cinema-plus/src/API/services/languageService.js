import { HttpClient } from "../httpClient";

class LanguageService extends HttpClient {
  constructor() {
    super("https://localhost:44392/api");
  }

  async getLanguage() {
    return await this.get("language");
  }

  async getLanguageById(id) {
    return await this.get("language/" + id);
  }
}

export const languageService = new LanguageService();
