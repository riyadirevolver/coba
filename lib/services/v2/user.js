import ServiceAdapter from "..";

export async function getUser(query = {}, headers = {}) {
  const { data: response } = await ServiceAdapter().get(`/users`, {
    params: query,
    headers: headers,
  });
  return response;
}
