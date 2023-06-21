import { Grid } from "@mui/material";

import pagination from "../../../lib/services/pagination";
import WithAuth from "../../../lib/session/withAuth";
import CandidateSentLists from "../../../src/components/admin/CandidateSentLists";

export const getServerSideProps = WithAuth(async ({ query, req }) => {
  const token = req.session.user.token;
  const users = await pagination(
    "/candidate-sent",
    {
      ...query,
    },
    {
      Authorization: token,
    }
  );
  return {
    props: {
      users,
      token,
    },
  };
});
const ClientUpliner = ({ users, token }) => {
  return (
    <Grid container spacing={0}>
      <Grid item xs={12} lg={12}>
        {/* <ClientLists data={users} token={token} /> */}
        <CandidateSentLists data={users} token={token} />
      </Grid>
    </Grid>
  );
};
export default ClientUpliner;
