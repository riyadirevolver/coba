import { Grid } from "@mui/material";
import moment from "moment-timezone";
import pagination from "../../../lib/services/pagination";
import WithAuth from "../../../lib/session/withAuth";
import LogErrorLists from "../../../src/components/admin/LogErrorLists";
// import { handleQueryCreatedAt } from "../../../src/hooks/useGetActivityByDate";

export const getServerSideProps = WithAuth(async function ({ query, req }) {
  const errorLogs = await pagination(
    "/error-logs",
    {
      ...query,
    },
    {
      Authorization: req.session.user.token,
    }
  );
  return {
    props: { errorLogs },
  };
});

const ErrorLog = ({ errorLogs }) => {
  return (
    <Grid container spacing={0}>
      <Grid item xs={12} lg={12}>
        <LogErrorLists data={errorLogs} />
      </Grid>
    </Grid>
  );
};

export default ErrorLog;
