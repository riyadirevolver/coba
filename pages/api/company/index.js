import { getCompany, addCompany } from "../../../lib/services/company";
import { withSessionRoute } from "../../../lib/session/withSession";

async function handler(req, res) {
  const { user: userSession } = req.session;
  if (req.method === "GET") {
    try {
      const response = await getCompany(userSession.token);
      return res.json(response);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ ok: false });
    }
  }

  if (req.method === "POST") {
    try {
      const { body } = req;
      const response = await addCompany(body, userSession.token);
      return res.json(response);
    } catch (error) {
        console.log(error);
      return res.status(500).json({ ok: false });
    }
  }
}

export default withSessionRoute(handler);
