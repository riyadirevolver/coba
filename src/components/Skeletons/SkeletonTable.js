/* eslint-disable no-unused-vars */
import {
  Box,
  Skeleton,
  SkeletonText,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from '@chakra-ui/react';

import React from 'react';

export const SkeletonTable = ({ dataColumns }) => {
  return (
    <TableContainer>
      <Table variant="simple">
        <TableCaption>Imperial to metric conversion factors</TableCaption>
        <Thead>
          <Tr>
            {dataColumns.map((_, idx) => (
              <Th key={_.Header}>{_.Header}</Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {[...Array(5)].map((_, idx) => (
            <Tr key={idx}>
              {dataColumns.map((b) => (
                <Td key={b.Header}>
                  <Skeleton height="10px" />
                </Td>
              ))}
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};
