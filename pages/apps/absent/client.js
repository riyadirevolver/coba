import { Container } from "@mui/material";
import React from "react";
import WithAuthAbsen from "../../../lib/session/withAuthAbsen";
import Overtime from "../../../src/components/apps/absent/activity/Overtime";

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
      <Overtime user_id={user_id} />
    </Container>
  );
};
activity.layout = "Blank";

export default activity;
