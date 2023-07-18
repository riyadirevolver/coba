import { Grid } from "@mui/material";
import WithAuthClient from "../../../../lib/session/withAuthClient";
import pagination from "../../../../lib/services/pagination";
import SearchCandidatSent from "../../../../src/components/forms/search/SearchCandidateSent";
import CandidateSentLists from "../../../../src/components/admin/CandidateSentLists";

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
      status: "hired",
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
const SubmitCandidateClientHired = ({ users, token, session }) => {
  return (
    <Grid container spacing={0}>
      <Grid item xs={12} lg={12}>
        <SearchCandidatSent token={token} session={session} />
      </Grid>
      <Grid item xs={12} lg={12}>
        <CandidateSentLists data={users} token={token} session={session} />
      </Grid>
    </Grid>
  );
};
export default SubmitCandidateClientHired;
