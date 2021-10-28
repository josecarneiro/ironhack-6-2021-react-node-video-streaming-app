import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = ({ authorized, path, redirect, ...props }) =>
  (authorized && <Route path={path} {...props} />) || (
    <Redirect path={path} to={redirect} />
  );

export default ProtectedRoute;
