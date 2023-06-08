import ServiceAdapter from ".";

export async function getEventDate(token, query) {
  const { data } = await ServiceAdapter().get("/event-date", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: { ...query },
  });
  return data;
}

//add event date
export const AddEventDate = async (data, token) => {
  const { data: response } = await ServiceAdapter().post("/event-date", data, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response;
};

//edit event date
export const EditEventDate = async (id, data, token) => {
  const { data: response } = await ServiceAdapter().patch(
    `/event-date/${id}`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response;
};

//delete event date
export const DeleteEventDate = async (id, token) => {
  const { data: response } = await ServiceAdapter().delete(
    `/event-date/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  return response;
};