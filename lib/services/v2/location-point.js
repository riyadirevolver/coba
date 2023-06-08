import ServiceAdapter from "..";

export async function getLocationPoints(query = {}, headers = {}) {
  const { data: response } = await ServiceAdapter().get("/location-point", {
    params: query,
    headers: headers,
  });
  return response;
}
