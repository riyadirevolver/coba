import { Grid } from "@mui/material";
import moment from "moment-timezone";
import pagination from "../../../lib/services/pagination";
import WithAuth from "../../../lib/session/withAuth";
import SickList from "../../../src/components/admin/SickList";
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
      "sick_request_date_from[$gte]": firsDate,
      "sick_request_date_from[$lte]": endDate,
    };
  }
};

export const getServerSideProps = WithAuth(async function (context) {
  const { req } = context;
  const { start_date, end_date, page, per_page, fullname, job_departement_id } =
    context.query;

  const queries = getActivityByDate(start_date, end_date);

  const token = req.session.user.token;

  const sakit = await pagination(
    "/activity",
    {
      status: "SAKIT",
      ...queries,
      fullname,
      job_departement_id,
      page,
      per_page,
    },
    {
      Authorization: token,
    }
  );
  return {
    props: { sakit },
  };
});

const Activity = ({ sakit }) => {
  return (
    <Grid container spacing={0}>
      <Grid item lg={12}>
        <SearchActivity />
      </Grid>
      <Grid item xs={12} lg={12}>
        <SickList data={sakit} />
      </Grid>
    </Grid>
  );
};

export default Activity;
