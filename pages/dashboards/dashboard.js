import { Grid } from "@mui/material";
import React from "react";
import { getDashboard } from "../../lib/services/dashboard";
import WithAuth from "../../lib/session/withAuth";
import TableUser from "../../src/components/dashboard/dashboard/TableUser";
import TotalAbsentList from "../../src/components/dashboard/dashboard/TotalAbsentList";
import UsersActivityIn from "../../src/components/dashboard/dashboard/UsersActivityIn";
import { ChartTotalAbsent } from "../../src/components/dashboard/dashboard/ChartTotalAbsent";
import CardWfh from "../../src/components/dashboard/dashboard/CardWfh";
import CardLeave from "../../src/components/dashboard/dashboard/CardLeave";
import CardSick from "../../src/components/dashboard/dashboard/CardSick";
import CardTotalEmployee from "../../src/components/dashboard/dashboard/CardTotalEmployee";
import CardPermit from "../../src/components/dashboard/dashboard/CardPermit";

export const getServerSideProps = WithAuth(async function ({ req }) {
  const { id } = req.session.user;
  const { token } = req.session.user;
  // const dashboard = await getDashboard(id, token);
  const user = req.session.user;

  if (user.level === "STAFF") {
    return {
      redirect: {
        permanent: false,
        destination: "/apps/absent",
      },
    };
  }
  return {
    props: {},
  };
});
const dashboard = ({ dashboard }) => {
  return (
    <Grid container spacing={2} className="custom__grid">
      {/* <Grid item xl={3} lg={4} md={6} sm={6} xs={12}>
        <CardTotalEmployee data={dashboard.totalEmployees} />
      </Grid>
      <Grid item xl={3} lg={4} md={6} sm={6} xs={12}>
        <ChartTotalAbsent data={dashboard.chartTotalToday} />
      </Grid>
      <Grid item xl={3} lg={4} md={6} sm={6} xs={12}>
        <CardWfh data={dashboard.totalWfhToday} />
      </Grid>
      <Grid item xl={3} lg={4} md={6} sm={6} xs={12}>
        <CardLeave data={dashboard.totalLeaveToday} />
      </Grid>
      <Grid item xl={3} lg={4} md={6} sm={6} xs={12}>
        <CardSick data={dashboard.totalSickToday} />
      </Grid>
      <Grid item xl={3} lg={4} md={6} sm={6} xs={12}>
        <CardPermit data={dashboard.totalPermitToday} />
      </Grid>
      <Grid item md={12}>
        <TotalAbsentList data={dashboard.tableUserAbensts} />
      </Grid>
      <Grid item lg={12} md={12} sm={12}>
        <TableUser data={dashboard.tableUserAbensts} />
      </Grid> */}
    </Grid>
  );
};

export default dashboard;
