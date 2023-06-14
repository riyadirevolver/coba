import ServiceAdapter from ".";

export async function getClientRequest(token, queries) {
  const { data } = await ServiceAdapter().get("/client-request", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      ...queries,
    },
  });
  return data;
}

export const addClientRequest = async (data, token) => {
  const { data: response } = await ServiceAdapter().post(
    "/client-request",
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response;
};

export const updateClientRequest = async (id, data, token) => {
  const { data: response } = await ServiceAdapter().patch(
    `/client-request/${id}`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response;
};

export const deleteClientRequest = async (id, token) => {
  const { data: response } = await ServiceAdapter().delete(
    `/client-request/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response;
};
