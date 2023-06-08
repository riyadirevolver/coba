import ServiceAdapter from ".";

export async function getEmployeeType(companyId, token, queries) {
  const { data } = await ServiceAdapter().get(
    `/employee-type?company_id=${companyId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        ...queries,
      },
    }
  );
  return data;
}

export async function getDataEmployeeType(token){
    const{data} = await ServiceAdapter().get(
        "/employee-type&$limit=100",{
            headers:{
                Authorization: `Bearer ${token}`,
            }
        }
    )
}
