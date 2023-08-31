import { Grid } from "@mui/material";
import WithAuth from "../../lib/session/withAuth";
import pagination from "../../lib/services/pagination";
import SearchUser from "../../src/components/forms/search/SearchUser";
import UserAllLists from "../../src/components/admin/UserAllLists";
import { getClient } from "../../lib/services/client";

export const getServerSideProps = WithAuth(async ({ query, req }) => {
  const id = req.session.user.id;
  const token = req.session.user.token;

  const client = await getClient(token, {
    $limit: -1,
    // "$sort[name]": 1,
  });
  const users = await pagination(
    "/users",
    {
      "id[$ne]": id,
      ...query,
    },
    {
      Authorization: req.session.user.token,
    }
  );
  return {
    props: {
      users,
      client,
      token: token,
    },
  };
});
const User = ({ users, client, token }) => {
  return (
    <Grid container spacing={0}>
      <Grid item xs={12} lg={12}>
        <SearchUser />
      </Grid>
      <Grid item xs={12} lg={12}>
        <UserAllLists data={users} dataClients={client} token={token} />
      </Grid>
    </Grid>
  );
};

export default User;
