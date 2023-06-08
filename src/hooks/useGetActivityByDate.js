import moment from "moment-timezone";

const formatTimeZone = (date) => {
  const timeZone = moment(date).tz("Asia/jakarta");
  return timeZone;
};

export const useGetActivityByDate = (startDate, endDate, options = {}) => {
  if (startDate && endDate) {
    return {
      "time_in[$gte]": startDate,
      "time_in[$lte]": endDate,
      ...options,
    };
  }
};

export const handleQueryCreatedAt = (startDate, endDate, options = {}) => {
  if (startDate && endDate) {
    return {
      "created_at[$gte]": startDate,
      "created_at[$lte]": endDate,
      ...options,
    };
  }
};

export const handleQueryOvertime = (startDate, endDate, options = {}) => {
  if (startDate && endDate) {
    return {
      "overtime_in[$gte]": startDate,
      "overtime_in[$lte]": endDate,
      ...options,
    };
  }
};
