import { Grid } from "@mui/material";
import moment from "moment";
import pagination from "../../../lib/services/pagination";
import WithAuth from "../../../lib/session/withAuth";
import ActivityCorrectionLists from "../../../src/components/admin/ActivityCorrectionLists";
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
      "created_at[$gte]": firsDate,
      "created_at[$lte]": endDate,
    };
  }
};

export const getServerSideProps = WithAuth(async function (context) {
  const { req } = context;
  const { id: id_user, token } = req.session.user;
  const { start_date, end_date, page, per_page, fullname, job_departement_id } =
    context.query;
  const queries = getActivityByDate(start_date, end_date);
  const activity = await pagination(
    "/activity-correction",
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
    props: { activity, id_user },
  };
});

const Activity = ({ activity, id_user }) => {
  return (
    <Grid>
      <Grid item lg={12}>
        <SearchActivity />
      </Grid>
      <ActivityCorrectionLists data={activity} id_user={id_user} />
    </Grid>
  );
};

export default Activity;
