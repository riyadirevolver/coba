import { Container } from "@mui/material";
import React from "react";
import LoginButton from "../components/apps/absent/CheckInButton";

const LayoutAbsent = ({ children }) => {
  return (
    <Container maxWidth="sm">
      {children}
      <LoginButton />
    </Container>
  );
};

export default LayoutAbsent;
