import ServiceAdapter from ".";

export async function getReport(token) {
  const res = await ServiceAdapter().get(`/report`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
}
