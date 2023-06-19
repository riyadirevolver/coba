import ServiceAdapter from ".";

export async function getCandidateSent(token, queries) {
  const { data } = await ServiceAdapter().get("/candidate-sent", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      ...queries,
    },
  });
  return data;
}

export const addCandidateSent = async (data, token) => {
  const { data: response } = await ServiceAdapter().post(
    "/candidate-sent",
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response;
};

export const updateCandidateSent = async (id, data, token) => {
  const { data: response } = await ServiceAdapter().patch(
    `/candidate-sent/${id}`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response;
};

export const deleteCandidateSent = async (id, token) => {
  const { data: response } = await ServiceAdapter().delete(
    `/candidate-sent/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response;
};
