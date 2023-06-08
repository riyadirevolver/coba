import { getDepartements } from "../../../lib/services/departements";
import { withSessionRoute } from "../../../lib/session/withSession";

async function handle(req, res) {
  const { user: userSession } = req.session;
  if (req.method === "GET") {
    try {
      const { company_id } = userSession;
      const { query } = req;
      const response = await getDepartements(
        company_id,
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
export default withSessionRoute(handle);
