import {TextFieldProps, TextField} from '@mui/material';
import React from 'react';
import classes from '../styles/Input.module.scss';

const Input: React.FC<TextFieldProps> = (props) => {
  return <TextField variant='filled' className={classes.InputContainer} fullWidth {...props} />;
};

export default Input;
