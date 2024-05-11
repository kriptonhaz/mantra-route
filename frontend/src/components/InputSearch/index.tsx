import React, {useId} from 'react';
import {Box, InputBase, InputBaseProps} from '@mui/material';
import classes from './InputSearch.module.scss';
import FeatherIcon from '../FeatherIcon/FeatherIcon';

const InputSearch: React.FC<InputBaseProps> = (props) => {
  const id = useId();
  return (
    <Box id={id} className={classes.Container}>
      <Box className={classes.Icon}>
        <FeatherIcon icon='search' />
      </Box>
      <InputBase className={classes.Input} placeholder='Search' {...props} />
    </Box>
  );
};

export default InputSearch;
