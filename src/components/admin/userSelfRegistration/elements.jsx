import React from "react";
import TableHeadComp from "@mui/material/TableHead";
import PropTypes from "prop-types";
import {
  TableCell,
  TableRow,
  Box,
  useTheme,
  alpha,
  Button,
  Typography,
} from "@mui/material";
import CustomCheckbox from "../../forms/custom-elements/CustomCheckbox";

export const TableHead = ({
  headCell,
  numSelected,
  onSelectAll,
  rowCount,
  sx,
  sxTCell,
  cbColor,
  sxCheckBox,
}) => {
  return (
    <TableHeadComp sx={{ ...sx }}>
      <TableRow>
        <TableCell>
          <CustomCheckbox
            color={cbColor ? cbColor : "primary"}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAll}
            sx={{ sxCheckBox }}
          />
        </TableCell>
        {headCell.map((headCell) => (
          <TableCell key={headCell.id} sx={{ ...sxTCell }}>
            {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHeadComp>
  );
};

TableHead.prototype = {
  headCell: PropTypes.array.isRequired,
  onSelectAll: PropTypes.func.isRequired,
  rowCount: PropTypes.number.isRequired,
  numSelected: PropTypes.number.isRequired,
  cbColor: PropTypes.string,
  sx: PropTypes.object,
  sxTCell: PropTypes.object,
  sxCheckBox: PropTypes.object,
};

export const TableSelected = ({ selectedCount, onClick }) => {
  const theme = useTheme();
  return (
    <>
      {selectedCount > 0 ? (
        <Box
          display="flex"
          alignItems="center"
          sx={{
            py: 2,
            px: 1,
            ...(selectedCount > 0 && {
              bgcolor: (theme) =>
                alpha(
                  theme.palette.primary.main,
                  theme.palette.action.activatedOpacity
                ),
            }),
          }}
        >
          <>
            <Box pr={1}>
              <Button variant="contained" onClick={onClick}>
                Update dichecklist
              </Button>
            </Box>
            <Typography fontSize="13px" fontWeight={600}>
              {selectedCount} Di checklist
            </Typography>
          </>
        </Box>
      ) : null}
    </>
  );
};

TableSelected.prototype = {
  selectedCount: PropTypes.number,
};
