import React from 'react';
import { Grid, Typography } from '@material-ui/core';

import { HandDetector } from '../../components/HandDetector';
import { Page } from '../../components/Page';

export const Home: React.FC = () => {
  return (
    <Page>
      <Grid container direction="column" alignItems="center" justify="center">
        <Grid item xs={12} sm={10} md={8}>
          <h1>Welcome to Smart Room</h1>
        </Grid>
        <Grid item xs={12} sm={10} md={8}>
          <HandDetector
            /* eslint-disable no-console */
            onSwipeUp={() => console.log('onSwipeUp')}
            onSwipeDown={() => console.log('onSwipeDown')}
            onSwipeLeft={() => console.log('onSwipeLeft')}
            onSwipeRight={() => console.log('onSwipeRight')}
            /* eslint-enable no-console */
          />
        </Grid>
        <Grid item xs={12} sm={10} md={8}>
          <Typography align="center" variant="h6" className="text-center">
            Smart Room Application Based on Gesture Control
          </Typography>
        </Grid>
      </Grid>
    </Page>
  );
};

export default Home;
