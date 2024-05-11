import {danger} from '@/themes/ts/colors';
import {FormHelperText} from '@mui/material';
import React, {useId} from 'react';

const ErrorMessage: React.FC<{message?: string}> = ({message}) => {
  const id = useId();
  return (
    <FormHelperText
      id={id}
      sx={{color: danger[500] + ' !important', position: message ? 'static' : 'absolute'}}
    >
      {message}
    </FormHelperText>
  );
};

export default ErrorMessage;
