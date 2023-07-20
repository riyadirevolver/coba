import { Grid } from "@mui/material";
import axios from "axios";
import React from "react";
import { getOnePersonJC } from "../../../../lib/services/person-jc";
import WithAuth from "../../../../lib/session/withAuth";
import EditPersonJC from "../../../../src/components/admin/personJC/EditPersonJC";
import { BASE_DIKA_URL } from "../../../../utils/baseUrl";

export const getServerSideProps = WithAuth(async ({ req, params }) => {
  const { id } = params;
  const session = req.session.user;
  const user = await getOnePersonJC(id, session.token);
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
      id_user: id,
      session: session,
      classData: responseClass.data.data,
      paymentData: responsePayment.data.data,
      user: user,
    },
  };
});

const PersonJCEdit = ({ id_user, user, classData, paymentData }) => {
  return (
    <Grid container spacing={0}>
      <Grid item xs={12} lg={12}>
        <EditPersonJC
          id_user={id_user}
          data={user}
          classData={classData}
          paymentData={paymentData}
        />
      </Grid>
    </Grid>
  );
};

export default PersonJCEdit;
