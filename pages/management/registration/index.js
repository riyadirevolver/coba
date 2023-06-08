import React from "react";
import { register } from "../../../lib/services/user";
import WithAuth from "../../../lib/session/withAuth";
import UserRegistration from "../../../src/components/admin/UserRegistration";

export const getServerSideProps = WithAuth(async function ({ req }) {
  const company_id = req.session.user.company_id;
  return {
    props: { company_id },
  };
});
const Registration = ({ company_id, token }) => {
  return <UserRegistration companyId={company_id} />;
};

export default Registration;
