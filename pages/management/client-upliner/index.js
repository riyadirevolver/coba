import { Grid } from "@mui/material";
import pagination from "../../../lib/services/pagination";
import WithAuth from "../../../lib/session/withAuth";
import ClientUplinerLists from "../../../src/components/admin/ClientUplinerLists";

export const getServerSideProps = WithAuth(async ({ query, req }) => {
  const companyId = req.session.user.company_id;
  const users = await pagination(
    "/users",
    {
      isVerified: 1,
      "$select[0]": "id",
      "$select[1]": "nik",
      "$select[2]": "fullname",
      "$select[3]": "email",
      "$select[4]": "created_at",
      "$select[5]": "role_id",
      company_id: companyId,
      "$or[0][role_id]": "client",
      "$or[1][role_id]": "client3",
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
const ClientUpliner = ({ users }) => {
  return (
    <Grid container spacing={0}>
      <Grid item xs={12} lg={12}>
        <ClientUplinerLists data={users} />
      </Grid>
    </Grid>
  );
};
export default ClientUpliner;
