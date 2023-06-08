import { withIronSessionSsr } from "iron-session/next";
import { withSessionSsr } from "./withSession";

const WithAuthAbsen = (gssp) =>
  withSessionSsr(async (context) => {
    const user = context.req.session.user;

    // you can check the user in your DB here
    if (!user) {
      return {
        redirect: {
          permanent: false,
          destination: "/absen/login",
        },
      };
    }

    return await gssp(context);
  });

export default WithAuthAbsen;
