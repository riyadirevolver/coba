import {
  getCompany,
  addCompany,
  editCompany,
  deleteCompany,
} from "../../../lib/services/company";
import { withSessionRoute } from "../../../lib/session/withSession";

async function handler(req, res) {
  const { user: userSession } = req.session;

  //   update
  if (req.method === "PATCH") {
    try {
      const { id } = req.query;
      const { body } = req;
      const response = await editCompany(id, body, userSession.token);
      return res.json(response);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ ok: false });
    }
  }

  // delete company
  if (req.method === "DELETE") {
    try {
      const { id } = req.query;
      const response = await deleteCompany(id, userSession.token);
      return res.json(response);
    } catch (error) {
      return res.status(500).json({ ok: false });
    }
  }
}
export default withSessionRoute(handler);
