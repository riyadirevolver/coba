import { AddJobPosition } from "../../../lib/services/jobPosition";
import { withSessionRoute } from "../../../lib/session/withSession";

async function handle(req, res) {
  const { user: userSession } = req.session;
  if (req.method === "POST") {
    try {
      const { body } = req;
      body.company_id = userSession.company_id;
      const response = await AddJobPosition(body, userSession.token);
      return res.json(response);
    } catch (error) {
      console.log(error.response);
      return res.status(500).json({ ok: false });
    }
  }
}
export default withSessionRoute(handle);
