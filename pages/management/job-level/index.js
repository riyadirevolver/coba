import { Grid } from "@mui/material";
import React from "react";
import pagination from "../../../lib/services/pagination";
import WithAuth from "../../../lib/session/withAuth";
import JobLevelLists from "../../../src/components/admin/JobLevelLists";

export const getServerSideProps = WithAuth(async ({ query, req }) => {
  const id = req.session.user.company_id;
  const jobLevel = await pagination(
    `/job-level?company_id=${id}`,
    {
      ...query,
      "$sort[level]": 1,
    },
    {
      Authorization: req.session.user.token,
    }
  );
  return {
    props: {
      jobLevel,
    },
  };
});

const joblevel = ({ jobLevel }) => {
  return (
    <Grid container spacing={0}>
      <Grid item xs={12} lg={12}>
        <JobLevelLists data={jobLevel} />
      </Grid>
    </Grid>
  );
};

export default joblevel;
