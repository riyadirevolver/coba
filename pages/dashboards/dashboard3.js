import { Grid } from "@mui/material";
import {
  WelcomeCard,
  BlogCard,
  SalesOverview,
  WeeklyStats,
  DailyActivities,
  Purchases,
  TotalEarnings,
  RevenueUpdates,
  MonthlyEarnings,
  Customers,
  TotalSales,
  ProductsPerformance,
  MedicalProBranding,
} from "../../src/components/dashboard/dashboard3";

const Dashboard3 = () => {
  return (
    <Grid container spacing={0}>
      {/* ------------------------- row 1 ------------------------- */}
      <Grid item xs={12} sm={4} lg={5}>
        <WelcomeCard />
      </Grid>
      <Grid item xs={12} sm={4} lg={3}>
        <Purchases />
      </Grid>
      <Grid item xs={12} sm={4} lg={4}>
        <TotalEarnings />
      </Grid>
      <Grid item xs={12} lg={8}>
        <RevenueUpdates />
      </Grid>
      <Grid item xs={12} lg={4}>
        <MonthlyEarnings />
        <Customers />
      </Grid>
      <Grid item xs={12} lg={4}>
        <TotalSales />
      </Grid>
      <Grid item xs={12} lg={8}>
        <ProductsPerformance />
      </Grid>
      <Grid item xs={12} lg={6}>
        <DailyActivities />
      </Grid>

      <Grid item xs={12} lg={6}>
        <SalesOverview />
      </Grid>

      {/* ------------------------- row 3 ------------------------- */}
      <Grid item xs={12} lg={4}>
        <BlogCard />
      </Grid>
      <Grid item xs={12} lg={4}>
        <WeeklyStats />
      </Grid>
      <Grid item xs={12} lg={4}>
        <MedicalProBranding />
      </Grid>
    </Grid>
  );
};

export default Dashboard3;
