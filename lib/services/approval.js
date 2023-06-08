import ServiceAdapter from ".";

export async function updateApprove(id, body, token) {
  const { data } = await ServiceAdapter().post(`/approval/${id}`, body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
}
export async function approveUser(body, token) {
  const { data } = await ServiceAdapter().post("/approval", body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
}

export async function updateBusinessTrips(id, body, token) {
  const { data } = await ServiceAdapter().patch(`/business-trips/${id}`, body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
}

export async function updateActivityCorrection(id, body, token) {
  const { data } = await ServiceAdapter().patch(
    `/activity-correction/${id}`,
    body,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return data;
}

export async function approveOvertime(id, body, token) {
  const { data } = await ServiceAdapter().patch(`/overtime/${id}`, body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
}

export async function approveLeave(id, body, token) {
  const { data } = await ServiceAdapter().patch(`/request-leave/${id}`, body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
}
