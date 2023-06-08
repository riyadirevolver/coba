import { Grid } from "@mui/material";

import WithAuthClient from "../../../lib/session/withAuthClient";
import GenerateReportClient from "../../../src/components/clients/genrateReport/GenerateReportClient";

export const getServerSideProps = WithAuthClient(async function ({ req }) {
  const token = req.session.user.token;
  const id = req.session.user.company_id;
  const userId = req.session.user.id;

//   console.log(req.session.user)
  return {
    props: {
      userId,
      token: token,
      companyId: id,
    },
  };
});

const Generate = ({ userId, token, companyId }) => {
  return (
    <Grid container spacing={0}>
      <Grid item xs={12} lg={12}>
        <GenerateReportClient
          userId={userId}
          token={token}
          companyId={companyId}
        />
      </Grid>
    </Grid>
  );
};

export default Generate;
