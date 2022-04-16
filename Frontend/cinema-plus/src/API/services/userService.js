import { HttpClient } from "../httpClient";

class UserService extends HttpClient {
 
    constructor(){
        super("https://localhost:44392/api");
    }

  async getUsers(){
      return await this.get("users");
  };

}

export const userService = new UserService()