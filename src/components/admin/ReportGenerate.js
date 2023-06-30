import { Card, Grid, TableCell, TableRow, Typography } from "@mui/material";
import React from "react";

import {
  HEAD_ROWS_REPORT_CLIENT,
  HEAD_ROWS_REPORT_CLIENT_SUMMARY,
  HEAD_ROWS_REPORT_CLIENT_SUMMARY_PER_MONTH,
} from "../../../utils/table-heads/tableHeadReport";
import DashboardReport from "../cards/reports/DashboardReport";
import BaseTableReport from "../table/BaseTableReport";

const ReportGenerate = ({ data }) => {
  return (
    <>
      <DashboardReport data={data} />
      <Grid container spacing={2}>
        <Grid item lg={12}>
          <Card
            sx={{
              padding: "20px 0",
              overflow: "visible",
            }}
          >
            <BaseTableReport
              title={"Total Klien Summary"}
              tableHead={HEAD_ROWS_REPORT_CLIENT_SUMMARY}
            >
              {data.client_summary_data?.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Typography variant="h6" fontWeight="600">
                      {row?.client_name ?? "-"}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h6" fontWeight="600">
                      {row?.pic ?? "-"}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h6" fontWeight="600">
                      {row?.contact ?? "-"}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h6" fontWeight="600">
                      {row?.total_client_request ?? "-"}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h6" fontWeight="600">
                      {row?.total_submit_candidate ?? "-"}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h6" fontWeight="600">
                      {row?.total_candidate_process ?? "-"}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h6" fontWeight="600">
                      {row?.total_candidate_test ?? "-"}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h6" fontWeight="600">
                      {row?.total_candidate_interview ?? "-"}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h6" fontWeight="600">
                      {row?.total_candidate_hired ?? "-"}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h6" fontWeight="600">
                      {row?.total_candidate_rejected ?? "-"}
                    </Typography>
                  </TableCell>
                </TableRow>
              ))}
            </BaseTableReport>
          </Card>
        </Grid>
        <Grid item lg={6}>
          <Card
            sx={{
              padding: "20px 0",
              overflow: "visible",
            }}
          >
            <BaseTableReport
              title={"Total Klien di Kandidat Sent"}
              tableHead={HEAD_ROWS_REPORT_CLIENT}
            >
              {data.client_count_data?.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <Typography variant="h6" fontWeight="600">
                      {user?.client_name ?? "-"}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h6" fontWeight="600">
                      {user?.count ?? "-"}
                    </Typography>
                  </TableCell>
                </TableRow>
              ))}
            </BaseTableReport>
          </Card>
        </Grid>
        <Grid item lg={6}>
          <Card
            sx={{
              padding: "20px 0",
              overflow: "visible",
            }}
          >
            <BaseTableReport
              title={"Total Klien per Bulan"}
              tableHead={HEAD_ROWS_REPORT_CLIENT_SUMMARY_PER_MONTH}
            >
              {data.client_summary_per_month?.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Typography variant="h6" fontWeight="600">
                      {row?.year_periode ?? "-"}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h6" fontWeight="600">
                      {row?.month_periode ?? "-"}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h6" fontWeight="600">
                      {row?.total_client ?? "-"}
                    </Typography>
                  </TableCell>
                </TableRow>
              ))}
            </BaseTableReport>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default ReportGenerate;
