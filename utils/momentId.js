import moment from "moment/moment";
import "moment/locale/id";
moment.locale("id");

export const MomentDateID = (field) => {
  return moment(field).format("DD MMM YYYY");
};
