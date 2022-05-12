import { HttpClient } from "../httpClient";

class SessionService extends HttpClient {
 
    constructor(){
        super("https://localhost:44392/api");
    }

  async getSession(){
      return await this.get("session");
  };

  async getSessionWithSeats(){
    return await this.get("session/seats");
};

  async getSessionById(id){
    return await this.get("session/" + id);
};
}

export const sessionService = new SessionService()