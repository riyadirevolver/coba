import ServiceAdapter from ".";

export async function getUserLastActivity(id, token, queries) {
  const { data } = await ServiceAdapter().get("/user-last-activity", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      user_id: id,
      ...queries,
    },
  });
  return data;
}
