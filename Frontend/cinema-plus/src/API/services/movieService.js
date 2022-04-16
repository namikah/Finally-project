import { HttpClient } from "../httpClient";

class MovieService extends HttpClient {
 
    constructor(){
        super("https://localhost:44392/api");
    }

  async getMovies(props){
      return await this.get("movie/" + props);
  };

  async postMovies(movie){
    return await this.post("movie", movie);
};

async deleteMovies(id){
    return await this.delete(`movie/${id}`);
};

}

export const movieService = new MovieService()