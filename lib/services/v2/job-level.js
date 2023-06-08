import ServiceAdapter from "..";

export async function getJobLevel(query = {}, headers = {}) {
  const { data: response } = await ServiceAdapter().get("/job-level", {
    params: query,
    headers: headers,
  });
  return response;
}
