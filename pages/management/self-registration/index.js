import { Grid } from "@mui/material";
import pagination from "../../../lib/services/pagination";
import { getUserNotVerif } from "../../../lib/services/user";
import WithAuth from "../../../lib/session/withAuth";
import UserSelfRegistration from "../../../src/components/admin/userSelfRegistration";
import { Buffer } from "buffer";
import { ConvertBase64 } from "../../../utils/convertBase64";

export const getServerSideProps = WithAuth(async function ({ req, query }) {
  const session = req.session.user;
  const buffer = new ConvertBase64(session.token);
  const newSession = buffer.encode();
  const user = await pagination(
    "/users",
    {
      is_mobile: 1,
      company_id: session.company_id,
      "isVerified[$ne]": 1,
      ...query,
    },
    {
      Authorization: `Bearer ${session.token}`,
    }
  );

  // const user = await getUserNotVerif(token, req.session.user.company_id);
  return {
    props: { user, session: newSession },
  };
});

const SelfRegistration = ({ user, session }) => {
  return (
    <Grid container spacing={0}>
      <Grid item xs={12} lg={12}>
        <UserSelfRegistration data={user} session={session} />
      </Grid>
    </Grid>
  );
};

export default SelfRegistration;
