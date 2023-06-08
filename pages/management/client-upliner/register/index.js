import { Grid } from "@mui/material";
import WithAuth from "../../../../lib/session/withAuth";
import ClientUplinerRegister from "../../../../src/components/management/client-upliner/ClientUplinerRegister";

export const getServerSideProps = WithAuth(async ({ req, query }) => {
   const session = req.session.user;
   return {
     props: {
       session: session,
     },
   };
 });
 
 const Register = ({ session }) => {
   return (
     <Grid container spacing={0}>
       <Grid item xs={12} lg={12}>
         <ClientUplinerRegister session={session} />
       </Grid>
     </Grid>
   );
 };
 
 export default Register;
 