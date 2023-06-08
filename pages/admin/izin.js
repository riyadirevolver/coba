import { Grid } from '@mui/material';
import WithAuth from '../../lib/session/withAuth';
import IzinLists from '../../src/components/admin/IzinLists';

// membuat getServerSideProps dengan menhubungkan api getActivity dan memnaggil token  yang berada di services/activity
export const getServerSideProps = WithAuth(async ({ query, req }) => {
  const activity = await pagination(
    "/activity",
    {
      status: "IZIN",
      ...query,
    },
    {
      Authorization: req.session.token,
    }
  );

  return {
    props: {
      activity,
    },
  };
});

// merender dengan memanggilkan props yaitu user
const Activity = ({ user }) => {
  return (
    <Grid container spacing={0}>
      <Grid item xs={12} lg={12}>
        {/* mengimport file IzinLists yang berada di components/IzinLists */}
        <IzinLists data={user} />
      </Grid>
    </Grid>
  );
};

export default Activity;
