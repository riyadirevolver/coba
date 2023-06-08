import {
  getOverTimeByID,
  updateOvertimeByID,
} from "../../../lib/services/activity";
import { withSessionRoute } from "../../../lib/session/withSession";

async function handler(req, res) {
  const { user: userSession } = req.session;
  if (req.method === "GET") {
    try {
      const { query } = req;
      const response = await getOverTimeByID(query.id, userSession.token);
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
      const { schedule_id, ...payload } = body;

      const response = await updateOvertimeByID(
        id,
        {
          ...payload,
        },
        userSession.token
      );
      return res.json(response);
    } catch (error) {
      console.log(error.response);
      return res
        .status(500)
        .json({ ok: false, message: error.response.data.message });
    }
  }
}

export default withSessionRoute(handler);
