import { editActivity } from "../../../../lib/services/editActivity";
import { withSessionRoute } from "../../../../lib/session/withSession";

async function handler(req, res) {
  const { user: userSession } = req.session;

  if (req.method === "PATCH") {
    try {
      const { id } = req.query;
      const { body } = req;
      const response = await editActivity(id, body, userSession.token);
      return res.json(response);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ ok: false });
    }
  }
}
export default withSessionRoute(handler);
