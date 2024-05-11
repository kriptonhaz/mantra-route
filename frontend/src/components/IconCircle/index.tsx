import {danger, info, neutral, primary, success, warning} from '@/themes/ts/colors';
import {Box} from '@mui/material';
import React from 'react';
import FeatherIcon, {FeatherIconInterface} from '../FeatherIcon/FeatherIcon';

type TColor = 'primary' | 'neutral' | 'info' | 'warning' | 'error' | 'success';
export interface IIconCircleProps extends FeatherIconInterface {
  color: TColor;
}
const IconCircle: React.FC<IIconCircleProps> = ({color, ...featherProps}) => {
  const colors: {[key in TColor]: {color: string; background: string}} = {
    primary: {
      color: primary[700],
      background: primary[100],
    },
    neutral: {
      color: neutral[700],
      background: neutral[100],
    },
    info: {
      color: info[700],
      background: info[100],
    },
    warning: {
      color: warning[700],
      background: warning[100],
    },
    error: {
      color: danger[700],
      background: danger[100],
    },
    success: {
      color: success[700],
      background: success[100],
    },
  };

  return (
    <Box>
      <Box
        sx={{
          backgroundColor: colors[color].background,
          color: colors[color].color,
          width: '44px',
          height: '44px',
          display: 'block',
          borderRadius: '50%',
          p: 1,
          position: 'relative',
        }}
      >
        <FeatherIcon
          sx={{
            '& svg': {
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%,-50%)',
            },
          }}
          {...featherProps}
        />
      </Box>
    </Box>
  );
};

export default IconCircle;
