import { HttpClient } from "../httpClient";

class SessionService extends HttpClient {
 
    constructor(){
        super("https://localhost:44392/api");
    }

  async getSession(){
      return await this.get("session");
  };
}

export const sessionService = new SessionService()