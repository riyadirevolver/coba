// Chakra imports
import { Box, Stack } from '@chakra-ui/react';
import { ArgonLogoLight, ChakraLogoLight } from 'components/Icons/Icons';
import MainPanel from 'components/Layout/MainPanel';
import PanelContainer from 'components/Layout/PanelContainer';
import PanelContent from 'components/Layout/PanelContent';
import Sidebar from 'components/Sidebar/Sidebar.js';
import { SidebarContext } from 'contexts/SidebarContext';
import React, { useState } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import routes from 'routes.js';

const Landing = () => {
  const [toggleSidebar, setToggleSidebar] = useState(false);
  const [sidebarWidth, setSidebarWidth] = useState(275);

  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.layout === '/landing') {
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        );
      }
      if (prop.collapse) {
        return getRoutes(prop.items);
      }
      if (prop.category) {
        return getRoutes(prop.items);
      } else {
        return null;
      }
    });
  };

  return (
    <SidebarContext.Provider
      value={{
        sidebarWidth,
        setSidebarWidth,
        toggleSidebar,
        setToggleSidebar,
      }}
    >
      <Box minH="100vh" bg="linear-gradient(180deg, #3182CE 0%, #63B3ED 100%)">
        <Sidebar
          routes={routes}
          landing={true}
          logo={
            <Stack
              direction="row"
              spacing="12px"
              align="center"
              justify="center"
            >
              <ArgonLogoLight w="74px" h="27px" />
              <Box w="1px" h="20px" bg={'white'} />
              <ChakraLogoLight w="82px" h="21px" />
            </Stack>
          }
          display="none"
        />
        <MainPanel
          w={{
            base: '100%',
            xl: `calc(100% - 275px)`,
          }}
          minH="100vh"
        >
          <PanelContent>
            <PanelContainer>
              <Switch>
                {getRoutes(routes)}
                <Redirect from="/admin" to="/admin/dashboard/default" />
              </Switch>
            </PanelContainer>
          </PanelContent>
        </MainPanel>
      </Box>
    </SidebarContext.Provider>
  );
};

export default Landing;
