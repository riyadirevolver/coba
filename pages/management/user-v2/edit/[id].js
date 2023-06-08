import { Grid } from "@mui/material";
import React from "react";
import { getOneUser } from "../../../../lib/services/user";
import WithAuth from "../../../../lib/session/withAuth";
import EditUserRegister from "../../../../src/components/management/user-v2/EditUserRegister";

export const getServerSideProps = WithAuth(async ({ req, params }) => {
  const session = req.session.user;
  const user = await getOneUser(params.id, session.token);

  return {
    props: {
      session: session,
      user: user,
    },
  };
});

const EditUser = ({ user, session }) => {
  return (
    <Grid container spacing={0}>
      <Grid item xs={12} lg={12}>
        <EditUserRegister user={user} session={session} />
      </Grid>
    </Grid>
  );
};

export default EditUser;
