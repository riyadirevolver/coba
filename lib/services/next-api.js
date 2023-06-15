import axios from "axios";

const BASE_API = process.env.NEXT_PUBLIC_API_BASE_PATH;

console.log(BASE_API);

function NextApi() {
  return axios.create({
    baseURL: BASE_API ? `/${BASE_API}/` : undefined,
    responseType: "json",
  });
}

export default NextApi;
