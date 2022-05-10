import { HttpClient } from "../httpClient";

class FaqService extends HttpClient {
  constructor() {
    super("https://localhost:44392/api");
  }

  async getFaq() {
    return await this.get("faq");
  }

  async getFaqById(id) {
    return await this.get("faq/" + id);
  }
}

export const faqService = new FaqService();
