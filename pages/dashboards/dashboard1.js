import { Grid } from "@mui/material";
import moment from "moment";
import WithAuth from "../../lib/session/withAuth";
import {
  WelcomeCard,
  BlogCard,
  Earnings,
  MonthlySales,
  SalesOverview,
  TotalSales,
  ProductPerformance,
  WeeklyStats,
  DailyActivities,
} from "../../src/components/dashboard/dashboard1";
import { useTimeZone } from "../../src/layouts/useTimezone/useTimeZone";

export const getServerSideProps = WithAuth(async function (context) {
  return {
    props: { user: context.req.session.user },
  };
});

const Dashboard1 = () => {
  const { today: dataToday } = useTimeZone();
  const getToday = dataToday;
  const formattedToday = getToday.format("YYYY-MM-DD");
  const today = moment(`${formattedToday} 05:00`).toISOString();

  return (
    <Grid container spacing={0}>
      {/* ------------------------- row 1 ------------------------- */}
      <Grid item xs={12} lg={6}>
        <WelcomeCard />
        <Grid container spacing={0}>
          <Grid item xs={12} lg={6} sm={6}>
            <Earnings />
          </Grid>
          <Grid item xs={12} lg={6} sm={6}>
            <MonthlySales />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} lg={6}>
        <SalesOverview />
      </Grid>
      {/* ------------------------- row 2 ------------------------- */}
      <Grid item xs={12} lg={4}>
        <TotalSales />
      </Grid>
      <Grid item xs={12} lg={8}>
        <ProductPerformance />
      </Grid>
      {/* ------------------------- row 3 ------------------------- */}
      <Grid item xs={12} lg={4}>
        <BlogCard />
      </Grid>
      <Grid item xs={12} lg={4}>
        <WeeklyStats />
      </Grid>
      <Grid item xs={12} lg={4}>
        <DailyActivities />
      </Grid>
    </Grid>
  );
};

export default Dashboard1;
