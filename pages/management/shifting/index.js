import { Grid } from "@mui/material";
import React from "react";
import pagination from "../../../lib/services/pagination";
import WithAuth from "../../../lib/session/withAuth";
import DataShiftingLists from "../../../src/components/admin/DataShiftingLists";

export const getServerSideProps = WithAuth(async ({ query, req }) => {
  const shifting = await pagination(
    "/shifting",
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
      shifting,
    },
  };
});
const Shifting = ({ shifting }) => {
  return (
    <Grid container spacing={0}>
      <Grid item xs={12} lg={12}>
        <DataShiftingLists data={shifting} />
      </Grid>
    </Grid>
  );
};

export default Shifting;
