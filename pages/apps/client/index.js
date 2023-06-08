import { Container } from "@mui/material";
import React from "react";
import WithAuth from "../../../lib/session/withAuth";
import HomepageClient from "../../../src/components/apps/absent/homePage/HomePageClient";
import LayoutAbsent from "../../../src/layouts/LayoutAbsent";
import WithAuthAbsen from "../../../lib/session/withAuthAbsen";

export const getServerSideProps = WithAuthAbsen(async ({ query, req }) => {
  const id = req.session.user.id;

  return {
    props: {
      user_id: id,
    },
  };
});

const HomePageAbsenceClient = ({ user_id }) => {
  return (
    <Container maxWidth="sm">
      <HomepageClient user_id={user_id} />
    </Container>
  );
};
HomePageAbsenceClient.layout = "Blank";
export default HomePageAbsenceClient;
