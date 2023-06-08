import { DeleteDepepartements, EditDepartements, getDataDepartemens, getDepartemens } from "../../../lib/services/departemens";
import { withSessionRoute } from "../../../lib/session/withSession";

async function handler(req, res) {
    const { user: userSession } = req.session;

    if (req.method === "GET") {
        try {
            const response = await getDepartemens(userSession.token, company_id);
            return res.json(response);
        } catch (error) {
            console.log(error);
            return res.status(500).json({ ok: false });
        }
    }

    if (req.method === "GET") {
        try {
            const response = await getDataDepartemens(userSession.token, company_id);
            return res.json(response);
        } catch (error) {
            console.log(error);
            return res.status(500).json({ ok: false });
        }
    }

    //   edit departemens
    if (req.method === "PATCH") {
        try {
            const { id } = req.query;
            const { body } = req;
            const response = await EditDepartements(id, body, userSession.token)
            return res.json(response);
        } catch (error) {
            console.log(error);
            return res.status(500).json({ oke: false })

        }
    }

    if (req.method === "DELETE") {
        try {
            const { id } = req.query;
            const response = await DeleteDepepartements(id, userSession.token);
            return res.json(response);
        } catch (error) {
            console.log(error);
            return res.status(500).json({ oke: false });

        }
    }
}

export default withSessionRoute(handler);