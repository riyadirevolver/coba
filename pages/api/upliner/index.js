import { getUpliner, getUplinerBySearch } from "../../../lib/services/upliner";
import { withSessionRoute } from "../../../lib/session/withSession";


async function handle(req, res) {
  const { user: userSession } = req.session;
  if (req.method === "GET") {
    try {
      const level = req.query.level_id;
      const name = req.query.fullname;
      const response = await getUpliner(
        userSession.token,
        userSession.company_id,
        level,
        name
      );
      return res.json(response);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ ok: false });
    }
  }
}
export default withSessionRoute(handle);
