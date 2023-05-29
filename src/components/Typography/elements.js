import { Box } from '@chakra-ui/react';
import styled from '@emotion/styled';

export const TextWrapper = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
}));

export const IconStart = styled(Box)(() => ({
  display: 'flex',
  marginRight: '10px',
}));
export const IconEnd = styled(Box)(() => ({
  display: 'flex',
  marginLeft: '10px',
}));
