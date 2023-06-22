import { Grid } from "@mui/material";
import React from "react";
import pagination from "../../../../lib/services/pagination";
import WithAuth from "../../../../lib/session/withAuth";
import PersonAttachmentLists from "../../../../src/components/admin/PersonAttachmentLists";

export const getServerSideProps = WithAuth(async ({ req, params }) => {
  const { id } = params;
  const token = req.session.user.token;
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
    },
  };
});

const ClientAttachment = ({ person_attachment, person_id }) => {
  return (
    <Grid container spacing={0}>
      <Grid item xs={12} lg={12}>
        <PersonAttachmentLists data={person_attachment} person_id={person_id} />
      </Grid>
    </Grid>
  );
};

export default ClientAttachment;
