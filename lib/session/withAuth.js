import { withIronSessionSsr } from "iron-session/next";
import { withSessionSsr } from "./withSession";

const WithAuth = (gssp) =>
  withSessionSsr(async (context) => {
    try {
      const user = context.req.session.user;

      // console.log(context);

      // you can check the user in your DB here
      if (!user) {
        return {
          redirect: {
            permanent: false,
            destination: "/authentication/login",
          },
        };
      }

      // if (user.role != "admin") {
      //   context.req.session.destroy();
      //   return {
      //     redirect: {
      //       permanent: false,
      //       destination: "/absen/login",
      //     },
      //   };
      // }

      return await gssp(context);
    } catch (error) {
      console.log("sssss", error);
      if (error.response.data.code === 401) {
        return {
          redirect: {
            permanent: false,
            destination: "/authentication/login",
          },
        };
      }
    }

    return await gssp(context);
  });

export default WithAuth;
