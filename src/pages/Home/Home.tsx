import React, { useState } from 'react';
import { Grid } from '@material-ui/core';

import { ReactComponent as TVIcon } from '../../assets/devices/tv.svg';
import { ReactComponent as KettleIcon } from '../../assets/devices/kettle.svg';
import { ReactComponent as PlaystationIcon } from '../../assets/devices/playstation.svg';
import { ReactComponent as ConditionerIcon } from '../../assets/devices/conditioner.svg';
import { ReactComponent as FanIcon } from '../../assets/devices/fan.svg';

import { DeviceButton } from '../../components/DeviceButton';
import { HandDetector } from '../../components/HandDetector';
import { Page } from '../../components/Page';

export const Home: React.FC = () => {
  const [tvActive, setTVive] = useState(false);
  const [kettleActive, setKettleActive] = useState(false);
  const [playstationActive, setPlaystationActive] = useState(false);
  const [conditionerActive, setConditionerActive] = useState(false);
  const [fanActive, setFanActive] = useState(false);

  return (
    <Page>
      <Grid container justify="center">
        <Grid item xs={10} lg={5}>
          <h4>You:</h4>
          <HandDetector
            /* eslint-disable no-console */
            onSwipeUp={() => console.log('onSwipeUp')}
            onSwipeDown={() => console.log('onSwipeDown')}
            onSwipeLeft={() => console.log('onSwipeLeft')}
            onSwipeRight={() => console.log('onSwipeRight')}
            onHandsUp={() => console.log('onHandsUp')}
            /* eslint-enable no-console */
          />
        </Grid>
        <Grid item xs={10} lg={5}>
          <h4>Devices status:</h4>
          <Grid container item xs={12} spacing={3}>
            <Grid item xs={12} lg={6}>
              <DeviceButton icon={TVIcon} isActive={tvActive} onClick={(): void => setTVive((value) => !value)} />
            </Grid>
            <Grid item xs={12} lg={6}>
              <DeviceButton
                icon={KettleIcon}
                isActive={kettleActive}
                onClick={(): void => setKettleActive((value) => !value)}
              />
            </Grid>
          </Grid>
          <Grid container item xs={12} spacing={3}>
            <Grid item xs={12} lg={6}>
              <DeviceButton
                icon={PlaystationIcon}
                isActive={playstationActive}
                onClick={(): void => setPlaystationActive((value) => !value)}
              />
            </Grid>
            <Grid item xs={12} lg={6}>
              <DeviceButton
                icon={ConditionerIcon}
                isActive={conditionerActive}
                onClick={(): void => setConditionerActive((value) => !value)}
              />
            </Grid>
          </Grid>
          <Grid container item xs={12} spacing={3}>
            <Grid item xs={12} lg={6}>
              <DeviceButton icon={FanIcon} isActive={fanActive} onClick={(): void => setFanActive((value) => !value)} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Page>
  );
};

export default Home;
