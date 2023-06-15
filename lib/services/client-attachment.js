import ServiceAdapter from ".";

export async function getClientAttachment(token, queries) {
  const { data } = await ServiceAdapter().get("/client-attachment", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      ...queries,
    },
  });
  return data;
}

export const addClientAttachment = async (data, token) => {
  const { data: response } = await ServiceAdapter().post(
    "/client-attachment",
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response;
};

export const updateClientAttachment = async (id, data, token) => {
  const { data: response } = await ServiceAdapter().patch(
    `/client-attachment/${id}`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response;
};

export const deleteClientAttachment = async (id, token) => {
  const { data: response } = await ServiceAdapter().delete(
    `/client-attachment/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response;
};
