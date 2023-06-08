import ServiceAdapter from ".";

export async function getDepartements(company_id, token) {
  const { data } = await ServiceAdapter().get(`/job-departements`, {
    params: {
      "$sort[name]": 1,
      $limit: -1,
      company_id: company_id,
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
}

export async function getJobLevels(company_id, token) {
  const { data } = await ServiceAdapter().get(
    `/job-level?$limit=-1&company_id=${company_id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return data;
}

export async function getEmployeeType(company_id, token) {
  const { data } = await ServiceAdapter().get(
    `/employee-type?$limit=-1&company_id=${company_id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return data;
}

export async function getJobPosition(company_id, token) {
  const { data } = await ServiceAdapter().get(
    `/job-position?$limit=-1&company_id=${company_id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return data;
}

export async function getLocation(company_id, token) {
  const { data } = await ServiceAdapter().get(
    `/location-point?$limit=-1&company_id=${company_id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return data;
}
