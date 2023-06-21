import {
  addCandidateSent,
  getCandidateSent,
} from "../../../lib/services/candidate-sent";
import { withSessionRoute } from "../../../lib/session/withSession";

async function handler(req, res) {
  const { user: userSession } = req.session;
  if (req.method === "GET") {
    try {
      const response = await getCandidateSent(userSession.token);
      return res.json(response);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ ok: false });
    }
  }

  // register user
  if (req.method === "POST") {
    try {
      const { body, session } = req;
      body.company_id = session.user.company_id;
      const response = await addCandidateSent(body, userSession.token);
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
