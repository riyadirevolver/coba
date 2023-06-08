import React from 'react';
import Image from 'next/image';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Avatar,
  Chip,
} from '@mui/material';

import img1 from '../../assets/images/users/1.jpg';
import img2 from '../../assets/images/users/2.jpg';
import img3 from '../../assets/images/users/3.jpg';
import img4 from '../../assets/images/users/4.jpg';
import img5 from '../../assets/images/users/5.jpg';
import { getUser } from '../../lib/services/user';

const basics = [
  {
    id: '1',
    imgsrc: img1,
    name: 'Sunil Joshi',
    post: 'Web Designer',
    pname: 'Elite Admin',
    teams: [
      {
        id: '1.1',
        color: 'secondary.main',
        text: 'S',
      },
      {
        id: '1.2',
        color: 'error.main',
        text: 'D',
      },
    ],
    status: 'Active',
    budget: '3.9',
  },
  {
    id: '2',
    imgsrc: img2,
    name: 'Andrew McDownland',
    post: 'Project Manager',
    pname: 'Real Homes WP Theme',
    teams: [
      {
        id: '2.1',
        color: 'primary.main',
        text: 'A',
      },
      {
        id: '2.2',
        color: 'warning.main',
        text: 'X',
      },
      {
        id: '2.3',
        color: 'secondary.main',
        text: 'N',
      },
    ],
    status: 'Pending',
    budget: '24.5',
  },
  {
    id: '3',
    imgsrc: img3,
    name: 'Christopher Jamil',
    post: 'Project Manager',
    pname: 'MedicalPro WP Theme',
    teams: [
      {
        id: '3.1',
        color: 'error.main',
        text: 'X',
      },
    ],
    status: 'Completed',
    budget: '12.8',
  },
  {
    id: '4',
    imgsrc: img4,
    name: 'Nirav Joshi',
    post: 'Frontend Engineer',
    pname: 'Hosting Press HTML',
    teams: [
      {
        id: '4.1',
        color: 'primary.main',
        text: 'Y',
      },
      {
        id: '4.2',
        color: 'error.main',
        text: 'X',
      },
    ],
    status: 'Active',
    budget: '2.4',
  },
  {
    id: '5',
    imgsrc: img5,
    name: 'Micheal Doe',
    post: 'Content Writer',
    pname: 'Helping Hands WP Theme',
    teams: [
      {
        id: '5.1',
        color: 'secondary.main',
        text: 'S',
      },
    ],
    status: 'Cancel',
    budget: '9.3',
  },
];

export async function getServerSideProps({ query }) {
  const users = await getUser();

  return {
    props: {
      users,
    },
  };
}

const BasicTable = ({ users }) => (
  <Card>
    <CardContent>
      <Box
        sx={{
          overflow: {
            xs: 'auto',
            sm: 'unset',
          },
        }}
      >
        <Table
          aria-label="simple table"
          sx={{
            whiteSpace: 'nowrap',
          }}
        >
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography variant="h5">User</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h5">Email</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.data.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <Typography variant="h6" fontWeight="600">
                    {user.fullname}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    color="textSecondary"
                    variant="h6"
                    fontWeight="400"
                  >
                    {user.email}
                  </Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </CardContent>
  </Card>
);

export default BasicTable;
