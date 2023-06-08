import { IconButton, Menu, MenuItem } from '@mui/material';
import React from 'react'
import FeatherIcon from "feather-icons-react";
import useHandleModal from '../../hooks/useHandleModal';

const ThreeDotsMenuDepartSetting = (props) => {
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
      <IconButton
        aria-haspopup="true"
        onClick={handleClick}
        aria-label="action"
        size="large"
      >
        <FeatherIcon icon="more-horizontal" />
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
            onClickDelete?.();
          }}
        >
          Delete
        </MenuItem>
      </Menu>
    </>
  );
}

export default ThreeDotsMenuDepartSetting;