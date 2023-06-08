import ServiceAdapter from ".";
import WithAuth from "../session/withAuth";

export async function getUser(token, queries) {
  const { data } = await ServiceAdapter().get("/users", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      ...queries,
    },
  });
  return data;
}
export async function getSearchUser(query = {}, headers = {}) {
  const { data: response } = await ServiceAdapter().get(`/users`, {
    params: query,
    headers: headers,
  });
  return response;
}
export async function getOneUser(id, token) {
  const { data } = await ServiceAdapter().get(`/users/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
}
export async function getUserNotVerif(token, company_id, queries = {}) {
  const { data } = await ServiceAdapter().get("/users", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      is_mobile: 1,
      company_id,
      "isVerified[$ne]": 1,
      $limit: 100,
      ...queries,
    },
  });
  return data;
}

export const register = async (data, company_id, token) => {
  const { data: response } = await ServiceAdapter().post("/users", data);
  return response;
};

export const update = async (id, data, token) => {
  const { data: response } = await ServiceAdapter().patch(
    `/users/${id}`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response;
};

export const deleteUser = async (id, token) => {
  const { data: response } = await ServiceAdapter().delete(`/users/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};

export const exportUser = async (token, companyId, params) => {
  const { data: response } = await ServiceAdapter().get("/export-user", {
    responseType: "arraybuffer",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      company_id: companyId,
      ...params,
    },
  });
  return response;
};
