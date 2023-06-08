
import { AddHolidays, DeleteHolidays, EditHolidays, getHolidays } from "../../../lib/services/holidays";
import { withSessionRoute } from "../../../lib/session/withSession";

async function handler(req, res) {
  const { user: userSession } = req.session;
  if (req.method === "GET") {
    try {
      const response = await getHolidays(userSession.token);
      return res.json(response);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ ok: false });
    }
  }
  if (req.method === "POST") {
    try {
      const { body } = req;
      const response = await AddHolidays(body, userSession.token);
      return res.json(response);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ ok: false });
    }
  }

  // edit hari libur
  if (req.method === "PATCH") {
    try {
      const { id } = req.query;
      const { body } = req;
      const response = await EditHolidays(id, body, userSession.token);
      return res.json(response);
    } catch (error) {
      console.log(error);

      return res.status(500).json({ ok: false });
    }
  }

  // delete hari libur
  if (req.method === "DELETE") {
    try {
      const { id } = req.query;
      const response = await DeleteHolidays(id, userSession.token);
      return res.json(response);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ ok: false });

    }
  }
}
export default withSessionRoute(handler);