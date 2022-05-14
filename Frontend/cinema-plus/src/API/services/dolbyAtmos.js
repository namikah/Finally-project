import { HttpClient } from "../httpClient";

class DolbyAtmosService extends HttpClient {
  constructor() {
    super("https://localhost:44392/api");
  }

  async getDolbyAtmos() {
    return await this.get("dolbyAtmos");
  }

  async getDolbyAtmosById(id) {
    return await this.get("dolbyAtmos/" + id);
  }
}

export const dolbyAtmosService = new DolbyAtmosService();
