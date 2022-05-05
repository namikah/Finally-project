import { HttpClient } from "../httpClient";

class TicketService extends HttpClient {
  constructor() {
    super("https://localhost:44392/api");
  }

  async getTicket() {
    return await this.get("ticket");
  }

  async postTickets(tickets) {
    return await this.post("ticket", tickets);
  }

  async deleteTickets(id) {
    return await this.delete(`ticket/${id}`);
  }
}

export const ticketService = new TicketService();
