import moment from "moment/moment";
import "moment/locale/id";
moment.locale("id");

export const MomentDateID = (field) => {
  return moment(field).utc(1).format("DD MMM YYYY");
};

export const MomentTimeID = (field) => {
  return moment(field).utc(1).format("HH:mm:ss");
};
