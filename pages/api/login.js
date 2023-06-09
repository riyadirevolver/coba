import { loginService } from "../../lib/services/login";
import { withSessionRoute } from "../../lib/session/withSession";

async function loginRoute(req, res) {
  try {
    const response = await loginService(req.body);

    const { job_level, role, is_leader } = response.user;

    req.session.user = {
      id: response.user.id,
      role: response.user.role,
      level: job_level?.name,
      company_id: response.user.company_id,
      token: response.accessToken,
      isLeader: response.user.is_leader,
    };

    await req.session.save();

    return res.json({
      success: true,
      message: "Berhasil login",
      level: job_level,
      role: role,
      isLeader: is_leader,
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
