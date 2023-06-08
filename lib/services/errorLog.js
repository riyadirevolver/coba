import ServiceAdapter from ".";

export const findAllErrorLogs = async (token) => {
  const { data: response } = await ServiceAdapter().get("/error-logs", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};

export const createErrorLog = async (body, token) => {
  const { data } = await ServiceAdapter().post("/error-logs", body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};
