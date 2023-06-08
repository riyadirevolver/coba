import { Grid, Box } from '@mui/material';
import { getActivity, getUserActivity } from '../../lib/services/activity';
import WithAuth from '../../lib/session/withAuth';
import ActivityLists from '../../src/components/admin/ActivityLists';
// import UserList from "../../src/components/admin/UserList";

export const getServerSideProps = WithAuth(async function ({ req }) {
  const token = req.session.user.token;
  const user = await getActivity(token, {
    status: 'IN',
  });
  return {
    props: { user },
  };
});

const Activity = ({ user }) => {
  return (
    <Grid container spacing={0}>
      <Grid item xs={12} lg={12}>
        <ActivityLists data={user} />
      </Grid>
    </Grid>
  );
};

export default Activity;
