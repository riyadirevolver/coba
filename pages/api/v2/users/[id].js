import { update } from "../../../../lib/services/user";
import { withSessionRoute } from "../../../../lib/session/withSession";

async function handler(req, res) {
  const { user: userSession } = req.session;

  if (req.method === "PATCH") {
    try {
      const { id } = req.query;
      const { body } = req;
      const { schedule_id, ...payload } = body;

      const response = await update(
        id,
        {
          ...payload,
          user_schedule: {
            schedule_id: schedule_id,
          },
        },
        userSession.token
      );
      return res.json(response);
    } catch (error) {
      console.log(error.response);
      return res.status(500).json({ ok: false });
    }
  }
}

export default withSessionRoute(handler);
