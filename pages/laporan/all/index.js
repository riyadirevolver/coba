import { Grid } from "@mui/material";
import moment from "moment-timezone";
import pagination from "../../../lib/services/pagination";
import WithAuth from "../../../lib/session/withAuth";
import ActivityLists from "../../../src/components/admin/ActivityLists";
import SearchActivity from "../../../src/components/forms/searchUser/SearchActivity";
import { handleQueryCreatedAt } from "../../../src/hooks/useGetActivityByDate";
import { getDepartements } from "../../../lib/services/departements";

export const getServerSideProps = WithAuth(async function (context) {
  const { req, query } = context;
  const { token, company_id } = req.session.user;
  const { start_date, end_date, page, per_page, fullname, job_departement_id } =
    query;

  const firsDate = moment(start_date || undefined)
    .startOf("day")
    .utc()
    .toISOString();
  const endDate = moment(end_date || undefined)
    .endOf("day")
    .utc()
    .toISOString();

  const newQuery = handleQueryCreatedAt(firsDate, endDate);

  const activity = await pagination(
    "/activity",
    {
      ...newQuery,
      ...(fullname && {
        fullname: fullname,
      }),
      ...(job_departement_id && {
        job_departement_id: job_departement_id,
      }),
      page,
      per_page,
    },
    {
      Authorization: req.session.user.token,
    }
  );
  const departement = await getDepartements(
    req.session.user.company_id,
    req.session.user.token
  );

  return {
    props: { activity, departement: departement.data },
  };
});

const Activity = ({ activity, departement }) => {
  return (
    <Grid container spacing={0}>
      <Grid item xs lg={12}>
        <SearchActivity />
      </Grid>
      <Grid item xs={12} lg={12}>
        <ActivityLists data={activity} departement={departement} />
      </Grid>
    </Grid>
  );
};

export default Activity;
