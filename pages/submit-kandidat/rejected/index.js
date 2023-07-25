import { Grid } from "@mui/material";
import WithAuth from "../../../lib/session/withAuth";
import pagination from "../../../lib/services/pagination";
import SearchCandidatSent from "../../../src/components/forms/search/SearchCandidateSent";
import CandidateSentLists from "../../../src/components/admin/CandidateSentLists";

export const getServerSideProps = WithAuth(async ({ query, req }) => {
  const { token, client_id, role } = req.session.user;
  const session = {
    client_id,
    role,
  };
  const users = await pagination(
    "/candidate-sent",
    {
      ...query,
      "$or[0][status]": "rejected",
      "$or[1][status]": "rejected_test",
      "$or[2][status]": "rejected_interview",
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
        <SearchCandidatSent token={token} session={session} />
      </Grid>
      <Grid item xs={12} lg={12}>
        <CandidateSentLists data={users} token={token} />
      </Grid>
    </Grid>
  );
};
export default CandidateSent;
