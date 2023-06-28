import { Grid } from "@mui/material";

import WithAuth from "../../../lib/session/withAuth";
import ReportGenerate from "../../../src/components/admin/ReportGenerate";
import { getReport } from "../../../lib/services/report";

export const getServerSideProps = WithAuth(async ({ query, req }) => {
  const token = req.session.user.token;
  const report = await getReport(token);

  return {
    props: {
      token,
      report: report,
    },
  };
});
const Report = ({ token, report }) => {
  return (
    <Grid container spacing={0}>
      <Grid item xs={12} lg={12}>
        <ReportGenerate data={report} />
      </Grid>
    </Grid>
  );
};
export default Report;
