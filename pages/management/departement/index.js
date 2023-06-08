import { Grid } from "@mui/material";
import React from "react";
import { getDepartements } from "../../../lib/services/departements";
import WithAuth from "../../../lib/session/withAuth";
import DepartementLists from "../../../src/components/admin/DepartementLists";

export const getServerSideProps = WithAuth(async function ({ req }) {
  const token = req.session.user.token;
  const id = req.session.user.company_id;
  const shifting = await getDepartements(id, token);

  return {
    props: { shifting },
  };
});
const Departement = ({ shifting }) => {
  return (
    <Grid container spacing={0}>
      <Grid item xs={12} lg={12}>
        <DepartementLists data={shifting} />
      </Grid>
    </Grid>
  );
};

export default Departement;
