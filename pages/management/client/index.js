import { Grid } from "@mui/material";

import pagination from "../../../lib/services/pagination";
import WithAuth from "../../../lib/session/withAuth";
import ClientLists from "../../../src/components/admin/ClientLists";

export const getServerSideProps = WithAuth(async ({ query, req }) => {
  const token = req.session.user.token;
  const users = await pagination(
    "/client",
    {
      // isVerified: 1,
      // "$select[0]": "id",
      // "$select[1]": "nik",
      // "$select[2]": "fullname",
      // "$select[3]": "email",
      // "$select[4]": "created_at",
      // "$select[5]": "role_id",
      // company_id: companyId,
      // "$or[0][role_id]": "client",
      // "$or[1][role_id]": "client3",
      // role: "client",
      ...query,
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
const ClientUpliner = ({ users, token }) => {
  return (
    <Grid container spacing={0}>
      <Grid item xs={12} lg={12}>
        <ClientLists data={users} token={token} />
      </Grid>
    </Grid>
  );
};
export default ClientUpliner;
