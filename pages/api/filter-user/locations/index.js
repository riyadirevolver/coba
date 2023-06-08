import { getLocation } from "../../../../lib/services/filter-user";
import { withSessionRoute } from "../../../../lib/session/withSession";

async function handle(req, res) {
  const { user: userSession } = req.session;
  if (req.method === "GET") {
    try {
      const { company_id } = userSession;
      const response = await getLocation(company_id, userSession.token);
      return res.json(response);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ ok: false });
    }
  }
}
export default withSessionRoute(handle);
