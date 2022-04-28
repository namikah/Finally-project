import { HttpClient } from "../httpClient";

class SeatTypeService extends HttpClient {
 
    constructor(){
        super("https://localhost:44392/api");
    }

  async getSeatType(){
      return await this.get("seatType/");
  };
}

export const seatTypeService = new SeatTypeService()