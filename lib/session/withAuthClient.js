import { withSessionSsr } from "./withSession";

const roles = ["client", "client3"];

const WithAuthClient = (gssp) =>
  withSessionSsr(async (context) => {
    try {
      const user = context.req.session.user;

      // you can check the user in your DB here
      if (!user) {
        context.req.session.destroy();
        return {
          redirect: {
            permanent: false,
            destination: "/authentication/login",
          },
        };
      }

      if (!roles.includes(user.role)) {
        context.req.session.destroy();
        return {
          redirect: {
            permanent: false,
            destination: "/authentication/login",
          },
        };
      }

      return await gssp(context);
    } catch (error) {
      console.log(error);
      if (error.response?.data?.code === 401) {
        return {
          redirect: {
            permanent: false,
            destination: "/authentication/login",
          },
        };
      }
    }
  });

export default WithAuthClient;
