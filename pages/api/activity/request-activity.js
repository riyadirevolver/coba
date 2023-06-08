import { requestCheckIn } from "../../../lib/services/requestAbsent";
import { withSessionRoute } from "../../../lib/session/withSession";

async function handler(req, res) {
  const { user: userSession } = req.session;

  if (req.method === "POST") {
    try {
      const { body } = req;
      body.user_id = userSession.id;
      const response = await requestCheckIn(body, userSession.token);
      return res.json(response);
    } catch (error) {
      const conflict = error.response?.data;
      if (conflict.code === 409) {
        return res.status(409).json(conflict);
      } else if (error.response?.data) {
        const errCode = error.response?.data.code;
        return res.status(errCode).json(error.response?.data);
      }
      return res.status(500).json({ ok: false });
    }
  }
}

export default withSessionRoute(handler);
