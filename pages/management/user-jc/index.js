import { Grid } from "@mui/material";
import pagination from "../../../lib/services/pagination";
import WithAuth from "../../../lib/session/withAuth";
import PersonJCLists from "../../../src/components/admin/PersonJCLists";
import SearchPersonJC from "../../../src/components/forms/search/SearchPersonJC";

export const getServerSideProps = WithAuth(async ({ query, req }) => {
  // const companyId = req.session.user.company_id;
  // const id = req.session.user.id;

  const users = await pagination(
    "/person-jc",
    {
      ...query,
    },
    {
      Authorization: req.session.user.token,
    }
  );
  return {
    props: {
      users,
    },
  };
});
const UserJC = ({ users }) => {
  return (
    <Grid container spacing={0}>
      <Grid item xs={12} lg={12}>
        <SearchPersonJC />
      </Grid>
      <Grid item xs={12} lg={12}>
        <PersonJCLists data={users} />
      </Grid>
    </Grid>
  );
};

export default UserJC;
