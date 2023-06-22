import {
  deletePersonAttachment,
  updatePersonAttachment,
} from "../../../lib/services/person-attachment";
import { withSessionRoute } from "../../../lib/session/withSession";

async function handler(req, res) {
  const { user: userSession } = req.session;
  if (req.method === "PATCH") {
    try {
      const { id } = req.query;
      const { body } = req;
      const response = await updatePersonAttachment(
        id,
        body,
        userSession.token
      );
      return res.json(response);
    } catch (error) {
      return res.status(500).json({ ok: false });
    }
  }
  if (req.method === "DELETE") {
    try {
      const { id } = req.query;
      const response = await deletePersonAttachment(id, userSession.token);
      return res.json(response);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ ok: false });
    }
  }
}

export default withSessionRoute(handler);
