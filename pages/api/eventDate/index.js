import { AddEventDate, EditEventDate, getEventDate } from "../../../lib/services/eventDate";
import { withSessionRoute } from "../../../lib/session/withSession";

async function handler(req, res) {
  const { user: userSession } = req.session;
  if (req.method === "GET") {
    try {

      const response = await getEventDate(userSession.token);
      return res.json(response);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ ok: false });
    }
  }
  if (req.method === "POST") {
    try {
      const { body } = req;
      const response = await AddEventDate(body, userSession.token);
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
      const response = await EditEventDate(id, body, userSession.token);
      return res.json(response);
    } catch (error) {
      console.log(error);

      return res.status(500).json({ ok: false });
    }
  }
}
export default withSessionRoute(handler);