import { Grid } from "@mui/material";

import pagination from "../../../lib/services/pagination";
import WithAuthClient from "../../../lib/session/withAuthClient";
import ClientLists from "../../../src/components/admin/ClientLists";
import SearchClient from "../../../src/components/forms/search/SearchClient";
import ClientRequestLists from "../../../src/components/admin/ClientRequestLists";

export const getServerSideProps = WithAuthClient(async ({ query, req }) => {
  const { token, client_id, role } = req.session.user;
  const session = {
    client_id,
    role,
  };
  const users = await pagination(
    "/client-request",
    {
      ...query,
      client_id: client_id,
    },
    {
      Authorization: token,
    }
  );
  return {
    props: {
      users,
      token,
      session,
    },
  };
});
const ClientUpliner = ({ users, token, session }) => {
  return (
    <Grid container spacing={0}>
      <Grid item xs={12} lg={12}>
        <SearchClient token={token} />
      </Grid>
      <Grid item xs={12} lg={12}>
        <ClientRequestLists data={users} token={token} session={session} />
      </Grid>
    </Grid>
  );
};
export default ClientUpliner;
