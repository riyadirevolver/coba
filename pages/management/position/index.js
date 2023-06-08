import { Grid } from "@mui/material";
import React from "react";
import { getDepartemens } from "../../../lib/services/departemens";
import pagination from "../../../lib/services/pagination";
import WithAuth from "../../../lib/session/withAuth";
import PosisiLists from "../../../src/components/admin/PosisiLists";

export const getServerSideProps = WithAuth(async ({ query, req }) => {
  const id = req.session.user.company_id;
  const token = req.session.user.token;
  const departement = await getDepartemens(id, token);
  const position = await pagination(
    `/job-position`,
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
      departement,
      position,
    },
  };
});
const Position = ({ position, departement }) => {
  return (
    <Grid container spacing={0}>
      <Grid item xs={12} lg={12}>
        <PosisiLists data={position} departement={departement} />
      </Grid>
    </Grid>
  );
};

export default Position;
