import { Grid } from "@mui/material";

import pagination from "../../../lib/services/pagination";
import WithAuth from "../../../lib/session/withAuth";
import CandidateSentLogLists from "../../../src/components/admin/CandidateSentLogLists";
import SearchCandidateSent from "../../../src/components/forms/search/SearchCandidateSent";

export const getServerSideProps = WithAuth(async ({ query, req }) => {
  const { token, client_id, role } = req.session.user;
  const session = {
    client_id,
    role,
  };
  const users = await pagination(
    "/candidate-sent-logs",
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
      session: session,
    },
  };
});
const ClientUpliner = ({ users, token, session }) => {
  return (
    <Grid container spacing={0}>
      <Grid item xs={12} lg={12}>
        <SearchCandidateSent token={token} session={session} />
      </Grid>
      <Grid item xs={12} lg={12}>
        <CandidateSentLogLists data={users} />
      </Grid>
    </Grid>
  );
};
export default ClientUpliner;
