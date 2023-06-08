import { Grid } from "@mui/material";
import moment from "moment";
import pagination from "../../../lib/services/pagination";
import WithAuth from "../../../lib/session/withAuth";
import LatePermitLists from "../../../src/components/admin/LatePermitLists";
import SearchActivity from "../../../src/components/forms/searchUser/SearchActivity";

const getActivityByDate = (startDate, endDate) => {
  const start = `${startDate} 05:00`;
  const end = `${endDate} 23:59`;
  if (startDate && endDate) {
    return {
      "late_time_in[$gte]": moment(start).toISOString(),
      "late_time_in[$lte]": moment(end).toISOString(),
    };
  }
};

export const getServerSideProps = WithAuth(async function (context) {
  const { req } = context;
  const { token, id: id_user } = req.session.user;
  const { start_date, end_date, page, per_page, fullname, job_departement_id } =
    context.query;
  const queries = getActivityByDate(start_date, end_date);
  const activity = await pagination(
    "/late-permit",
    {
      ...queries,
      ...(fullname && {
        fullname: `%${fullname}%`,
      }),
      ...(job_departement_id && {
        job_departement_id: job_departement_id,
      }),
      page,
      per_page,
    },
    {
      Authorization: token,
    }
  );

  return {
    props: { activity },
  };
});

const Activity = ({ activity }) => {
  return (
    <Grid container spacing={0}>
      <Grid item xs lg={12}>
        <SearchActivity />
      </Grid>
      <Grid item xs lg={12}>
        <LatePermitLists data={activity} />
      </Grid>
    </Grid>
  );
};

export default Activity;
