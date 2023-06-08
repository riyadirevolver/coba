import ServiceAdapter from ".";

export async function getUserSummary(id, token, queries) {
  const { data } = await ServiceAdapter().get(`/user-summary/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      ...queries,
    },
  });
  return data;
}
