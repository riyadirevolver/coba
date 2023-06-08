import ServiceAdapter from ".";
import WithAuth from "../session/withAuth";

export async function getJobLevel(company_id, token, queries) {
  const { data } = await ServiceAdapter().get(
    `/job-level?company_id=${company_id}`,
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

// add job level
export const AddJobLevel = async (data, token) => {
  const { data: response } = await ServiceAdapter().post("/job-level", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};

// edit job level
export const EditJobLevel = async (id, data, token) => {
  const { data: response } = await ServiceAdapter().patch(
    `/job-level/${id}`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response;
};

// delete job level
export const deleteJobLevel = async (id, token) => {
  const { data: response } = await ServiceAdapter().delete(`/job-level/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};
