import {
  addCandidateSentLog,
  getCandidateSentLog,
} from "../../../lib/services/candidate-sent-logs";
import { withSessionRoute } from "../../../lib/session/withSession";

async function handler(req, res) {
  const { user: userSession } = req.session;
  if (req.method === "GET") {
    try {
      const response = await getCandidateSentLog(userSession.token);
      return res.json(response);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ ok: false });
    }
  }

  if (req.method === "POST") {
    try {
      const { body, session } = req;
      body.company_id = session.user.company_id;
      const response = await addCandidateSentLog(body, userSession.token);
      return res.json(response);
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        ok: false,
        message:
          error.response.data?.message ?? "Terjadi kesalahan pada server",
      });
    }
  }
}

export default withSessionRoute(handler);