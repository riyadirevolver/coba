import { Grid } from "@mui/material";
import pagination from "../../../lib/services/pagination";
import WithAuthClient from "../../../lib/session/withAuthClient";
import PersonJCLists from "../../../src/components/admin/PersonJCLists";
import SearchPersonJC from "../../../src/components/forms/search/SearchPersonJC";

export const getServerSideProps = WithAuthClient(async ({ query, req }) => {
  const { token, client_id, role } = req.session.user;
  const session = {
    client_id,
    role,
  };
  console.log("babi", session);
  const users = await pagination(
    "/person-jc",
    {
      ...query,
    },
    {
      Authorization: req.session.user.token,
    }
  );
  return {
    props: {
      users,
      token: token,
      session: session,
    },
  };
});
const UserJC = ({ users, token, session }) => {
  return (
    <Grid container spacing={0}>
      <Grid item xs={12} lg={12}>
        <SearchPersonJC />
      </Grid>
      <Grid item xs={12} lg={12}>
        <PersonJCLists data={users} token={token} session={session} />
      </Grid>
    </Grid>
  );
};

export default UserJC;
