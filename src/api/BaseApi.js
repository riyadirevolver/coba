/* eslint-disable no-undef */
import axios from "axios";

export default function BaseApi() {
  return axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    responseType: "json",
  });
}
