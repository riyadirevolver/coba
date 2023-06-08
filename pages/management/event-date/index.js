import { Grid } from "@mui/material";
import React from "react";
import pagination from "../../../lib/services/pagination";
import WithAuth from "../../../lib/session/withAuth";
import EventDateLists from "../../../src/components/admin/EventDateLists";

export const getServerSideProps = WithAuth(async ({ query, req }) => {
  const eventDate = await pagination(
    "/event-date",
    {
      ...query,
    },
    {
      Authorization: req.session.user.token,
    }
  );
  return{
    props:{
      eventDate,
    }
  }
});
const eventDate = ({ eventDate }) => {
  return (
    <Grid container spacing={0}>
      <Grid item xs={12} lg={12}>
        <EventDateLists data={eventDate} />
      </Grid>
    </Grid>
  );
};

export default eventDate;
