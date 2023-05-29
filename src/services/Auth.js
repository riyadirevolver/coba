import BaseApi from "api/BaseApi";

const Auth = {
  create: async (data) => {
    return await BaseApi().post("/authentication", data);
  },
};

export default Auth;
