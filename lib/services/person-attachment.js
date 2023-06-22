import ServiceAdapter from ".";

export async function getPersonAttachment(token, queries) {
  const { data } = await ServiceAdapter().get("/person-attachment", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      ...queries,
    },
  });
  return data;
}

export const addPersonAttachment = async (data, token) => {
  const { data: response } = await ServiceAdapter().post(
    "/person-attachment",
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response;
};

export const updatePersonAttachment = async (id, data, token) => {
  const { data: response } = await ServiceAdapter().patch(
    `/person-attachment/${id}`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response;
};

export const deletePersonAttachment = async (id, token) => {
  const { data: response } = await ServiceAdapter().delete(
    `/person-attachment/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response;
};
