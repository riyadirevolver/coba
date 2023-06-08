import ServiceAdapter from ".";

export const createGenerateReportClient = async (body, token) => {
  const { data } = await ServiceAdapter().post("/share-report", body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    responseType: "arraybuffer",
  });
  return data;
};
