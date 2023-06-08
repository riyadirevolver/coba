import {
  createErrorLog,
  findAllErrorLogs,
} from "../../../lib/services/errorLog";
import { withSessionRoute } from "../../../lib/session/withSession";

async function handler(req, res) {
  const { user: userSession } = req.session;

  if (req.method === "GET") {
    try {
      const response = await findAllErrorLogs(userSession.token);
      return res.json(response);
    } catch (error) {
      console.log(error.response.data);

      return res.status(500).json({ ok: false });
    }
  }
  if (req.method === "POST") {
    try {
      const body = req.body;
      body.user_id = userSession.id;
      const response = await createErrorLog(body, userSession.token);
      return res.json(response);
    } catch (error) {
      console.log(error.response.data);

      return res.status(500).json({ ok: false });
    }
  }
}

export default withSessionRoute(handler);
