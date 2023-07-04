import { Grid } from "@mui/material";

import pagination from "../../../lib/services/pagination";
import WithAuthClient from "../../../lib/session/withAuthClient";
import CandidateSentLogLists from "../../../src/components/admin/CandidateSentLogLists";
import SearchCandidateSent from "../../../src/components/forms/search/SearchCandidateSent";

export const getServerSideProps = WithAuthClient(async ({ query, req }) => {
  const { token, client_id } = req.session.user;
  const users = await pagination(
    "/candidate-sent-logs",
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
    },
  };
});
const CandidateSentHistoryClient = ({ users, token }) => {
  return (
    <Grid container spacing={0}>
      <Grid item xs={12} lg={12}>
        <SearchCandidateSent token={token} />
      </Grid>
      <Grid item xs={12} lg={12}>
        <CandidateSentLogLists data={users} />
      </Grid>
    </Grid>
  );
};
export default CandidateSentHistoryClient;
