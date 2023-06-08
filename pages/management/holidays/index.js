import { Grid } from "@mui/material";
import pagination from "../../../lib/services/pagination";
import WithAuth from "../../../lib/session/withAuth";
import HolidaysLists from "../../../src/components/admin/HolidaysLists";

export const getServerSideProps = WithAuth(async ({ query, req }) => {
  const Holidays = await pagination("/holidays", {
    ...query,
  });
  return {
    props: {
      Holidays,
    },
  };
});
const Holidays = ({ Holidays }) => {
  return (
    <Grid container spacing={0}>
      <Grid item xs={12} lg={12}>
        <HolidaysLists data={Holidays} />
      </Grid>
    </Grid>
  );
};

export default Holidays;
