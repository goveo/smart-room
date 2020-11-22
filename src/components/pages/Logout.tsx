import React, { useContext, useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';

export const Logout: React.FC<RouteComponentProps> = ({ history }) => {
  const authContext = useContext(AuthContext);

  useEffect(() => {
    authContext.logout();
    history.push('/');
  }, [authContext, history]);

  return null;
};

export default Logout;
