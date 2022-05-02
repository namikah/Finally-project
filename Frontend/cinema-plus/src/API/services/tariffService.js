import { HttpClient } from "../httpClient";

class TariffService extends HttpClient {
 
    constructor(){
        super("https://localhost:44392/api");
    }

  async getTariff(){
      return await this.get("tariff");
  };
}

export const tariffService = new TariffService()