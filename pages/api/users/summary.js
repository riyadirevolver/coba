import { withSessionRoute } from "../../../lib/session/withSession";
import { getUserSummary } from "../../../lib/services/userSummary";

async function handler(req, res) {
  const { user: userSession } = req.session;
  if (req.method === "GET") {
    try {
      const { query } = req;
      const response = await getUserSummary(
        userSession.id,
        userSession.token,
        query
      );
      return res.json(response);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ ok: false });
    }
  }
}

export default withSessionRoute(handler);
