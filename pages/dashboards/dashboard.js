import { Grid } from "@mui/material";
import { getCandidateSent } from "../../lib/services/candidate-sent";
import { getReport } from "../../lib/services/report";
import WithAuth from "../../lib/session/withAuth";
import ReportGenerate from "../../src/components/admin/ReportGenerate";
import moment from "moment";

export const getServerSideProps = WithAuth(async ({ query, req }) => {
  const todayTest = moment();
  const todayInterview = moment();
  const token = req.session.user.token;
  const report = await getReport(token);
  const testData = await getCandidateSent(token, {
    ...query,
    $limit: -1,
    status: "test",
    "test_date[$gte]": todayTest.toISOString(),
    "test_date[$lte]": todayTest.add(5, "days").toISOString(),
  });
  const interviewData = await getCandidateSent(token, {
    ...query,
    $limit: -1,
    status: "interview",
    "interview_date[$gte]": todayInterview.toISOString(),
    "interview_date[$lte]": todayInterview.add(5, "days").toISOString(),
  });
  return {
    props: {
      token,
      report: report,
      test: testData,
      interview: interviewData,
    },
  };
});
const Report = ({ report, test, interview }) => {
  return (
    <Grid container spacing={0}>
      <Grid item xs={12} lg={12}>
        <ReportGenerate data={report} test={test} interview={interview} />
      </Grid>
    </Grid>
  );
};
export default Report;
