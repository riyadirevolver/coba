import axios from "axios";
import { exportExcel } from "../../../lib/services/activity";

import { withSessionRoute } from "../../../lib/session/withSession";

async function handler(req, res) {
  const { user: userSession } = req.session;

  if (req.method === "GET") {
    try {
      const response = await exportExcel(userSession.token);
      return res.json(response);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ ok: false });
    }
  }
}

export default withSessionRoute(handler);
