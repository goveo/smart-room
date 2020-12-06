import { Grid, Select, Input, MenuItem } from '@material-ui/core';
import React, { useEffect, useMemo, useState } from 'react';
import { Device } from '../../pages/Home/Home';

export type Gesture = 'SwipeUp' | 'SwipeDown' | 'SwipeLeft' | 'SwipeRight' | 'HandsUp';

export type DeviceActions = {
  [device in Device]: Gesture;
};

const defaultDeviceActions = {
  TV: 'SwipeUp',
  Kettle: 'SwipeDown',
  Playstation: 'SwipeLeft',
  Conditioner: 'SwipeRight',
  Fan: 'HandsUp',
} as DeviceActions;

interface Props {
  devices: Device[];
  onChange?: (deviceActions: DeviceActions) => void;
}

export const GestureSelector: React.FC<Props> = ({ devices, onChange }) => {
  const [deviceActions, setDeviceActions] = useState<DeviceActions>(defaultDeviceActions);
  const gestures = useMemo<Gesture[]>(() => ['SwipeUp', 'SwipeDown', 'SwipeLeft', 'SwipeRight', 'HandsUp'], []);

  useEffect(() => {
    if (onChange) {
      onChange(deviceActions);
    }
  }, [onChange, deviceActions]);

  return (
    <>
      {devices.map((device: Device) => (
        <Grid container item xs={12} spacing={3}>
          <Grid item xs={12} lg={3}>
            <span>{device}</span>
          </Grid>
          <Grid item xs={12} lg={9}>
            <Select
              key={device}
              style={{
                width: '10vw',
              }}
              placeholder="Select"
              value={deviceActions[device]}
              input={<Input placeholder="Select" />}
              onChange={(event): void =>
                setDeviceActions((gestures: DeviceActions) => {
                  const result: DeviceActions = {
                    ...gestures,
                  };
                  result[device] = event.target.value as Gesture;
                  return result;
                })
              }
            >
              {gestures.map((gesture) => (
                <MenuItem key={gesture} value={gesture}>
                  {gesture}
                </MenuItem>
              ))}
            </Select>
          </Grid>
        </Grid>
      ))}
    </>
  );
};

export default GestureSelector;
