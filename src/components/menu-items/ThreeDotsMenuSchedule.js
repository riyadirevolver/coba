import { Box, IconButton, Menu, MenuItem } from "@mui/material";
import React from "react";
import FeatherIcon from "feather-icons-react";
import useHandleModal from "../../hooks/useHandleModal";

const ThreeDotsMenuSchedule = (props) => {
  const { data, onClickDetail, onClickEdit, onClickDelete } = props;

  const [anchorEl, setAnchorEl] = React.useState(null);
  const { openModal, modalType, handleCloseModal, handleOpenModal } =
    useHandleModal(false);

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Box display="flex" flexDirection="column">
        <Box sx={{ textAlign: "right", mr: -2 }}>
          <IconButton
            aria-haspopup="true"
            onClick={handleClick}
            aria-label="action"
            size="large"
          >
            <FeatherIcon icon="more-vertical" />
          </IconButton>
          <Menu
            id="card-actions-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem
              onClick={() => {
                onClickDetail?.();
              }}
            >
              Detail
            </MenuItem>
            <MenuItem
              onClick={() => {
                onClickEdit?.();
              }}
            >
              Edit
            </MenuItem>
            <MenuItem
              onClick={() => {
                onClickDelete?.();
              }}
            >
              Delete
            </MenuItem>
          </Menu>
        </Box>
      </Box>
    </>
  );
};

export default ThreeDotsMenuSchedule;
