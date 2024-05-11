import React, {ReactElement} from 'react';
import {Button as MuiButton, ButtonProps} from '@mui/material';

export interface IButtonProps extends ButtonProps {
  startIcon?: ReactElement;
}

export const Button: React.FC<IButtonProps> = (props: IButtonProps) => {
  return <MuiButton sx={{borderRadius: '8px', minHeight: 48}} {...props}></MuiButton>;
};
