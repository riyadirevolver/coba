import {
  deleteShifting,
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

  //   update
  if (req.method === "PATCH") {
    try {

      const { id } = req.query;
      const { body } = req;
      const response = await updateShifting(id, body, userSession.token);
      return res.json(response);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ ok: false });
    }
  }

  // delete
  if (req.method === "DELETE") {
    try {
      const { id } = req.query;
      const response = await deleteShifting(
        id,
        userSession.token
        );
      return res.json(response);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ ok: false });
    }
  }
}

export default withSessionRoute(handler);
