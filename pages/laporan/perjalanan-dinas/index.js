import { Grid } from "@mui/material";
import moment from "moment";
import pagination from "../../../lib/services/pagination";
import WithAuth from "../../../lib/session/withAuth";
import BusinessTripsLists from "../../../src/components/admin/BusinessTripsLists";
import SearchActivity from "../../../src/components/forms/searchUser/SearchActivity";

const getActivityByDate = (startDate, endDate) => {
  const start = `${startDate} 05:00`;
  const end = `${endDate} 23:59`;
  if (startDate && endDate) {
    return {
      "trip_date[$gte]": moment(start).toISOString(),
      "trip_date[$lte]": moment(end).toISOString(),
    };
  }
};

export const getServerSideProps = WithAuth(async function (context) {
  const { req, query } = context;
  const { token, id: id_user } = req.session.user;
  const { start_date, end_date, page, per_page, fullname, job_departement_id } =
    context.query;
  const queries = getActivityByDate(start_date, end_date);
  const activity = await pagination(
    "/business-trips",
    {
      ...queries,
      page,
      per_page,
      fullname,
      job_departement_id,
    },
    {
      Authorization: token,
    }
  );

  return {
    props: { activity },
  };
});

const Activity = ({ activity, mapUser }) => {
  return (
    <Grid>
      <Grid item lg={12}>
        <SearchActivity />
      </Grid>
      <BusinessTripsLists data={activity} />
    </Grid>
  );
};

export default Activity;
