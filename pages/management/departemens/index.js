import { Grid } from "@mui/material";
import React from "react";
import pagination from "../../../lib/services/pagination";
import WithAuth from "../../../lib/session/withAuth";
import DepartementsLists from "../../../src/components/admin/DepartementsLists";

export const getServerSideProps = WithAuth(async ({ query, req }) => {
  const company_id = req.session.user.company_id;
  const token = req.session.user.token;
  const departements = await pagination(
    "/job-departements",
    {
      ...query,
      company_id: company_id,
      "$sort[name]": 1,
    },
    {
      Authorization: token,
    }
  );
  return {
    props: {
      departements,
    },
  };
});

const Departmens = ({ departements }) => {
  return (
    <Grid container spacing={0}>
      <Grid item xs={12} lg={12}>
        <DepartementsLists departements={departements} />
      </Grid>
    </Grid>
  );
};

export default Departmens;
