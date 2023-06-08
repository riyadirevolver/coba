import { Grid } from "@mui/material";
import React from "react";
import { getShifting } from "../../../lib/services/shifting";
import DataScheduleList from "../../../src/components/admin/DataScheduleList";
import WithAuth from "../../../lib/session/withAuth";
import pagination from "../../../lib/services/pagination";

export const getServerSideProps = WithAuth(async ({ query, req }) => {
  const id = req.session.user.company_id;
  const token = req.session.user.token;
  const shifting = await getShifting(id, token);
  const jadwal = await pagination(
    `/schedule?company_id=${id}`,
    {
      ...query,
      "$sort[name]": 1,
    },
    {
      Authorization: token,
    }
  );
  return {
    props: {
      shifting,
      jadwal,
    },
  };
});

const Schedule = ({ jadwal, shifting }) => {
  return (
    <>
      <Grid container spacing={0}>
        <Grid item xs={12} lg={12}>
          <DataScheduleList jadwal={jadwal} shifting={shifting} />
        </Grid>
      </Grid>
    </>
  );
};

export default Schedule;
