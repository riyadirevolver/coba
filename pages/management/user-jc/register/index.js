import { Grid } from "@mui/material";
import React from "react";
import WithAuth from "../../../../lib/session/withAuth";
import RegisterPersonJC from "../../../../src/components/admin/personJC/RegisterPersonJC";
import axios from "axios";
import { BASE_DIKA_URL } from "../../../../utils/baseUrl";

export const getServerSideProps = WithAuth(async ({ req, query }) => {
  const session = req.session.user;
  const responseClass = await axios.get(`${BASE_DIKA_URL.base_url}/refclass`, {
    headers: {
      "X-API-KEY": BASE_DIKA_URL.x_api_key,
    },
    auth: {
      username: BASE_DIKA_URL.username,
      password: BASE_DIKA_URL.password,
    },
  });
  const responsePayment = await axios.get(
    `${BASE_DIKA_URL.base_url}/refchannelpayment`,
    {
      headers: {
        "X-API-KEY": BASE_DIKA_URL.x_api_key,
      },
      auth: {
        username: BASE_DIKA_URL.username,
        password: BASE_DIKA_URL.password,
      },
    }
  );
  return {
    props: {
      session: session,
      classData: responseClass.data.data,
      paymentData: responsePayment.data.data,
    },
  };
});

const PersonJCRegister = ({ session, classData, paymentData }) => {
  return (
    <Grid container spacing={0}>
      <Grid item xs={12} lg={12}>
        <RegisterPersonJC
          session={session}
          classData={classData}
          paymentData={paymentData}
        />
      </Grid>
    </Grid>
  );
};

export default PersonJCRegister;
