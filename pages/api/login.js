import { loginService } from "../../lib/services/login";
import { withSessionRoute } from "../../lib/session/withSession";

async function loginRoute(req, res) {
  try {
    const response = await loginService(req.body);

    const { role, client_id } = response.user;

    req.session.user = {
      id: response.user.id,
      name: response.user.fullname || "",
      role: role,
      client_id: client_id,
      token: response.accessToken,
    };

    await req.session.save();

    return res.json({
      success: true,
      message: "Berhasil login",
      role: role,
    });
  } catch (error) {
    console.log(error);
    const e = error.toString();

    // handle error from api with response api
    if (error?.response) {
      return res.status(500).json(error.response.data);
    }
    //  handle if error job level === 1 or job level === staff
    return res.status(400).json({
      message: e,
    });
  }
}

export default withSessionRoute(loginRoute);
