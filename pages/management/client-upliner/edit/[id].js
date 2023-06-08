import { Grid } from "@mui/material";
import { getOneUser } from "../../../../lib/services/user";
import WithAuth from "../../../../lib/session/withAuth";
import EditClientUpliner from "../../../../src/components/management/client-upliner/EditClientUpliner";

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

const EditUserUpliner = ({ user, session }) => {
  return (
    <Grid container spacing={0}>
      <Grid item xs={12} lg={12}>
        <EditClientUpliner user={user} session={session} />
      </Grid>
    </Grid>
  );
};

export default EditUserUpliner;
