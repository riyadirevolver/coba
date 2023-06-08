import { Grid, Box } from "@mui/material";
import moment from "moment/moment";
import { getOverTime } from "../../lib/services/activity";
import WithAuth from "../../lib/session/withAuth";
import OvertimeRequestLists from "../../src/components/admin/OvertimeRequestList";
// import UserList from "../../src/components/admin/UserList";

// membuat getServerSideProps dengan menhubungkan api getActivity dan memnaggil token  yang berada di services/activity
export const getServerSideProps = WithAuth(async function ({ req }) {
  const today = moment();
  const token = req.session.user.token;
  const overtime = await getOverTime(token,{
    "created_at[$gte]": today.format("YYYY-MM-DD"),
  });
  return {
    props: { overtime },
  };
});

// merender dengan memanggilkan props yaitu user
const Activity = ({ overtime }) => {

  return (
    <Grid container spacing={0}>
      <Grid item xs={12} lg={12}>
        {/* mengimport file IzinLists yang berada di components/IzinLists */}
        <OvertimeRequestLists data={overtime} />
      </Grid>
    </Grid>
  );
};

export default Activity;
