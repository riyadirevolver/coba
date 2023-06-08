import ServiceAdapter from ".";

export async function getDepartements(companyId, token, queries) {
  const { data } = await ServiceAdapter().get(
    `/job-departements?company_id=${companyId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params:{
        ...queries
      }
    }
  );
  return data;
}
