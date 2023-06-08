import { Grid } from "@mui/material";
import moment from "moment";
import pagination from "../../../lib/services/pagination";
import WithAuth from "../../../lib/session/withAuth";
import IzinLists from "../../../src/components/admin/IzinLists";
import { useGetActivityByDate } from "../../../src/hooks/useGetActivityByDate";
import SearchActivity from "../../../src/components/forms/searchUser/SearchActivity";

export const getServerSideProps = WithAuth(async function (context) {
  const { req } = context;
  const { start_date, end_date, page, per_page, fullname, job_departement_id } =
    context.query;
  const firsDate = moment().utc().format("YYYY-MM-DD");
  const endDate = moment().utc().format("YYYY-MM-DD");

  const newQuery = useGetActivityByDate(
    start_date ?? firsDate,
    end_date ?? endDate
  );

  const token = req.session.user.token;

  const izin = await pagination(
    "/activity",
    {
      status: "IZIN",
      ...newQuery,
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
    props: { izin },
  };
});

const Activity = ({ izin }) => {
  return (
    <Grid container spacing={0}>
      <Grid item xs lg={12}>
        <SearchActivity />
      </Grid>
      <Grid item xs={12} lg={12}>
        <IzinLists data={izin} />
      </Grid>
    </Grid>
  );
};

export default Activity;
