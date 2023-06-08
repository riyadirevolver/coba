import { Grid, Card } from "@mui/material";
import moment from "moment";

import WithAuthClient from "../../../lib/session/withAuthClient";
import { useGetActivityByDate } from "../../../src/hooks/useGetActivityByDate";
import pagination from "../../../lib/services/pagination";
import SearchActivity from "../../../src/components/forms/searchUser/SearchActivity";
import ActivityKehadiranLists from "../../../src/components/admin/ActivityKehadiranLists";
import { getActivity } from "../../../lib/services/activity";

const getActivityByDate = (startDate, endDate) => {
  const start = `${startDate} 05:00`;
  const end = `${endDate} 23:59`;
  if (startDate && endDate) {
    return {
      status: "IN",
      "created_at[$gte]": moment(start).toISOString(),
      "created_at[$lte]": moment(end).toISOString(),
    };
  }
};

export const getServerSideProps = WithAuthClient(async function (context) {
  const { req } = context;
  const token = req.session.user.token;
  const id = req.session.user.company_id;
  const { start_date, end_date, page, per_page, fullname, job_departement_id } =
    context.query;
  const queries = getActivityByDate(start_date, end_date);

  const firstDate = moment(start_date || undefined)
    .startOf("day")
    .utc()
    .toISOString();
  const endDates = moment(end_date || undefined)
    .endOf("day")
    .utc()
    .toISOString();
  const newQueries = useGetActivityByDate(firstDate, endDates);

  const activity = await pagination(
    "/activity",
    {
      "$or[0][status]": "IN",
      "$or[1][status]": "OVERTIME",
      ...(queries ? queries : newQueries),
      ...(fullname && {
        fullname: `%${fullname}%`,
      }),
      ...(job_departement_id && {
        job_departement_id: job_departement_id,
      }),
      "$or[0][upliner2_id]": req.session.user.id,
      "$or[1][upliner3_id]": req.session.user.id,
      page,
      per_page,
    },
    {
      Authorization: token,
    }
  );

//   const mapUser = await getActivity(token, {
//     $limit: 100,
//     ...queries,
//   });
//   return {
//     props: { activity, mapUser, companyId: id },
//   };
  return {
    props: { activity, companyId: id },
  };
});

// { activity,mapUser, companyId }
const Activity = ({ activity, companyId }) => {
  return (
    <Grid container spacing={0}>
      {/* <Card>
        <GoogleMaps data={mapUser} />
      </Card> */}
      <Grid item xs lg={12}>
        <SearchActivity />
      </Grid>
      <Grid item xs lg={12}>
        <ActivityKehadiranLists data={activity} companyId={companyId} />
      </Grid>
    </Grid>
  );
};

export default Activity;
