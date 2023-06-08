import axios from "axios";
import { getCutiRequest } from "../../../lib/services/activity";
import { withSessionRoute } from "../../../lib/session/withSession";

async function handler(req, res) {
    const { user: userSession } = req.session;
    if (req.method === "GET") {
        try {
            const { query } = req;
            const response = await getCutiRequest(userSession.token, query);
            return res.json(response);
        } catch (error) {
            console.log(error);
            return res.status(500).json({ ok: false });
        }
    }
}

export default withSessionRoute(handler);
