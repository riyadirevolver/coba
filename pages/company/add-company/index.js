import { Grid } from "@mui/material";
import React from "react";
import pagination from "../../../lib/services/pagination";
import WithAuth from "../../../lib/session/withAuth";
import CompanyList from "../../../src/components/admin/Company";


export const getServerSideProps = WithAuth(async ({ query, req }) => {
  const company = await pagination(
    "/company",
    {
      ...query,
    },
    {
      Authorization: req.session.user.token,
    }
  );
  return {
    props: {
      company,
    },
  };
});

const AddCompany = ({ company }) => {
  return (
    <Grid container spacing={0}>
      <Grid item xs={12} lg={12}>
        <CompanyList data={company} />
      </Grid>
    </Grid>
  );
};

export default AddCompany;
