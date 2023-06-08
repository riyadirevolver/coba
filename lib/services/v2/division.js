import ServiceAdapter from "..";

export async function getDivision(query = {}, headers = {}) {
  const { data: response } = await ServiceAdapter().get("/division", {
    params: query,
    headers: headers,
  });
  return response;
}
