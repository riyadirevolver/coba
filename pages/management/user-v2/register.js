import { Grid } from "@mui/material";
import React from "react";
import WithAuth from "../../../lib/session/withAuth";
import UserRegister from "../../../src/components/management/user-v2/UserRegister";

export const getServerSideProps = WithAuth(async ({ req, query }) => {
  const session = req.session.user;
  return {
    props: {
      session: session,
    },
  };
});

const Register = ({ session }) => {
  return (
    <Grid container spacing={0}>
      <Grid item xs={12} lg={12}>
        <UserRegister session={session} />
      </Grid>
    </Grid>
  );
};

export default Register;
