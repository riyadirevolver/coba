import { Grid } from "@mui/material";
import moment from "moment-timezone";
import pagination from "../../../lib/services/pagination";
import WithAuthLeader from "../../../lib/session/withAuthLeader";
import OvertimeRequestList from "../../../src/components/admin/OvertimeRequestList";
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
      "overtime_in[$gte]": firsDate,
      "overtime_in[$lte]": endDate,
    };
  }
};

export const getServerSideProps = WithAuthLeader(async function (context) {
  const { req, query } = context;
  const { start_date, end_date, page, per_page, fullname, job_departement_id } =
    context.query;

  const queries = getActivityByDate(start_date, end_date);

  const token = req.session.user.token;
  const overtime = await pagination(
    "/overtime",
    {
      ...queries,
      page,
      per_page,
      fullname,
      job_departement_id,
      upliner_id: req.session.user.id,
    },
    {
      Authorization: token,
    }
  );

  return {
    props: { overtime },
  };
});

const Overtime = ({ overtime }) => {
  return (
    <Grid container spacing={0}>
      <Grid item lg={12}>
        <SearchActivity />
      </Grid>
      <Grid item xs={12} lg={12}>
        <OvertimeRequestList data={overtime} />
      </Grid>
    </Grid>
  );
};

export default Overtime;
