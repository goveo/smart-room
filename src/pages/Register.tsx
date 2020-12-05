import React, { useContext, useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Grid, Typography } from '@material-ui/core';
import RegisterForm from '../components/Auth/RegisterForm';
import AuthContext from '../context/auth/authContext';
import { Page } from '../components/Page';

export const Register: React.FC<RouteComponentProps> = ({ history }) => {
  const authContext = useContext(AuthContext);

  useEffect(() => {
    if (authContext.isAuthenticated) {
      history.push('/');
    }
  }, [authContext.isAuthenticated, history]);
  return (
    <Page>
      <Grid justify="center" alignItems="center" container spacing={3}>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <RegisterForm
            onSubmit={authContext.register}
            postContent={
              <Typography align="center">
                Already have an account? <Link to="/login">Login</Link>
              </Typography>
            }
          />
        </Grid>
      </Grid>
    </Page>
  );
};

export default Register;
