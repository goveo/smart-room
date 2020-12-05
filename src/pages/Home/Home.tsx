import React from 'react';
import { Grid, Typography } from '@material-ui/core';

import { HandDetector } from '../../components/HandDetector';
import { Page } from '../../components/Page';

export const Home: React.FC = () => {
  return (
    <Page>
      <Grid justify="center" container>
        <Grid item xs={12} sm={10} md={8}>
          <Typography align="center" variant="h6" className="text-center">
            <h1>Welcome to Smart Room</h1>
          </Typography>
          <HandDetector />
          <Typography align="center" variant="h6" className="text-center">
            Smart Room Application Based on Gesture Control
          </Typography>
        </Grid>
      </Grid>
    </Page>
  );
};

export default Home;
