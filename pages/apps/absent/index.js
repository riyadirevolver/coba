import React from "react";
import WithAuthAbsen from "../../../lib/session/withAuthAbsen";
import Homepage from "../../../src/components/apps/absent/homePage/Homepage";
import LayoutAbsent from "../../../src/layouts/LayoutAbsent";

export const getServerSideProps = WithAuthAbsen(async ({ query, req }) => {
  const id = req.session.user.id;

  return {
    props: {
      user_id: id,
    },
  };
});

const HomePageAbsence = ({ user_id }) => {
  return (
    <LayoutAbsent>
      <Homepage user_id={user_id} />
    </LayoutAbsent>
  );
};
HomePageAbsence.layout = "Blank";
export default HomePageAbsence;
