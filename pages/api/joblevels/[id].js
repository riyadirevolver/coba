import { deleteJobLevel, EditJobLevel, getJobLevel } from "../../../lib/services/joblevel";
import { withSessionRoute } from "../../../lib/session/withSession";

async function handler(req, res) {
  const { user: userSession } = req.session;

  if (req.method === "GET") {
    try {
      const response = await getJobLevel(userSession.token, company_id);
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

  if(req.method === "DELETE") {
    try {    
      const { id } = req.query;
      const response = await deleteJobLevel(id, userSession.token);
      return res.json(response);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ ok: false });
      
    }
  }
}

export default withSessionRoute(handler);