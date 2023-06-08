import { Grid } from "@mui/material";
import { getDepartemens } from "../../../lib/services/departemens";
import pagination from "../../../lib/services/pagination";
import WithAuth from "../../../lib/session/withAuth";
import DepartementsSettingsLists from "../../../src/components/admin/DepartementsSettingsLists";

export const getServerSideProps = WithAuth(async ({query, req}) => {
	const id = req.session.user.company_id;
	const token = req.session.user.token;
	const departement = await getDepartemens(id, token);
  const departemensSetting = await pagination(
    `/department-setting?search_company_id=${id}`, 
    {
      ...query,
    },
    {
      Authorization : token,
    }
  );
  return{
    props: {
			departement,
      departemensSetting,
    }
  }
})
const DepartementsSettings = ({departemensSetting, departement}) => {

  return (
    <Grid container spacing={0}>
      <Grid item xs={12} lg={12}>
				<DepartementsSettingsLists data={departemensSetting} departement={departement}/>
       
      </Grid>
    </Grid>
  );
};

export default DepartementsSettings;