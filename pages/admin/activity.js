import { Grid, Box } from "@mui/material";
import moment from "moment-timezone";
import pagination from "../../lib/services/pagination";
import { getActivity } from "../../lib/services/activity";
import WithAuth from "../../lib/session/withAuth";
import AllActivityList from "../../src/components/admin/AllActivityLists";
import { useGetActivityByDate } from "../../src/hooks/useGetActivityByDate";

// export const getServerSideProps = WithAuth(async function (context) {
//   const { req } = context;
//   const timeZone = moment().tz("Asia/Jakarta");
//   const today = timeZone.clone();
//   const token = req.session.user.token;
//   const { start_date, end_date } = context.query;

//   const firsDate = today.startOf("days").utc().toISOString();
//   const endDate = today.add("1", "days").utc().toISOString();

//   const newQuery = useGetActivityByDate(
//     start_date ? start_date : firsDate,
//     end_date ? end_date : endDate
//   );

  // const activity = await getActivity(token, {
  //   $limit: 100,
  //   ...newQuery,
  // });

export const getServerSideProps = WithAuth(async({query,req})=>{
  
  const activity = await pagination("/activity",query,{
    Authorization: req.session.user.token,
  })
  return {
    props: { activity },
  };
})



const Activity = ({ activity }) => {
  return (
    <Grid container spacing={0}>
      <Grid item xs={12} lg={12}>
        <AllActivityList data={activity} />
      </Grid>
    </Grid>
  );
};

export default Activity;
