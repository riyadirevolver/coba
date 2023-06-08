/* eslint-disable react/no-unescaped-entities */
import {
    Container,
    Grid,
    List,
    ListItem,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import UserList from "../../../src/components/cards/userProfileCard/UserListCard";

const userList = [
    {
        fullname: "Example 1",
        nik: "NIK 12345678",
        email: "example1@example.com",
    },
    {
        fullname: "Example 2",
        nik: "NIK 12345679",
        email: "example2@example.com",
    },
    {
        fullname: "Example 3",
        nik: "NIK 12345670",
        email: "example3@example.com",
    },
];
const UserListCard = () => {
    return (
        <>
            <Container>
                <Typography variant="h1">User Profile Card</Typography>
                <Box>
                    <Typography variant="body1">
                        first please import UserProfile
                    </Typography>
                    <List sx={{ width: "100%", bgcolor: "background.paper" }}>
                        <ListItem>
                            1.
                            <Typography
                                variant="body1"
                                sx={{
                                    bgcolor: "#edebeb",
                                    p: 1,
                                    borderRadius: 2,
                                    ml: 2,
                                }}
                            >
                                import UserListCard from
                                "../../../src/components/cards/userProfileCard/UserListCard"
                            </Typography>
                        </ListItem>
                    </List>
                </Box>
                {/* use userList */}
                <Grid container>
                    <Grid item xs={12} md={6} xl={3}>
                        <UserList
                            fullname={userList[0].fullname}
                            nik={userList[0].nik}
                            email={userList[0].email}
                        />
                    </Grid>
                </Grid>

                <Typography variant="h2">More Example</Typography>
                <Grid container spacing={2}>
                    {userList.map((item, idx) => (
                        <Grid item xs={12} md={4} xl={3} key={idx}>
                            <UserList
                                fullname={userList[0].fullname}
                                nik={userList[0].nik}
                                email={userList[0].email}
                            />
                        </Grid>
                    ))}
                </Grid>

                <Box backgroundColor="white" p={2}>
                    <Typography variant="h2">Api</Typography>
                    {/* <TableContainer> */}
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Props</TableCell>
                                <TableCell>Type</TableCell>
                                <TableCell>Desc</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell>fullname</TableCell>
                                <TableCell>string</TableCell>
                                <TableCell>
                                    props to show Full name of user in component
                                    UserListCard
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>nik</TableCell>
                                <TableCell>string</TableCell>
                                <TableCell>
                                    props to show NIK in component UserListCard
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>email</TableCell>
                                <TableCell>string</TableCell>
                                <TableCell>
                                    props to show Email in component
                                    UserListCard
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>btnViewHistoryVariant</TableCell>
                                <TableCell>Func</TableCell>
                                <TableCell>-</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>btnEditVariant</TableCell>
                                <TableCell>Func</TableCell>
                                <TableCell>-</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>sx</TableCell>
                                <TableCell>SxProps / MUI sx style</TableCell>
                                <TableCell>
                                    this same things use like MUI sx style /
                                    react style use for layout card
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>fnSX</TableCell>
                                <TableCell>SxProps / MUI sx style</TableCell>
                                <TableCell>
                                    this same things use like MUI sx style /
                                    react style use for fullname style text
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>fnSX</TableCell>
                                <TableCell>SxProps / MUI sx style</TableCell>
                                <TableCell>
                                    this same things use like MUI sx style /
                                    react style use for NIK style text
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>fnSX</TableCell>
                                <TableCell>SxProps / MUI sx style</TableCell>
                                <TableCell>
                                    this same things use like MUI sx style /
                                    react style use for Email style text
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                    {/* </TableContainer> */}
                </Box>
            </Container>
        </>
    );
};

export default UserListCard;
