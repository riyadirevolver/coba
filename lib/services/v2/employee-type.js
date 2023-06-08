import ServiceAdapter from "..";

export async function getEmployeeType(query = {}, headers = {}) {
  const { data: response } = await ServiceAdapter().get("/employee-type", {
    params: query,
    headers: headers,
  });
  return response;
}
