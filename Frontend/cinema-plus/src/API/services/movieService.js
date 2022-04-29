import { HttpClient } from "../httpClient";

class MovieService extends HttpClient {
 
    constructor(){
        super("https://localhost:44392/api");
    }

  async getMovies(){
      return await this.get("movie");
  };

  async getMovie(id){
    return await this.get("movie/" + id);
};
}

export const movieService = new MovieService()