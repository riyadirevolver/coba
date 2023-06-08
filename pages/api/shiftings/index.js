import axios from "axios";
import {
  AddShifting,
  getShifting,
  updateShifting,
} from "../../../lib/services/shifting";

import { withSessionRoute } from "../../../lib/session/withSession";

async function handler(req, res) {
  const { user: userSession } = req.session;

  if (req.method === "GET") {
    try {
      const response = await getShifting(userSession.token);
      return res.json(response);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ ok: false });
    }
  }

  //   add shifting 
  if (req.method === "POST") {
    try {
      const { body } = req;
      body.company_id = userSession.company_id;
      const response = await AddShifting(
        body,
        body.company_id, 
        userSession.token
        );
      return res.json(response);
    } catch (error) {
      console.log(error.response);
      return res.status(500).json({ ok: false });
    }
  }
}

export default withSessionRoute(handler);