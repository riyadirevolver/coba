import ServiceAdapter from ".";

export async function getDashboard(uplinerId, token) {
  const res = await ServiceAdapter().get(`/dashboard/${uplinerId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
}
