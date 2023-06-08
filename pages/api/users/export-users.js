import axios from "axios";
import { exportUser } from "../../../lib/services/user";
import { withSessionRoute } from "../../../lib/session/withSession";

async function handler(req, res) {
  const { user: userSession } = req.session;
  if (req.method === "GET") {
    try {
      const companyId = req.session.user.company_id;
      const params = req.query;
      const response = await exportUser(userSession.token, companyId,params);
      return res.json(response);
    } catch (error) {
      console.log(error);

      return res.status(500).json({ ok: false });
    }
  }
}

export default withSessionRoute(handler);
