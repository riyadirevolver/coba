import { Grid } from "@mui/material";
import React from "react";
import pagination from "../../../../lib/services/pagination";
import WithAuthClient from "../../../../lib/session/withAuthClient";
import ClientAttachmentLists from "../../../../src/components/admin/ClientAttachmentLists";

export const getServerSideProps = WithAuthClient(async ({ req, params }) => {
  const { id } = params;
  const { token, client_id, role } = req.session.user;
  const session = {
    client_id,
    role,
  };
  const data = await pagination(
    "/client-attachment",
    { client_request_id: id },
    {
      Authorization: token,
    }
  );
  return {
    props: {
      client_request: data,
      client_request_id: id,
      session: session,
    },
  };
});

const ClientAttachment = ({ client_request, client_request_id, session }) => {
  return (
    <Grid container spacing={0}>
      <Grid item xs={12} lg={12}>
        <ClientAttachmentLists
          data={client_request}
          client_request_id={client_request_id}
          session={session}
        />
      </Grid>
    </Grid>
  );
};

export default ClientAttachment;
