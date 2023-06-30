import { Grid } from "@mui/material";
import React from "react";
import pagination from "../../../../lib/services/pagination";
import WithAuthClient from "../../../../lib/session/withAuthClient";
import PersonAttachmentLists from "../../../../src/components/admin/PersonAttachmentLists";

export const getServerSideProps = WithAuthClient(async ({ req, params }) => {
  const { id } = params;
  const { token, client_id, role } = req.session.user;
  const session = {
    client_id,
    role,
  };
  const data = await pagination(
    "/person-attachment",
    { person_id: id },
    {
      Authorization: token,
    }
  );
  return {
    props: {
      person_attachment: data,
      person_id: id,
      session: session,
    },
  };
});

const ClientAttachment = ({ person_attachment, person_id, session }) => {
  return (
    <Grid container spacing={0}>
      <Grid item xs={12} lg={12}>
        <PersonAttachmentLists
          data={person_attachment}
          person_id={person_id}
          session={session}
        />
      </Grid>
    </Grid>
  );
};

export default ClientAttachment;
