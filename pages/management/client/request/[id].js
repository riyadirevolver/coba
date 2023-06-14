import React from "react";
import WithAuth from "../../../../lib/session/withAuth";
import pagination from "../../../../lib/services/pagination";
import { Grid } from "@mui/material";
import ClientRequestLists from "../../../../src/components/admin/ClientRequestLists";

export const getServerSideProps = WithAuth(async ({ req, params }) => {
  const { id } = params;
  const token = req.session.user.token;
  const data = await pagination(
    "/client-request",
    { client_id: id },
    {
      Authorization: token,
    }
  );
  return {
    props: {
      client_request: data,
      client_id: id,
    },
  };
});

const DataClient = ({ client_request, client_id }) => {
  return (
    <Grid container spacing={0}>
      <Grid item xs={12} lg={12}>
        <ClientRequestLists data={client_request} client_id={client_id} />
      </Grid>
    </Grid>
  );
};

export default DataClient;
