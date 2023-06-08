import { Grid } from "@mui/material";
import { getUser } from "../../lib/services/user";
import WithAuth from "../../lib/session/withAuth";
import UserList from "../../src/components/admin/UserList";

export const getServerSideProps = WithAuth(async function (context) {
  const { req } = context;
  const token = req.session.user.token;
  const { query } = context;

  const params = {};

  const keys = Object.keys(query);
  for (let i = 0; i <= keys.length; i++) {
    const object = Object.keys(query);

    switch (object[i]) {
      case "name":
        params["fullname[$like]"] = `%${query.name}%`;
        break;
      case "name":
        params["nik"] = query.nik;
        break;
      case keys[i]:
        if (query[keys[i]]?.length >= 1) {
          params[keys[i]] = query[keys[i]];
        }
        break;
      default:
        params[query[object[i]]] = query[object[i]];
        break;
    }
  }

  const user = await getUser(token, params);
  return {
    props: { user },
  };
});

const User = ({ user }) => {
  return (
    <Grid container spacing={0}>
      <Grid item xs={12} lg={12}>
        <UserList data={user} />
      </Grid>
    </Grid>
  );
};

export default User;
