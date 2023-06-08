import { getEmployeeType } from "../../../lib/services/employeeType";
import { withSessionRoute } from "../../../lib/session/withSession";

async function handle(req, res) {
  const { user: userSession } = req.session;
  if (req.method === "GET") {
    try {
      const companyId = userSession.company_id;
      const { query } = req;
      const response = await getEmployeeType(
        companyId,
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
