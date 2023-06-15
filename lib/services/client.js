import ServiceAdapter from ".";

export async function getClient(token, queries) {
  const { data } = await ServiceAdapter().get("/client", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      ...queries,
    },
  });
  return data;
}

export const addClient = async (data, token) => {
  const { data: response } = await ServiceAdapter().post("/client", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};

export const updateClient = async (id, data, token) => {
  const { data: response } = await ServiceAdapter().patch(
    `/client/${id}`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response;
};

export const deleteClient = async (id, token) => {
  const { data: response } = await ServiceAdapter().delete(`/client/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};
