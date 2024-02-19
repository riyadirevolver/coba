import { Grid } from "@mui/material";

import pagination from "../../../lib/services/pagination";
import WithAuthClient from "../../../lib/session/withAuthClient";
import ClientRequestLists from "../../../src/components/admin/ClientRequestLists";
import SearchClientV2 from "../../../src/components/forms/search/SearchClientV2";

export const getServerSideProps = WithAuthClient(async ({ query, req }) => {
  const { token, client_id, role } = req.session.user;
  const session = {
    client_id,
    role,
    token,
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
        <SearchClientV2 token={token} session={session} />
      </Grid>
      <Grid item xs={12} lg={12}>
        <ClientRequestLists data={users} token={token} session={session} />
      </Grid>
    </Grid>
  );
};
export default ClientUpliner;
