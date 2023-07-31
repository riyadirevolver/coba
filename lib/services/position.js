import ServiceAdapter from ".";

export async function getPosition(token, queries) {
  const { data } = await ServiceAdapter().get("/position", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      ...queries,
    },
  });
  return data;
}
