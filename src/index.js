import { ChakraProvider } from '@chakra-ui/provider';
import ReactDOM from 'react-dom';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import theme from 'theme/theme.js';

import AdminLayout from 'layouts/Admin.js';
import { QueryClient, QueryClientProvider } from 'react-query';
import Login from 'views/Pages/Authentication/Login';
import ProtectedRoute from 'views/Pages/Authentication/ProtectedRoutes';

const queryClient = new QueryClient();

ReactDOM.render(
  <QueryClientProvider client={queryClient}>
    <ChakraProvider theme={theme} resetCss={false} position="relative">
      <BrowserRouter basename="/xpipe">
        <Switch>
          <ProtectedRoute path="/admin" component={AdminLayout} />
          <Route path={'/authentication/login'} component={Login} />
          <Redirect from={`/`} to="/authentication/login" />
        </Switch>
      </BrowserRouter>
    </ChakraProvider>
  </QueryClientProvider>,
  document.getElementById('root')
);
