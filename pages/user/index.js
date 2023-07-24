import { Grid } from "@mui/material";
import WithAuth from "../../lib/session/withAuth";
import pagination from "../../lib/services/pagination";
import SearchUser from "../../src/components/forms/search/SearchUser";
import UserAllLists from "../../src/components/admin/UserAllLists";

export const getServerSideProps = WithAuth(async ({ query, req }) => {
  const id = req.session.user.id;
  const token = req.session.user.token;

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
      token: token,
    },
  };
});
const User = ({ users, token }) => {
  return (
    <Grid container spacing={0}>
      <Grid item xs={12} lg={12}>
        <SearchUser />
      </Grid>
      <Grid item xs={12} lg={12}>
        <UserAllLists data={users} token={token} />
      </Grid>
    </Grid>
  );
};

export default User;
