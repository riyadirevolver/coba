import { AddDivision, EditDivision } from "../../../lib/services/division";
import { withSessionRoute } from "../../../lib/session/withSession";

async function handle(req, res) {
  const { user: userSession } = req.session;
  if (req.method === "POST") {
    try {
      const { body } = req;
      const response = await AddDivision(body, userSession.token);
      return res.json(response);
    } catch (error) {
      console.log(error.response);
      return res.status(500).json({ ok: false });
    }
  }
}
export default withSessionRoute(handle);
