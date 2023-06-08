import { CacheProvider } from "@emotion/react";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import Head from "next/head";
import NextNProgress from "nextjs-progressbar";
import PropTypes from "prop-types";
import * as React from "react";
import { useSelector } from "react-redux";
import "../data";
import createEmotionCache from "../src/createEmotionCache";
import BlankLayout from "../src/layouts/BlankLayout";
import FullLayout from "../src/layouts/FullLayout";
import wrapper from "../src/store/Store";
import RTL from "../src/theme/RTL";
import ThemeSettings from "../src/theme/ThemeSettings";
import "../styles/style.scss";

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

const layouts = {
  Blank: BlankLayout,
};

const fetcher = async (url) => await axios.get(url);

function MyApp(props) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const Gettheme = ThemeSettings();
  const customizer = useSelector((state) => state.CustomizerReducer);
  const Layout = layouts[Component.layout] || FullLayout;

  return (
    <>
      <NextNProgress />
      <CacheProvider value={emotionCache}>
        <Head>
          <title>HADIR</title>
          <meta name="viewport" content="initial-scale=1, width=device-width" />
        </Head>
        <ThemeProvider theme={Gettheme}>
          <RTL direction={customizer.activeDir}>
            <CssBaseline />
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </RTL>
        </ThemeProvider>
      </CacheProvider>
    </>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  emotionCache: PropTypes.object,
  pageProps: PropTypes.object.isRequired,
};

export default wrapper.withRedux(MyApp);
