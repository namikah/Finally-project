import { HttpClient } from "../httpClient";

class MovieService extends HttpClient {
 
    constructor(){
        super("https://localhost:44392/api");
    }

  async getMovies(props){
      return await this.get("movie/" + props);
  };
}

export const movieService = new MovieService()