import axios from "axios";
import { addSchedule, getSchedule } from "../../../lib/services/schedule";
import { withSessionRoute } from "../../../lib/session/withSession";

async function handler(req, res) {
  const { user: userSession } = req.session;
  if (req.method === "GET") {
    try {
      const { company_id } = userSession;
      const response = await getSchedule(company_id, userSession.token);
      return res.json(response);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ ok: false });
    }
  }

  if (req.method === "POST") {
    try {
      const { body } = req;
      body.company_id = userSession.company_id;
      const response = await addSchedule(body, userSession.token);
      return res.json(response);
    } catch (error) {
      console.log(error.response);
      return res.status(500).json({ ok: false });
    }
  }
}
export default withSessionRoute(handler);
