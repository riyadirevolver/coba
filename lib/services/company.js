import ServiceAdapter from ".";

export async function getCompany(token) {
  const { data } = await ServiceAdapter().get("/company", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
}
export async function addCompany(body, token) {
  const { data } = await ServiceAdapter().post("/users", body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
}
export async function editCompany(id, body, token) {
  const { data } = await ServiceAdapter().patch(`/company/${id}`, body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
}

// delete
export async function deleteCompany(id, token) {
  const { data: response } = await ServiceAdapter().delete(`/company/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
}
