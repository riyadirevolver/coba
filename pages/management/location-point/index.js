import { Grid } from "@mui/material";
import React from "react";
import pagination from "../../../lib/services/pagination";
import WithAuth from "../../../lib/session/withAuth";
import LocationPointList from "../../../src/components/admin/LocationPointLists";

export const getServerSideProps = WithAuth(async ({ query, req }) => {
  const id = req.session.user.company_id;
  const locations = await pagination(
    `/location-point?company_id=${id}`,
    {
      ...query,
      "$sort[name]": 1,
    },
    {
      Authorization: req.session.user.token,
    }
  );
  return {
    props: {
      locations,
    },
  };
});

const locationPoint = ({ locations }) => {
  return (
    <Grid container spacing={0}>
      <Grid item xs={12} lg={12}>
        <LocationPointList data={locations} />
      </Grid>
    </Grid>
  );
};

export default locationPoint;
