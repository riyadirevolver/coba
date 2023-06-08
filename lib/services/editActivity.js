import ServiceAdapter from ".";

export async function editActivity(id, payload, token, queries) {
  const { data } = await ServiceAdapter().patch(`/activity/${id}`, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      ...queries,
    },
  });
  return data;
}
