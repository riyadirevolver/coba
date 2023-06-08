import { Avatar, Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { UserCard } from "./elements";

import propTypes from "prop-types";

const UserListCard = ({
    fullname,
    nik,
    email,
    image,
    onViewHistory,
    onEdit,
    btnViewHistoryVariant,
    btnEditVariant,
    sx,
    fnSX,
    nikSX,
    emailSX,
}) => {
    return (
        <UserCard sx={{ sx }}>
            <Box display="flex" flexDirection="column" alignItems="center">
                <Box
                    sx={{
                        width: "100%",
                        maxWidth: "150px",
                        height: "150px",
                        maxHeight: "100%",
                    }}
                >
                    <Avatar
                        src={image}
                        alt={fullname}
                        sx={{
                            height: "100%",
                            width: "100%",
                        }}
                    />
                </Box>
                <Box display="flex" flexDirection="column" py={3}>
                    <Typography
                        variant="h3"
                        sx={{
                            fontWeight: 700,
                            textAlign: "center",
                            mb: 1,
                            ...fnSX,
                        }}
                    >
                        {fullname}
                    </Typography>
                    <Typography
                        variant="Body1"
                        sx={{
                            fontWeight: 400,
                            textAlign: "center",
                            mb: 2,
                            ...nikSX,
                        }}
                    >
                        {nik}
                    </Typography>
                    <Typography
                        variant="Body2"
                        sx={{
                            fontWeight: 700,
                            textAlign: "center",
                            ...emailSX,
                        }}
                    >
                        {email}
                    </Typography>
                </Box>
                <Box
                    display="flex"
                    width="100%"
                    justifyContent="space-between"
                    px={3}
                >
                    {/* <Link href="google.com">google</Link> */}
                    <Button
                        variant={btnViewHistoryVariant}
                        onClick={(e) => onViewHistory?.(e)}
                    >
                        View history
                    </Button>
                    <Button
                        variant={btnEditVariant}
                        onClick={(e) => onEdit?.(e)}
                    >
                        Edit Data
                    </Button>
                </Box>
            </Box>
        </UserCard>
    );
};

UserListCard.defaultProps = {
    btnViewHistoryVariant: "outlined",
    btnEditVariant: "outlined",
};

UserListCard.propTypes = {
    fullname: propTypes.string.isRequired,
    image: propTypes.string,
    nik: propTypes.string.isRequired,
    email: propTypes.string.isRequired,
    onViewHistory: propTypes.func,
    onEdit: propTypes.func,
};

export default UserListCard;
