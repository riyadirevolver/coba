import { Grid } from "@mui/material";

import pagination from "../../../lib/services/pagination";
import WithAuthClient from "../../../lib/session/withAuthClient";
import CandidateSentLists from "../../../src/components/admin/CandidateSentLists";
import SearchCandidateSent from "../../../src/components/forms/search/SearchCandidateSent";

export const getServerSideProps = WithAuthClient(async ({ query, req }) => {
  const { token, client_id, role } = req.session.user;
  const session = {
    client_id,
    role,
  };
  const users = await pagination(
    "/candidate-sent",
    {
      ...query,
      client_id: client_id,
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
const CandidateSent = ({ users, token, session }) => {
  return (
    <Grid container spacing={0}>
      <Grid item xs={12} lg={12}>
        <SearchCandidateSent token={token} />
      </Grid>
      <Grid item xs={12} lg={12}>
        <CandidateSentLists data={users} token={token} session={session} />
      </Grid>
    </Grid>
  );
};
export default CandidateSent;
