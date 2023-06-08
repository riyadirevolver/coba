import { Container } from "@mui/material";
import React from "react";
import WithAuthAbsen from "../../../lib/session/withAuthAbsen";
import ActivityClient from "../../../src/components/apps/absent/activity/ActivityClient";

export const getServerSideProps = WithAuthAbsen(async ({ query, req }) => {
  const id = req.session.user.id;

  return {
    props: {
      user_id: id,
    },
  };
});
const activity = ({ user_id }) => {
  return (
    <Container maxWidth="sm">
      <ActivityClient user_id={user_id} />
    </Container>
  );
};
activity.layout = "Blank";

export default activity;
 