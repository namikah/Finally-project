import { HttpClient } from "../httpClient";

class SeatService extends HttpClient {
  constructor() {
    super("https://localhost:44392/api");
  }

  async getSeats() {
    return await this.get("seat");
  }

  async getSeatById(id) {
    return await this.get("seat/" + id);
  }
}

export const seatService = new SeatService();
