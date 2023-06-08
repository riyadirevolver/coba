import ServiceAdapter from "..";

export async function getDepartments(query = {}, headers = {}) {
  const { data: response } = await ServiceAdapter().get("/job-departements", {
    params: query,
    headers: headers,
  });
  return response;
}
