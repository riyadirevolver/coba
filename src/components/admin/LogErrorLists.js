import {
  Box,
  Button,
  Card,
  TableCell,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";

import moment from "moment-timezone";
import { useRouter } from "next/router";
import { HEAD_ROWS_LOG_ERROR } from "../../../utils/table-heads/tableHeadLog";
import BaseTable from "../table/BaseTable";
import { useDebounce } from "../../hooks/useDebounce";

const LogErrorLists = ({ data, id_user }) => {
  const router = useRouter();
  const formRef = React.useRef(null);
  const [isFilter, setIsfilter] = React.useState(true);

  const resetFilterDebounce = useDebounce(isFilter, 1000);
  React.useEffect(() => {
    if (!resetFilterDebounce) {
      setIsfilter(true);
    }
  }, [resetFilterDebounce]);

  const handleResetFilter = () => {
    formRef.current.reset();
    setIsfilter(false);
    router.replace({
      shallow: true,
    });
  };

  const handleSearch = async (event, data) => {
    event.preventDefault();
    const { target } = event;
    const { search } = target;
    router.replace({
      query: {
        "device_model[$like]": `%${search.value}%`,
      },
    });
  };

  return (
    <>
      <Card
        sx={{
          padding: "20px 0 0",
          overflow: "visible",
        }}
      >
        <Box
          sx={{
            mb: 2,
            mr: 3,
            ml: 3,
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
          }}
        >
          <form ref={formRef} onSubmit={handleSearch} className="form-search">
            <Box
              component="div"
              className="filter-search"
              // sx={{ display: "flex" }}
            >
              <TextField
                type="search"
                id="search"
                name="search"
                className="input-search"
                size="small"
                placeholder="cari berdasarkan device"
              />
              <Button
                className="btn-reset"
                variant="text"
                color="warning"
                onClick={handleResetFilter}
                size="small"
              >
                Reset
              </Button>
              <Button
                className="btn-search"
                variant="contained"
                color="primary"
                type="submit"
                size="small"
                // endIcon={<SearchIcon fontSize="small" />}
              >
                Search
              </Button>
            </Box>
          </form>
        </Box>
        {/* tabel */}
        <BaseTable tableHead={HEAD_ROWS_LOG_ERROR} data={data} noWrap={true}>
          {data &&
            data.data.map((item, index) => (
              <TableRow key={index} hover role="checkbox" tabIndex={-1}>
                <TableCell>
                  <Typography variant="h6" fontWeight="600">
                    {item?.device_model ?? "-"}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h6" fontWeight="600">
                    {item?.device_os ?? "-"}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h6" fontWeight="600">
                    {item?.user_agent ?? "-"}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h6" fontWeight="600">
                    {item?.platform ?? "-"}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h6" fontWeight="600">
                    {item?.message ?? "-"}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h6" fontWeight="600">
                    {item?.trace ?? "-"}
                  </Typography>
                </TableCell>
                <TableCell size="small">
                  {item?.created_at ? (
                    <>
                      <Typography variant="h6" fontWeight="600">
                        {moment(item?.created_at).format("DD MMM YYYY") ?? "-"}
                      </Typography>
                      <Typography
                        color="textSecondary"
                        variant="h6"
                        fontWeight="600"
                      >
                        {moment(item?.created_at).format("HH:mm:ss") ?? "-"}
                      </Typography>
                    </>
                  ) : (
                    "-"
                  )}
                </TableCell>
              </TableRow>
            ))}
        </BaseTable>
      </Card>
    </>
  );
};

export default LogErrorLists;
