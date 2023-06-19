import ServiceAdapter from ".";

export async function getPersonJC(token, queries) {
  const { data } = await ServiceAdapter().get("/person-jc", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      ...queries,
    },
  });
  return data;
}

export async function getOnePersonJC(id, token) {
  const { data } = await ServiceAdapter().get(`/person-jc/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
}

export const addPersonJC = async (data, token) => {
  const { data: response } = await ServiceAdapter().post("/person-jc", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};

export const updatePersonJC = async (id, data, token) => {
  const { data: response } = await ServiceAdapter().patch(
    `/person-jc/${id}`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response;
};

export const deletePersonJC = async (id, token) => {
  const { data: response } = await ServiceAdapter().delete(`/person-jc/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};
