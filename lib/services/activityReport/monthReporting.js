import ServiceAdapter from "../index";
export async function getMonthReporting(body, token, options) {
  const { data } = await ServiceAdapter().post("/export-activity", body, {
    responseType: "arraybuffer",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
}
