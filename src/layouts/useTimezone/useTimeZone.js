import moment from "moment-timezone";

export const useTimeZone = (date = null) => {
  const timeZone = moment().tz("Asia/Jakarta");
  const today = timeZone.clone();
  return {today};
};
