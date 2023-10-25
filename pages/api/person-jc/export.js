import { exportPersonJC } from "../../../lib/services/person-jc";
import { withSessionRoute } from "../../../lib/session/withSession";

async function handler(req, res) {
  const { user: userSession } = req.session;
  if (req.method === "POST") {
    try {
      const body = req.body;
      const response = await exportPersonJC(userSession.token, body);
      return res.json(response);
    } catch (error) {
      console.log(error);

      return res.status(500).json({ ok: false });
    }
  }
}

export default withSessionRoute(handler);
