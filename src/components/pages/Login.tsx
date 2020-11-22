import React, { useCallback, useContext, useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';
import Page from './Page';

export const Login: React.FC<RouteComponentProps> = ({ history }) => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const authContext = useContext(AuthContext);

  useEffect(() => {
    if (authContext.isAuthenticated && !authContext.loading) {
      history.push('/');
    }
  }, [authContext.isAuthenticated, authContext.loading, history]);

  const login = useCallback(() => {
    authContext.login({
      username,
      password,
    });
  }, [authContext, username, password]);

  return (
    <Page>
      <input type="text" placeholder="Username" onChange={(event) => setUsername(event.target.value)} />
      <input type="password" placeholder="Password" onChange={(event) => setPassword(event.target.value)} />
      <button onClick={login}>Login</button>
    </Page>
  );
};

export default Login;
