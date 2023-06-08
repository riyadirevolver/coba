import { AddDepartemensSetting } from "../../../lib/services/departementsSettings";
import { withSessionRoute } from "../../../lib/session/withSession";

async function handler(req, res) {
  const { user: userSession } = req.session;
  if (req.method === "POST") {
    try {
      const { body } = req;
      body.company_id = userSession.company_id;
      const response = await AddDepartemensSetting(body, userSession.token);
      return res.json(response);
    } catch (error) {
      console.log(error.response);
      return res.status(500).json({ ok: false });
    }
  }
}
export default withSessionRoute(handler);
