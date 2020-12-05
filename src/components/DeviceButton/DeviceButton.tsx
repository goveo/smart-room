import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

interface IconStyleProps {
  color: string;
  activeColor: string;
  isActive: boolean;
}

const useStyles = makeStyles(() => ({
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  icon: ({ color, activeColor, isActive }: IconStyleProps) => ({
    fill: isActive ? activeColor : color,
    transition: 'fill 0.3s ease-out',
    height: '20vh',
    '&:hover': {
      fill: activeColor,
    },
  }),
}));

interface Props {
  icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  isActive?: boolean;
  iconColor?: string;
  activeColor?: string;
  onClick?: () => void;
}

export const DeviceButton: React.FC<Props> = ({
  icon: IconSVG,
  isActive = true,
  iconColor = 'black',
  activeColor = 'red',
  onClick,
}) => {
  const classes = useStyles({ color: iconColor, activeColor: activeColor, isActive });

  return <IconSVG className={classes.icon} onClick={onClick} />;
};

export default DeviceButton;
