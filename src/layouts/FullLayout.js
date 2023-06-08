import {
  Box,
  Container,
  experimentalStyled,
  useMediaQuery,
} from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import LoadingSpinner from "../components/Loadings/LoadingSpinner";
import { useUserSession } from "../hooks/useUserSession";
import Customizer from "./customizer/Customizer";
import Footer from "./footer/Footer";
import Header from "./header/Header";
import Sidebar from "./sidebar/Sidebar";

const MainWrapper = experimentalStyled("div")(() => ({
  display: "flex",
  minHeight: "100vh",
  overflow: "hidden",
  width: "100%",
}));

const PageWrapper = experimentalStyled("div")(({ theme }) => ({
  display: "flex",
  flex: "1 1 auto",
  overflow: "hidden",

  backgroundColor: theme.palette.background.default,
  [theme.breakpoints.up("lg")]: {
    paddingTop: "64px",
  },
  [theme.breakpoints.down("lg")]: {
    paddingTop: "64px",
  },
}));

const FullLayout = ({ children }) => {
  const [isSidebarOpen, setSidebarOpen] = React.useState(true);
  const [isMobileSidebarOpen, setMobileSidebarOpen] = React.useState(false);
  const customizer = useSelector((state) => state.CustomizerReducer);
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"));
  const { data } = useUserSession();
  const [title, setTitle] = React.useState("");

  if (!data) return <LoadingSpinner show={true} />;

  return (
    <MainWrapper>
      <Header
        data={data}
        title={title}
        sx={{
          paddingLeft: isSidebarOpen && lgUp ? "320px" : !lgUp ? "0" : "60px",
          backgroundColor:
            customizer.activeMode === "dark" ? "#20232a" : "#fafbfb",
        }}
        toggleSidebar={() => setSidebarOpen(!isSidebarOpen)}
        toggleMobileSidebar={() => setMobileSidebarOpen(true)}
      />
      <Sidebar
        data={data}
        isSidebardir={customizer.activeDir === "ltr" ? "left" : "right"}
        isSidebarOpen={isSidebarOpen}
        isMobileSidebarOpen={isMobileSidebarOpen}
        onSidebarClose={() => setMobileSidebarOpen(false)}
        handleTitle={(field) => setTitle(field)}
      />
      <PageWrapper>
        <Container
          maxWidth={false}
          sx={{
            paddingTop: "20px",
            paddingLeft:
              isSidebarOpen && lgUp
                ? "350px !important"
                : !lgUp
                ? "20px !important"
                : "90px !important",
          }}
        >
          <Box sx={{ minHeight: "calc(100vh - 170px)" }}>{children}</Box>
          {/* <Customizer /> */}
          <Footer />
        </Container>
      </PageWrapper>
    </MainWrapper>
  );
};

export default FullLayout;
