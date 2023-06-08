import { Grid } from "@mui/material";
import { getOneUser, getUser } from "../../../lib/services/user";
import WithAuth from "../../../lib/session/withAuth";
import EditUserRegistration from "../../../src/components/admin/EditUserRegistration";

export const getServerSideProps = WithAuth(async function (context) {
  const { req } = context;
  const token = req.session.user.token;
  const { company_id } = req.session.user;
  const { id } = context.params;

  const user = await getOneUser(id, token);

  return {
    props: { user, company_id },
  };
});

const SelfRegistration = ({ user, company_id }) => {
  return (
    <Grid container spacing={0}>
      <Grid item xs={12} lg={12}>
        <EditUserRegistration companyId={company_id} data={user} />
      </Grid>
    </Grid>
  );
};

export default SelfRegistration;
