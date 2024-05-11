import { Button, ButtonProps } from '@mui/material';
import React from 'react';
import FeatherIcon from '../FeatherIcon/FeatherIcon';

const BtnFilter: React.FC<ButtonProps> = (props) => {
  return (
    <Button
      variant='outlined'
      color='inherit'
      startIcon={
        <FeatherIcon icon='filter' sx={{'& svg': {transform: 'scale(.8) translateY(3px)'}}} />
      }
      {...props}
    >
      Filter
    </Button>
  );
};

export default BtnFilter;
