import { Grid } from "@mui/material";
import React from "react";
import pagination from "../../../lib/services/pagination";
import WithAuth from "../../../lib/session/withAuth";
import CompCompanySetting from "../../../src/components/admin/CompanySetting";



export const getServerSideProps = WithAuth(async ({ query, req }) => {
  const dataCompanySetting = await pagination(
    "/company-setting",
    {
      ...query,
    },
    {
      Authorization: req.session.user.token,
    }
  );
  return {
    props: {
      dataCompanySetting,
    },
  };
});

const CompanySetting = ({ dataCompanySetting }) => {
  return (
    <Grid container spacing={0}>
      <Grid item xs={12} lg={12}>
        {/* mengimport file IzinLists yang berada di components/IzinLists */}
        <CompCompanySetting data={dataCompanySetting} />
      </Grid>
    </Grid>
  );
};

export default CompanySetting;
