import ServiceAdapter from ".";

export async function getHolidays(token, query) {
  const { data } = await ServiceAdapter().get("/holidays", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: { ...query },
  });
  return data;
}

//add holidays
export const AddHolidays = async (data, token) => {
  const { data: response } = await ServiceAdapter().post("/holidays", data, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response;
};

//edit holidays
export const EditHolidays = async (id, data, token) => {
  const { data: response } = await ServiceAdapter().patch(
    `/holidays/${id}`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response;
};

//delete holidays
export const DeleteHolidays = async (id, token) => {
  const { data: response } = await ServiceAdapter().delete(
    `/holidays/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  return response;
};