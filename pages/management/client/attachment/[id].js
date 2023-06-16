import { Grid } from "@mui/material";
import React from "react";
import pagination from "../../../../lib/services/pagination";
import WithAuth from "../../../../lib/session/withAuth";
import ClientAttachmentLists from "../../../../src/components/admin/ClientAttachmentLists";

export const getServerSideProps = WithAuth(async ({ req, params }) => {
  const { id } = params;
  const token = req.session.user.token;
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
    },
  };
});

const ClientAttachment = ({ client_request, client_request_id }) => {
  return (
    <Grid container spacing={0}>
      <Grid item xs={12} lg={12}>
        <ClientAttachmentLists
          data={client_request}
          client_request_id={client_request_id}
        />
      </Grid>
    </Grid>
  );
};

export default ClientAttachment;
