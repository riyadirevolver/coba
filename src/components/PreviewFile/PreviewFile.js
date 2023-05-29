import { Box, Button } from '@chakra-ui/react';
import { typePdf, typeExcel } from 'constants/typeFiles';
import React from 'react';
import { MdRemoveRedEye } from 'react-icons/md';
import ImagePdf from 'assets/img/icons/pdf.png';
import ImageExcel from 'assets/img/icons/excel.png';

const PreviewFile = ({ file, type }) => {
  const renderPreview = (fileBLob) => {
    if (typePdf.includes(fileBLob)) {
      return (
        <img
          src={ImagePdf}
          style={{
            width: '200px',
            height: '100%',
            objectFit: 'cover',
          }}
        />
      );
    }
    if (typeExcel.includes(fileBLob)) {
      return (
        <img
        src={ImageExcel}
          style={{
            width: '200px',
            height: '100%',
            objectFit: 'cover',
          }}
        />
      );
    }
  };
  return (
    <Box
      w="100%"
      height="100%"
      position="relative"
      sx={{
        display: 'flex',
        alignContent: 'center',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {renderPreview(type)}
      <Box
        bg="rgba(0,0,0,0.5)"
        position="absolute"
        w="100%"
        h="100%"
        top={0}
        left={0}
      />
      <Box
        position="absolute"
        top="50%"
        left="50%"
        transform="translate(-50%, -50%)"
      >
        <Button
          color="white"
          bg="rgba(0,0,0,0.5)"
          _focus={{ boxShadow: 'none' }}
          _hover={{
            color: 'black',
            backgroundColor: 'rgba(255,255,255,0.5)',
          }}
          onClick={() => {
            window.open(file);
          }}
        >
          <MdRemoveRedEye
            style={{
              marginRight: '10px',
            }}
          />
          Preview
        </Button>
      </Box>
    </Box>
  );
};

export default PreviewFile;
