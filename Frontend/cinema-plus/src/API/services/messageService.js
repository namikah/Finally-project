import { HttpClient } from "../httpClient";

class MessageService extends HttpClient {
  constructor() {
    super("https://localhost:44392/api");
  }

  async getMessage() {
    return await this.get("message");
  }

  async getMessageById(id) {
    return await this.get("message/" + id);
  }

  async postMessage(message){
    return await this.post("message", message);
};
}

export const messageService = new MessageService();
