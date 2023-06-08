import axios from "axios";
import { getActivity } from "../../../lib/services/activity";
import {
  getUser,
  createUser,
  register,
  update,
  deleteUser,
} from "../../../lib/services/user";
import { withSessionRoute } from "../../../lib/session/withSession";

async function handler(req, res) {
  const { user: userSession } = req.session;

  if (req.method === "GET") {
    try {
      const { query } = req;
      const response = await getActivity(userSession.token, query);
      return res.json(response);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ ok: false });
    }
  }

  if (req.method === "POST") {
    try {
      const { body } = req;
      const response = await register(body, userSession.token);
      return res.json(response);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ ok: false });
    }
  }
}

export default withSessionRoute(handler);
