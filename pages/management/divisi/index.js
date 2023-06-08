import { Grid } from "@mui/material";
import React from "react";
import pagination from "../../../lib/services/pagination";
import WithAuth from "../../../lib/session/withAuth";
import PosisiLists from "../../../src/components/admin/PosisiLists";
import DivisionLists from "../../../src/components/admin/DivisionLists";

export const getServerSideProps = WithAuth(async ({ query, req }) => {
  const id = req.session.user.company_id;
  const token = req.session.user.token;
  const division = await pagination(
    `/division`,
    {
      ...query,
      company_id: id,
      "$sort[name]": 1,
    },
    {
      Authorization: token,
    }
  );
  return {
    props: {
      division,
    },
  };
});
const Position = ({ division }) => {
  return (
    <Grid container spacing={0}>
      <Grid item xs={12} lg={12}>
        {/* <PosisiLists data={division} departement={departement} /> */}
        <DivisionLists data={division} />
      </Grid>
    </Grid>
  );
};

export default Position;
