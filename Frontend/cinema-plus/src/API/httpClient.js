import axios from "axios";

export class HttpClient {
  dataUrl;

  constructor(url) {
    this.dataUrl = url;
  }

  async get(endpoint) {
    return await axios.request(`${this.dataUrl}/${endpoint}`);
  }
}
