import axios from "axios";

export class HttpClient {
  dataUrl;

  constructor(url) {
    this.dataUrl = url;
  }

  async get(endpoint) {
    return await axios.get(`${this.dataUrl}/${endpoint}`);
  }

  async post(endpoint, object) {
    return await axios.post(`${this.dataUrl}/${endpoint}`, object);
  }

  async delete(endpoint) {
    return await axios.delete(`${this.dataUrl}/${endpoint}`);
  }
}
