import { Grid } from "@mui/material";
import pagination from "../../../lib/services/pagination";
import WithAuth from "../../../lib/session/withAuth";
import PersonJCLists from "../../../src/components/admin/PersonJCLists";
import SearchPersonJC from "../../../src/components/forms/search/SearchPersonJC";

export const getServerSideProps = WithAuth(async ({ query, req }) => {
  const { token, role } = req.session.user;
  const session = {
    role,
  };

  const users = await pagination(
    "/person-jc",
    {
      ...query,
      // "$sort[name]": 1,
      "$sort[id]": 1,
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
