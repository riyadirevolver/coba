import React from "react";
import { Grid } from "@mui/material";

import RecentComments from "../../../src/components/widgets/RecentComments";
import Todo from "../../../src/components/widgets/Todo";
import Visits from "../../../src/components/widgets/Visits";
import TaskList from "../../../src/components/widgets/TaskList";
import RecentMessages from "../../../src/components/widgets/RecentMessages";
import BrowesStats from "../../../src/components/widgets/BrowesStats";
import Subscribe from "../../../src/components/widgets/Subscribe";

const WidgetApps = () => {
  return (
    <Grid container spacing={0}>
      <Grid item lg={4} md={12} xs={12}>
        <RecentComments />
        <TaskList />
      </Grid>
      <Grid item lg={4} md={12} xs={12}>
        <Todo />
        <Visits />
        <Subscribe />
      </Grid>
      <Grid item lg={4} md={12} xs={12}>
        <RecentMessages />
        <BrowesStats />
      </Grid>
    </Grid>
  );
};

export default WidgetApps;
