import axios from "axios";
import APP_CONFIG from "../../app.config";

export class BaseService {
  baseUrl = "";
  constructor(subUrl = process.env.NEXT_PUBLIC_BASE_API) {
    // this.baseUrl = `${APP_CONFIG.baseUrl}/${subUrl}`;
    this.baseUrl = `${subUrl}`;
  }

  async get(params = "") {
    const res = await axios.get(`${this.baseURL}?${params}`);
    return res;
  }

  async find(id, params = "") {
    const res = await axios.get(`${this.baseURL}/${id}?${params}`);
    return res;
  }

  async post(payload) {
    const res = await axios.post(this.baseURL, payload);
    return res;
  }

  async patch(id, payload) {
    const res = await axios.patch(`${this.baseUrl}/${id}`, payload);
    return res;
  }

  async delete(id) {
    const res = await axios.delete(`${this.baseURL}/${id}`);
    return res;
  }
}
export default BaseService;
