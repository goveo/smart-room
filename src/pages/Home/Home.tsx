import React, { useCallback, useMemo, useState } from 'react';
import styled from 'styled-components';
import { Grid } from '@material-ui/core';

import { ReactComponent as TVIcon } from '../../assets/devices/tv.svg';
import { ReactComponent as KettleIcon } from '../../assets/devices/kettle.svg';
import { ReactComponent as PlaystationIcon } from '../../assets/devices/playstation.svg';
import { ReactComponent as ConditionerIcon } from '../../assets/devices/conditioner.svg';
import { ReactComponent as FanIcon } from '../../assets/devices/fan.svg';

import { DeviceButton } from '../../components/DeviceButton';
import { HandDetector } from '../../components/HandDetector';
import { Page } from '../../components/Page';
import { GestureSelector } from '../../components/GestureSelector';
import { DeviceActions } from '../../components/GestureSelector/GestureSelector';
import { Gesture } from '../../components/HandDetector/HandDetector';

export type Device = 'TV' | 'Kettle' | 'Playstation' | 'Conditioner' | 'Fan';

export const Home: React.FC = () => {
  const [activeDevices, setActiveDevices] = useState<Device[]>([]);
  const [deviceActions, setDeviceActions] = useState<DeviceActions>({
    TV: 'SwipeUp',
    Kettle: 'SwipeDown',
    Playstation: 'SwipeLeft',
    Conditioner: 'SwipeRight',
    Fan: 'HandsUp',
  });

  const devices = useMemo<Device[]>(() => ['TV', 'Kettle', 'Playstation', 'Conditioner', 'Fan'], []);

  const getDevicesByGesture = useCallback(
    (gesture: Gesture) => {
      return Object.entries(deviceActions).reduce((devices: Device[], [key, value]) => {
        if (value === gesture) {
          devices.push(key as Device);
        }
        return devices;
      }, []);
    },
    [deviceActions],
  );

  const toggleDevice = useCallback(
    (deviceName: Device) => {
      setActiveDevices((activeDevices) => {
        if (activeDevices.includes(deviceName)) {
          return activeDevices.filter((device: string) => device !== deviceName);
        }
        return [...activeDevices, deviceName];
      });
    },
    [setActiveDevices],
  );

  const toggleDeviceByGesture = useCallback(
    (gesture: Gesture) => {
      getDevicesByGesture(gesture).map((device) => toggleDevice(device));
    },
    [getDevicesByGesture, toggleDevice],
  );

  return (
    <Page>
      <Grid container justify="center">
        <Grid item xs={10} lg={5}>
          <h4>You:</h4>
          <HandDetector
            onSwipeUp={(): void => toggleDeviceByGesture('SwipeUp')}
            onSwipeDown={(): void => toggleDeviceByGesture('SwipeDown')}
            onSwipeLeft={(): void => toggleDeviceByGesture('SwipeLeft')}
            onSwipeRight={(): void => toggleDeviceByGesture('SwipeRight')}
            onHandsUp={(): void => toggleDeviceByGesture('HandsUp')}
          />
          <GestureSelectorContainer>
            <h4>Gestures:</h4>
            <GestureSelector devices={devices} onChange={setDeviceActions} />
          </GestureSelectorContainer>
        </Grid>
        <Grid item xs={10} lg={5}>
          <h4>Devices status:</h4>
          <Grid container item xs={12} spacing={3}>
            <Grid item xs={12} lg={6}>
              <DeviceButton
                icon={TVIcon}
                isActive={activeDevices.includes('TV')}
                onClick={(): void => toggleDevice('TV')}
              />
            </Grid>
            <Grid item xs={12} lg={6}>
              <DeviceButton
                icon={KettleIcon}
                isActive={activeDevices.includes('Kettle')}
                onClick={(): void => toggleDevice('Kettle')}
              />
            </Grid>
          </Grid>
          <Grid container item xs={12} spacing={3}>
            <Grid item xs={12} lg={6}>
              <DeviceButton
                icon={PlaystationIcon}
                isActive={activeDevices.includes('Playstation')}
                onClick={(): void => toggleDevice('Playstation')}
              />
            </Grid>
            <Grid item xs={12} lg={6}>
              <DeviceButton
                icon={ConditionerIcon}
                isActive={activeDevices.includes('Conditioner')}
                onClick={(): void => toggleDevice('Conditioner')}
              />
            </Grid>
          </Grid>
          <Grid container item xs={12} spacing={3}>
            <Grid item xs={12} lg={6}>
              <DeviceButton
                icon={FanIcon}
                isActive={activeDevices.includes('Fan')}
                onClick={(): void => toggleDevice('Fan')}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Page>
  );
};

const GestureSelectorContainer = styled.div`
  margin-top: 10vh;
`;

export default Home;
