import {
  AddJobLevel,
  EditJobLevel,
  getJobLevel,
  registerJobLevel,
} from "../../../lib/services/joblevel";
import { withSessionRoute } from "../../../lib/session/withSession";

async function handler(req, res) {
  const { user: userSession } = req.session;
  if (req.method === "GET") {
    try {
      const { company_id } = userSession;
      const { query } = req;
      const response = await getJobLevel(company_id, userSession.token,query);
      return res.json(response);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ ok: false });
    }
  }

  // create data job level
  if (req.method === "POST") {
    try {
      const { body } = req;
      const { company_id } = userSession;
      body.company_id = company_id;
      const response = await AddJobLevel(body, userSession.token);

      return res.json(response);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ ok: false });
    }
  }
  if (req.method === "PATCH") {
    try {
      const { id } = req.query;
      const { body } = req;
      const response = await EditJobLevel(id, body, userSession.token);
      return res.json(response);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ ok: false });
    }
  }
}

export default withSessionRoute(handler);
