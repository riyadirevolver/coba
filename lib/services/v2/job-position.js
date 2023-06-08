import ServiceAdapter from "..";

export async function getJobPositions(query = {}, headers = {}) {
  const { data: response } = await ServiceAdapter().get("/job-position", {
    params: query,
    headers: headers,
  });
  return response;
}
