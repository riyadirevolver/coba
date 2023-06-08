import React from 'react';

import FeatherIcon from 'feather-icons-react';
import { Button, IconButton, Menu, MenuItem, Tooltip } from '@mui/material';
import useHandleModal from '../../hooks/useHandleModal';
import EditUserModal from '../modal/userModal/EditUserModal';

const ActivityMenuAction = (props) => {
  const { data, onClickEdit, onClickDelete } = props;

  const [anchorEl, setAnchorEl] = React.useState(null);
  const { openModal, modalType, handleCloseModal, handleOpenModal } = useHandleModal(false);

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton aria-haspopup="true" onClick={handleClick} aria-label="action" size="large">
        <FeatherIcon icon="more-horizontal" />
      </IconButton>
      <Menu id="card-actions-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem
          onClick={() => {
            onClickEdit?.();
          }}
        >
          Approve Absen
        </MenuItem>
      </Menu>
    </>
  );
};

export default ActivityMenuAction;
