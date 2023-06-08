import { register } from "../../../../lib/services/user";
import { withSessionRoute } from "../../../../lib/session/withSession";

async function handler(req, res) {
  const { user: userSession } = req.session;

  // register user
  if (req.method === "POST") {
    try {
      const { body, session } = req;
      const { schedule_id, ...payload } = body;
      payload.company_id = session.user.company_id;

      const response = await register(
        {
          ...payload,
          ...(schedule_id && {
            user_schedule: {
              schedule_id: schedule_id,
            },
          })
        },
        userSession.token
      );

      return res.json(response);
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        ok: false,
        message:
          error.response.data?.message ?? "Terjadi kesalahan pada server",
      });
    }
  }
}

export default withSessionRoute(handler);
