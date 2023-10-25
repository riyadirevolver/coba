import { Grid } from "@mui/material";

import pagination from "../../../lib/services/pagination";
import WithAuth from "../../../lib/session/withAuth";
import ClientLists from "../../../src/components/admin/ClientLists";
import SearchClient from "../../../src/components/forms/search/SearchClient";

export const getServerSideProps = WithAuth(async ({ query, req }) => {
  const token = req.session.user.token;
  const users = await pagination(
    "/client",
    {
      ...query,
      is_active: 1,
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
        <SearchClient token={token} />
      </Grid>
      <Grid item xs={12} lg={12}>
        <ClientLists data={users} token={token} />
      </Grid>
    </Grid>
  );
};
export default ClientUpliner;
