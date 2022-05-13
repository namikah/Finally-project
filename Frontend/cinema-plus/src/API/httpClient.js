import axios from "axios";

export class HttpClient {
  dataUrl;

  constructor(url) {
    this.dataUrl = url;
  }

  async get(endpoint) {
    return await axios.request(`${this.dataUrl}/${endpoint}`);
  }
  async post(endpoint, tickets) {
    return await axios.post(`${this.dataUrl}/${endpoint}`, tickets);
  }
  async put(endpoint, tickets) {
    return await axios.put(`${this.dataUrl}/${endpoint}`, tickets);
  }
}
