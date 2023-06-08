import axios from "axios";

import { getShifting } from "../../../lib/services/shifting";
import { withSessionRoute } from "../../../lib/session/withSession";

async function handler(req, res) {
  const { user: userSession } = req.session;
  if (req.method === "GET") {
    try {
      const { company_id } = userSession;
      const response = await getShifting(company_id, userSession.token);
      return res.json(response);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ ok: false });
    }
  }
}
export default withSessionRoute(handler);
