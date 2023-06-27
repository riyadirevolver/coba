import axios from "axios";

export async function getSearchZip(query = {}) {
  const { data: response } = await axios
    .create({
      baseURL: "https://api-pro.peluangkerjaku.com",
      responseType: "json",
    })
    .get(`/zip`, {
      params: query,
    });
  return response;
}
