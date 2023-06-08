import moment from "moment-timezone";
import ServiceAdapter from ".";
// import useTimeZone from "../../src/layouts/useTimezone/useTimeZone";
import WithAuth from "../session/withAuth";

export async function getActivity(token, queries) {
  const { data } = await ServiceAdapter().get("/activity", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      ...queries,
    },
  });
  return data;
}
export async function getIzinRequest(token, query) {
  const { data } = await ServiceAdapter().get("/activity", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      status: "IZIN",
      "izin_request_date[$ne]": null,
      ...query,
    },
  });
  return data;
}
export async function getSickRequest(token, queries) {
  const { data } = await ServiceAdapter().get("/activity", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      status: "SAKIT",
      "sick_request_date[$ne]": null,
      ...queries,
    },
  });
  return data;
}
export async function getCutiRequest(token, query) {
  const { data } = await ServiceAdapter().get("/activity?$limit=100", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      status: "CUTI",
      "leave_period_from[$ne]": null,
      ...query,
    },
  });
  return data;
}

export async function getOverTime(token, query) {
  const { data } = await ServiceAdapter().get("/activity?&$limit=100", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      status: "OVERTIME",
      "overtime_request_date[$ne]": null,
      ...query,
    },
  });
  return data;
}

export async function getOverTimeClient(token, query) {
  const { data } = await ServiceAdapter().get("/overtime", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      ...query,
    },
  });
  return data;
}
export async function getOverTimeByID(id, token) {
  const { data } = await ServiceAdapter().get(`/overtime/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
}
export const updateOvertimeByID = async (id, data, token) => {
  const { data: response } = await ServiceAdapter().patch(
    `/overtime/${id}`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response;
};
export async function getLeaveClient(token, query) {
  const { data } = await ServiceAdapter().get("/request-leave", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      ...query,
    },
  });
  return data;
}
export async function getLeaveByID(id, token) {
  const { data } = await ServiceAdapter().get(`/request-leave/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
}
export const updateLeaveByID = async (id, data, token) => {
  const { data: response } = await ServiceAdapter().patch(
    `/request-leave/${id}`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response;
};

export async function exportExcel(token) {
  const { data } = await ServiceAdapter().get("/activity-export", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
}
