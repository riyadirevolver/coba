import ServiceAdapter from ".";

export async function getJobPosition(company_id, token, queries) {
  const { data } = await ServiceAdapter().get(
    `/job-position?company_id=${company_id}`,
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

// add position
export const AddJobPosition = async (data, token) => {
  const { data: response } = await ServiceAdapter().post(
    "/job-position",
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response;
};

// edit
export const EditJobPosition = async (id, data, token) => {
  const { data: response } = await ServiceAdapter().patch(
    `/job-position/${id}`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  return response;
};

// delete
export const DeleteJobPosition = async (id, token) => {
  const { data: response } = await ServiceAdapter().delete(`/job-position/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
}
