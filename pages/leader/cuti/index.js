import { Grid } from "@mui/material";
import moment from "moment-timezone";
import pagination from "../../../lib/services/pagination";
import WithAuthLeader from "../../../lib/session/withAuthLeader";
import CutiLists from "../../../src/components/admin/CutiLists";
import SearchActivity from "../../../src/components/forms/searchUser/SearchActivity";

const getActivityByDate = (startDate, lastDate) => {
  if (startDate && lastDate) {
    const firsDate = moment(startDate || undefined)
      .startOf("day")
      .utc()
      .toISOString();
    const endDate = moment(lastDate || undefined)
      .endOf("day")
      .utc()
      .toISOString();

    return {
      "leave_date_from[$gte]": firsDate,
      "leave_date_from[$lte]": endDate,
    };
  }
};

export const getServerSideProps = WithAuthLeader(async function (context) {
  const { req, query } = context;
  const timeZone = moment().tz("Asia/Jakarta");
  const today = timeZone.clone();
  const token = req.session.user.token;
  const { start_date, end_date, page, per_page, fullname } = context.query;

  const queries = getActivityByDate(start_date, end_date);

  const cuti = await pagination(
    "/request-leave",
    {
      ...queries,
      fullname,
      page,
      per_page,
      upliner_id: req.session.user.id,
    },
    {
      Authorization: token,
    }
  );

  return {
    props: { cuti },
  };
});

const LeaveActivity = ({ cuti }) => {
  return (
    <Grid container spacing={0}>
      <Grid item xs lg={12}>
        <SearchActivity />
      </Grid>
      <Grid item xs={12} lg={12}>
        <CutiLists data={cuti} />
      </Grid>
    </Grid>
  );
};
export default LeaveActivity;
