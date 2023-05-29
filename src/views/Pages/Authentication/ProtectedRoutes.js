import { Route, Redirect } from 'react-router-dom';
const ProtectedRoute = ({ children, ...rest }) => {
  const auth = { token: localStorage.getItem('token') };
  return (
    <Route {...rest}>{!auth.token ? <Redirect to="/login" /> : children}</Route>
  );
};
export default ProtectedRoute;
