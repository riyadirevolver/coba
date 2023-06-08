import { Grid } from "@mui/material";
import {
  EarningsShop,
  TopCards,
  ProductPerformance,
  WeeklyStats,
  RecentTransactions,
  Earnings,
  YearlySales,
  ProductsTable,
  MedicalproBranding,
  BlogCard,
} from "../../src/components/dashboard/dashboard2";

const Dashboard2 = () => {
  return (
    <Grid container spacing={0}>
      <Grid item xs={12} lg={4}>
        <EarningsShop />
      </Grid>
      <Grid item xs={12} lg={8}>
        <TopCards />
      </Grid>
      <Grid item xs={12} lg={8}>
        <ProductPerformance />
      </Grid>
      <Grid item xs={12} lg={4}>
        <Earnings />
        <YearlySales />
      </Grid>
      <Grid item xs={12} lg={4}>
        <RecentTransactions />
      </Grid>
      <Grid item xs={12} lg={8}>
        <ProductsTable />
      </Grid>
      <Grid item xs={12} lg={4}>
        <WeeklyStats />
      </Grid>
      <Grid item xs={12} lg={4}>
        <MedicalproBranding />
      </Grid>
      <Grid item xs={12} lg={4}>
        <BlogCard />
      </Grid>
    </Grid>
  );
};

export default Dashboard2;
