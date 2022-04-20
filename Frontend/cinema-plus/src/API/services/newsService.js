import { HttpClient } from "../httpClient";

class NewsService extends HttpClient {
 
    constructor(){
        super("https://localhost:44392/api");
    }

  async getNews(props){
      return await this.get("news/" + props);
  };
}

export const newsService = new NewsService()