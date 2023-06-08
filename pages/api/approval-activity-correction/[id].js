import { updateActivityCorrection } from "../../../lib/services/approval";
import { withSessionRoute } from "../../../lib/session/withSession";

async function handler(req, res) {
  const { user: userSession } = req.session;

  if (req.method === "PATCH") {
    try {
      const { id } = req.query;
      const { body } = req;
      const response = await updateActivityCorrection(
        id,
        body,
        userSession.token
      );
      return res.json(response);
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ ok: false, message: error.response.data.message });
    }
  }
}
export default withSessionRoute(handler);
