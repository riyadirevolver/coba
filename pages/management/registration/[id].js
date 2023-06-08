import { Grid } from "@mui/material";
import { getOneUser, getUser } from "../../../lib/services/user";
import WithAuth from "../../../lib/session/withAuth";
import UserRegistration from "../../../src/components/admin/UserRegistration";

export const getServerSideProps = WithAuth(async function (context) {
  const { req } = context;
  const token = req.session.user.token;
  const { id } = context.params;

  const user = await getOneUser(id, token);

  return {
    props: { user, company_id },
  };
});

const SelfRegistration = ({ user }) => {
  return (
    <Grid container spacing={0}>
      <Grid item xs={12} lg={12}>
        <UserRegistration data={user} />
      </Grid>
    </Grid>
  );
};

export default SelfRegistration;
