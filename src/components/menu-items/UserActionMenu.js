import { IconButton, Menu, MenuItem } from "@mui/material";
import { useRouter } from "next/dist/client/router";
import FeatherIcon from "feather-icons-react";
import React from "react";
import useHandleModal from "../../hooks/useHandleModal";
import DeleteUserModal from "../modal/userModal/DeleteUserModal";

const UserActionMenu = (props) => {
  const router = useRouter();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { openModal, modalType, handleCloseModal, handleOpenModal } =
    useHandleModal(false);

  const handleMenuClick = (val1) => {
    console.log(val1);
  };

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const { data } = props;
  return (
    <>
      {openModal && (
        <DeleteUserModal
          open={openModal}
          type={modalType}
          closeModalHandler={handleCloseModal}
          data={data}
        />
      )}
      <IconButton
        aria-haspopup="true"
        onClick={handleClick}
        aria-label="action"
        size="large"
      >
        <FeatherIcon icon="more-horizontal" />
      </IconButton>
      <Menu
        id="card-action-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem
          onClick={() => router.push(`/management/editRegistration/${data.id}`)}
        >
          Edit
        </MenuItem>
        <MenuItem onClick={() => handleOpenModal("delete")}>Hapus</MenuItem>
      </Menu>
    </>
  );
};

export default UserActionMenu;
