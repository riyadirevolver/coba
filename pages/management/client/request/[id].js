import React from "react";
import WithAuth from "../../../../lib/session/withAuth";
import pagination from "../../../../lib/services/pagination";
import { Grid } from "@mui/material";
import ClientRequestLists from "../../../../src/components/admin/ClientRequestLists";
import SearchClientRequest from "../../../../src/components/forms/search/SearchClientRequest";

export const getServerSideProps = WithAuth(async ({ req, params, query }) => {
  const { id } = params;
  const { token, role } = req.session.user;
  const session = {
    role,
    token,
  };
  const data = await pagination(
    "/client-request",
    {
      client_id: id,
      ...(query.position && {
        "position[$like]": `%${query.position}%`,
      }),
    },
    {
      Authorization: token,
    }
  );
  return {
    props: {
      client_request: data,
      client_id: id,
      token: token,
      session: session,
    },
  };
});

const DataClient = ({ client_request, client_id, token, session }) => {
  return (
    <Grid container spacing={0}>
      <Grid item xs={12} lg={12}>
        <SearchClientRequest client_id={client_id} token={token} />
      </Grid>
      <Grid item xs={12} lg={12}>
        <ClientRequestLists
          data={client_request}
          client_id={client_id}
          session={session}
        />
      </Grid>
    </Grid>
  );
};

export default DataClient;
