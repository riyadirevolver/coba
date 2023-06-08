import { withSessionRoute } from '../../lib/session/withSession';

async function sessionRoute(req, res) {
  res.json({ session: req.session.user });
}

export default withSessionRoute(sessionRoute);
