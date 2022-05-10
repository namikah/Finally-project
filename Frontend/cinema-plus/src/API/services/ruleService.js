import { HttpClient } from "../httpClient";

class RuleService extends HttpClient {
  constructor() {
    super("https://localhost:44392/api");
  }

  async getRule() {
    return await this.get("rule");
  }

  async getRuleById(id) {
    return await this.get("rule/" + id);
  }
}

export const ruleService = new RuleService();
