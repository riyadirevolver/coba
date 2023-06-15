import { Grid } from "@mui/material";
import pagination from "../../../lib/services/pagination";
import WithAuth from "../../../lib/session/withAuth";
import UserAllLists from "../../../src/components/admin/UserAllLists";

export const getServerSideProps = WithAuth(async ({ query, req }) => {
  const companyId = req.session.user.company_id;
  const id = req.session.user.id;

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
    },
  };
});
const User = ({ users }) => {
  return (
    <Grid container spacing={0}>
      <Grid item xs={12} lg={12}>
        <UserAllLists data={users} />
      </Grid>
    </Grid>
  );
};

export default User;
