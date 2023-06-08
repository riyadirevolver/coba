import ServiceAdapter from "..";

export async function getSchedule(query = {}, headers = {}) {
  const { data: response } = await ServiceAdapter().get("/schedule", {
    params: query,
    headers: headers,
  });
  return response;
}
