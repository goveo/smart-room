import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';
import { CommonProps } from '../../types/CommonProps';

interface Props extends CommonProps {
  component: any;
  exact?: boolean;
  path: string;
}

const PrivateRoute: React.FC<Props> = ({ component: Component, ...restProps }) => {
  const authContext = useContext(AuthContext);
  const { isAuthenticated, loading } = authContext;
  return (
    <Route
      {...restProps}
      render={(props) => (!isAuthenticated && !loading ? <Redirect to="/login" /> : <Component {...props} />)}
    />
  );
};

export default PrivateRoute;
