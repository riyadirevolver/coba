import {
  DeleteDepartemensSetting,
  EditDepartemensSetting,
} from "../../../lib/services/departementsSettings";
import { withSessionRoute } from "../../../lib/session/withSession";

async function handler(req, res) {
  const { user: userSession } = req.session;

  //   edit departemens
  if (req.method === "PATCH") {
    try {
      const { id } = req.query;
      const { body } = req;
      const response = await EditDepartemensSetting(
        id,
        body,
        userSession.token
      );
      return res.json(response);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ oke: false });
    }
  }

  if (req.method === "DELETE") {
    try {
      const { id } = req.query;
      const response = await DeleteDepartemensSetting(id, userSession.token);
      return res.json(response);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ oke: false });
    }
  }
}
export default withSessionRoute(handler);
