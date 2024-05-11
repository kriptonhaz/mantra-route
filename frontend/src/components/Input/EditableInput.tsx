import React, {ReactElement} from 'react';
import {Box, IconProps, Input, InputProps, Typography} from '@mui/material';
import {editableInputStyles} from './InputText.style';
import {FHDanger} from '../../themes/FHColor';

export interface EditableInputTextProps extends InputProps {
  label?: string;
  isRequired?: boolean;
  errormsg?: string;
  starticon?: ReactElement<IconProps>;
  endicon?: ReactElement;
}

export const EditableInputText: React.FC<EditableInputTextProps> = (
  props: EditableInputTextProps,
) => {
  const {label, isRequired = false, errormsg, starticon, endicon} = props;
  const useStyles = editableInputStyles(props);

  return (
    <>
      <Box sx={useStyles.root}>
        <Box>
          {starticon}
          <Box sx={useStyles.inputBox}>
            <Typography sx={useStyles.label}>
              {label}
              {isRequired && <span style={{color: FHDanger[500]}}>*</span>}
            </Typography>
            <Input
              sx={useStyles.input}
              fullWidth
              disableUnderline
              value={props.value}
              placeholder={props.placeholder}
              {...props}
            />
          </Box>
          {endicon}
        </Box>
      </Box>
      {errormsg && <Typography sx={useStyles.textError}>{errormsg}</Typography>}
    </>
  );
};
