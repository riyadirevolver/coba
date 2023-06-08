import ServiceAdapter from ".";

// add position
export const AddDivision = async (data, token) => {
  const { data: response } = await ServiceAdapter().post(`/division`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};

// edit
export const EditDivision = async (id, data, token) => {
  const { data: response } = await ServiceAdapter().patch(
    `/division/${id}`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response;
};

export const DeleteDivision = async (id, token) => {
  const { data: response } = await ServiceAdapter().delete(`/division/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};
