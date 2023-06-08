// import { approveUser } from "../../../lib/services/approval";
import { getMonthReporting } from "../../../lib/services/activityReport/monthReporting";
import { withSessionRoute } from "../../../lib/session/withSession";

async function handler(req, res) {
  const { user: userSession } = req.session;
  if (req.method === "POST") {
    try {
      const { body } = req;
      body.upliner_id = userSession.id;
      const response = await getMonthReporting(body, userSession.token);

      return res.json(response);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ ok: false });
    }
  }
}

export default withSessionRoute(handler);
