import { Grid } from "@mui/material";
import pagination from "../../../lib/services/pagination";
import WithAuth from "../../../lib/session/withAuth";
import UserAllLists from "../../../src/components/admin/UserAllLists";
import SearchUser from "../../../src/components/forms/searchUser/SearchUser";

export const getServerSideProps = WithAuth(async ({ query, req }) => {
  const companyId = req.session.user.company_id;
  const users = await pagination(
    "/users",
    {
      is_active: 1,
      isVerified: 1,
      "$select[0]": "id",
      "$select[1]": "nik",
      "$select[2]": "fullname",
      "$select[3]": "email",
      "$select[4]": "created_at",
      "$select[5]": "photo",
      company_id: companyId,
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
      <Grid item xs lg={12}>
        <SearchUser />
      </Grid>
      <Grid item xs={12} lg={12}>
        <UserAllLists data={users} />
      </Grid>
    </Grid>
  );
};

export default User;
