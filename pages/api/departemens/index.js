import { AddDepartements, getDataDepartemens, getDepartemens } from "../../../lib/services/departemens";
import { withSessionRoute } from "../../../lib/session/withSession";

async function handle(req, res) {
    const { user: userSession } = req.session;
    if (req.method === "GET") {
        try {
            const { company_id } = userSession;
            const response = await getDepartemens(
                company_id,
                userSession.token
            );
            return res.json(response);
        } catch (error) {
            console.log(error);
            return res.status(500).json({ ok: false });
        }
    }

    if (req.method === "GET") {
        try {
            const { company_id } = userSession;
            const response = await getDataDepartemens(company_id, userSession.token);
            return res.json(response);
        } catch (error) {
            console.log(error);
            return res.status(500).json({ ok: false });
        }
    }

    // add departemens
    if (req.method === "POST") {
        try {
            const {body} = req;
            const{company_id} = userSession;
            body.company_id = company_id;
            const response = await AddDepartements(body, userSession.token);
            return res.json(response);
        } catch (error) {
            console.log(error);
            return res.status(500).json({ ok: false });

        }
    }
}
export default withSessionRoute(handle);
