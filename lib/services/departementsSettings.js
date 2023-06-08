import ServiceAdapter from ".";

// add
export const AddDepartemensSetting = async (data, token) => {
  const { data: response } = await ServiceAdapter().post(
    "/department-setting",
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response;
};

// edit
export const EditDepartemensSetting = async (id, data, token) => {
    const { data: response } = await ServiceAdapter().patch(
      `/department-setting/${id}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  };

//delete
export const DeleteDepartemensSetting = async (id, token) => {
    const { data: response } = await ServiceAdapter().delete(`/department-setting/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
}