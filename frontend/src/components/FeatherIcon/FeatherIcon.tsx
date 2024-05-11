import {Typography} from '@mui/material';
import React, {useId} from 'react';
import feather, {FeatherIconNames} from 'feather-icons';
import {SxProps} from '@mui/system';

export interface FeatherIconInterface {
  icon: FeatherIconNames;
  sx?: SxProps;
}

const FeatherIcon: React.FC<FeatherIconInterface> = ({icon, sx}) => {
  const id = useId();

  return (
    <Typography
      id={id}
      data-testid='feather-icon'
      component={'span'}
      dangerouslySetInnerHTML={{
        __html: feather.icons[icon].toSvg(),
      }}
      sx={sx}
    ></Typography>
  );
};

export default FeatherIcon;
