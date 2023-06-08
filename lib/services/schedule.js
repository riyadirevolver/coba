import ServiceAdapter from ".";

// get Jadwal
export async function getSchedule(company_id, token) {
  const { data } = await ServiceAdapter().get(
    `/schedule?company_id=${company_id}&$limit=100`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return data;
}

// add Jadwal
export const addSchedule = async (data, token) => {
  const { data: response } = await ServiceAdapter().post("/schedule", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};

// edit schedule
export const updateSchedule = async (id, data, token) => {
  const { data: response } = await ServiceAdapter().patch(
    `/schedule/${id}`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response;
};

export const deleteSchedule = async (id, token) => {
  const { data: response } = await ServiceAdapter().delete(`/schedule/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};