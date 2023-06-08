import { approveUser } from "../../../lib/services/approval";
import { withSessionRoute } from "../../../lib/session/withSession";

async function handler(req, res) {
    const { user: userSession } = req.session;
    if (req.method === "POST") {
        try {
            const { body } = req;
            const response = await approveUser(body, userSession.token);
            return res.json(response);
        } catch (error) {
            console.log(error);
            const err = error.response.data;
            if (err.code === 409) {
                return res.status(409).json(err);
            }
            return res.status(500).json({ ok: false });
        }
    }
}

export default withSessionRoute(handler);
