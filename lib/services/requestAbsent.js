import ServiceAdapter from ".";

export const requestCheckIn = async (data, token) => {
  const { data: response } = await ServiceAdapter().post(
    "/request-activity",
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response;
};
