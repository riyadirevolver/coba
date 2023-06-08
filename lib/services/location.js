import React from "react";
import ServiceAdapter from ".";

export async function getLocation(companyId, token, queries) {
  const { data } = await ServiceAdapter().get(
    `/location-point?company_id=${companyId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        ...queries,
      },
    }
  );
  return data;
}

// add location point
export const AddLocation = async (data, company_id, token) => {
  const { data: response } = await ServiceAdapter().post(
    `/location-point?company_id=${company_id}`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response;
};

// edit location point
export const EditLocation = async (id, data, token) => {
  const { data: response } = await ServiceAdapter().patch(
    `/location-point/${id}`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response;
};

// delete location point
export const deleteLocation = async (id, token) => {
  const { data: response } = await ServiceAdapter().delete(
    `/location-point/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response;
};
