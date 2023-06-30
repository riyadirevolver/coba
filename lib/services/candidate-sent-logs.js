import ServiceAdapter from ".";

export async function getCandidateSentLog(token, queries) {
  const { data } = await ServiceAdapter().get("/candidate-sent-logs", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      ...queries,
    },
  });
  return data;
}

export const addCandidateSentLog = async (data, token) => {
  const { data: response } = await ServiceAdapter().post(
    "/candidate-sent-logs",
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response;
};
