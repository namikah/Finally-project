import { HttpClient } from "../httpClient";

class CinemaService extends HttpClient {
  constructor() {
    super("https://localhost:44392/api");
  }

  async getCinema() {
    return await this.get("cinema");
  }

  async getCinemaById(id) {
    return await this.get("cinema/" + id);
  }
}

export const cinemaService = new CinemaService();
