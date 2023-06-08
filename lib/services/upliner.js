import ServiceAdapter from ".";

export async function getUpliner(token, companyId, level, name) {
  const { data } = await ServiceAdapter().get(
    `/users?company_id=${companyId}&user_level=${level}&${
      name ? `fullname[$like]=${name}%` : ""
    }&$limit=100`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return data;
}
