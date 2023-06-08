import { Container } from "@mui/material";
import React from "react";
import WithAuthAbsen from "../../../lib/session/withAuthAbsen";
import Leave from "../../../src/components/apps/absent/activity/Leave";

export const getServerSideProps = WithAuthAbsen(async ({ query, req }) => {
  const id = req.session.user.id;

  return {
    props: {
      user_id: id,
    },
  };
});
const overtime = ({ user_id }) => {
  return (
    <Container maxWidth="sm">
      <Leave user_id={user_id} />
    </Container>
  );
};
overtime.layout = "Blank";

export default overtime;
