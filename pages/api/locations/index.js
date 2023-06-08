import axios from "axios";
import {
  AddLocation,
  deleteLocation,
  EditLocation,
  getLocation,
} from "../../../lib/services/location";
import { withSessionRoute } from "../../../lib/session/withSession";

async function handler(req, res) {
  const { user: userSession } = req.session;
  if (req.method === "GET") {
    try {
      const { company_id } = userSession;
      const { query } = req;
      const response = await getLocation(company_id, userSession.token, query);
      return res.json(response);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ ok: false });
    }
  }

  //   add
  if (req.method === "POST") {
    try {
      const { body } = req;
      body.company_id = userSession.company_id;
      const response = await AddLocation(
        body,
        body.company_id,
        userSession.token
      );
      return res.json(response);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ ok: false });
    }
  }

  //   edit
  if (req.method === "PATCH") {
    try {
      const { id } = req.query;
      const { body } = req;
      const response = await EditLocation(id, body, userSession.token);
      return res.json(response);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ ok: false });
    }
  }

  if (req.method === "DELETE") {
    try {
      const { body } = req;
      const { id } = req.query;
      const response = await deleteLocation(id, body, userSession.token);
      return res.json(response);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ ok: false });
    }
  }
}

export default withSessionRoute(handler);
