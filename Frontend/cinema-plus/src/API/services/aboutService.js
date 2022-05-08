import { HttpClient } from "../httpClient";

class AboutService extends HttpClient {
  constructor() {
    super("https://localhost:44392/api");
  }

  async getAbout() {
    return await this.get("about");
  }

  async getAboutById(id) {
    return await this.get("about/" + id);
  }
}

export const aboutService = new AboutService();
