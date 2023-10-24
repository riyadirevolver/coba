import { exportPersonJC } from "../../../lib/services/person-jc";
import { withSessionRoute } from "../../../lib/session/withSession";

async function handler(req, res) {
  const { user: userSession } = req.session;
  if (req.method === "GET") {
    try {
      const params = req.query;
      const response = await exportPersonJC(userSession.token, params);
      return res.json(response);
    } catch (error) {
      console.log(error);

      return res.status(500).json({ ok: false });
    }
  }
}

export default withSessionRoute(handler);
