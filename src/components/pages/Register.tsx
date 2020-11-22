import React, { useCallback, useContext, useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';
import Page from './Page';

export const Register: React.FC<RouteComponentProps> = ({ history }) => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [password2, setPassword2] = useState<string>('');
  const authContext = useContext(AuthContext);

  useEffect(() => {
    if (authContext.isAuthenticated && !authContext.loading) {
      history.push('/');
    }
  }, [authContext.isAuthenticated, authContext.loading, history]);

  const register = useCallback(() => {
    authContext.register({
      username,
      password,
    });
  }, [authContext, username, password]);

  return (
    <Page>
      <input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
      <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
      <input type="password2" placeholder="Password again" onChange={(e) => setPassword2(e.target.value)} />
      <button onClick={register} disabled={password2 !== password || !username}>
        Register
      </button>
    </Page>
  );
};

export default Register;
