import { HttpClient } from "../httpClient";

class ServicesService extends HttpClient {
  constructor() {
    super("https://localhost:44392/api");
  }

  async getServices() {
    return await this.get("cinemaServices");
  }

  async getServiceById(id) {
    return await this.get("cinemaServices/" + id);
  }
}

export const servicesService = new ServicesService();
