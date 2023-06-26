import { Card, TableCell, TableRow, Typography } from "@mui/material";
import React from "react";
import { HEAD_ROWS_REPORT_CLIENT } from "../../../utils/table-heads/tableHeadReport";
import BaseTableReport from "../table/BaseTableReport";

const ReportGenerate = ({ data }) => {
  return (
    <>
      <Card
        sx={{
          padding: "20px 0",
          overflow: "visible",
        }}
      >
        <BaseTableReport tableHead={HEAD_ROWS_REPORT_CLIENT}>
          {data.client_data?.map((user) => (
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
    </>
  );
};

export default ReportGenerate;
