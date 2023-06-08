import { DeleteJobPosition, EditJobPosition } from "../../../lib/services/jobPosition";
import { withSessionRoute } from "../../../lib/session/withSession";

async function handler(req, res) {
  const { user: userSession } = req.session;

  // edit posisi
  if (req.method === "PATCH") {
    try {
      const { id } = req.query;
      const { body } = req;
      const response = await EditJobPosition(id, body, userSession.token);
      return res.json(response);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ oke: false });
    }
  }

//   delete posisi
if (req.method === "DELETE") {
    try {
      const { id } = req.query;
      const response = await DeleteJobPosition(id, userSession.token);
      return res.json(response);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ oke: false });
    }
  }
}
export default withSessionRoute(handler);
