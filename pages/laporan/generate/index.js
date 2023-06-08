import { Grid } from "@mui/material";
import WithAuth from "../../../lib/session/withAuth";
import AllReportLists from "../../../src/components/admin/AllReportLists";

export const getServerSideProps = WithAuth(async function ({ req }) {
  const token = req.session.user.token;
  const id = req.session.user.company_id;
  return {
    props: {
      token: token,
      companyId: id,
    },
  };
});

const Generate = ({ token, companyId }) => {
  return (
    <Grid container spacing={0}>
      <Grid item xs={12} lg={12}>
        <AllReportLists token={token} companyId={companyId} />
      </Grid>
    </Grid>
  );
};

export default Generate;
