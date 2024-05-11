import React, {ReactElement} from 'react';
import {
  Box,
  IconClasses,
  IconProps,
  Input,
  InputAdornment,
  InputProps,
  OutlinedInput,
  Typography,
} from '@mui/material';
import {Controller} from 'react-hook-form';
import {ControlInput, ValueInput} from '../../interface/inputform.interface';
import {styles} from './InputText.style';

export interface InputTextProps extends InputProps {
  label?: string;
  valuename: ValueInput;
  control: ControlInput;
  prefix?: string;
  isRequired?: boolean;
  errormsg?: string;
  startAdornment?: ReactElement<IconProps>;
  endAdornment?: ReactElement;
  tooltip?: string;
}

export const InputText: React.FC<InputTextProps> = (props: InputTextProps) => {
  const {
    label,
    control,
    prefix,
    isRequired = false,
    valuename,
    errormsg,
    startAdornment,
    endAdornment,
    tooltip,
  } = props;
  const useStyles = styles(props);
  return (
    <Box sx={useStyles.root}>
      <Controller
        control={control}
        name={valuename}
        render={({field: {onChange, value}}) => (
          <Box>
            <OutlinedInput
              error={!!errormsg}
              sx={useStyles.input}
              value={value}
              onChange={(e) => {
                const target = e.target as HTMLInputElement;
                if (props.type === 'number') {
                  onChange(parseInt(target.value as string).toString());
                } else {
                  onChange(target.value);
                }
              }}
              startAdornment={
                startAdornment ? (
                  <InputAdornment position='start'>{startAdornment}</InputAdornment>
                ) : (
                  <></>
                )
              }
              endAdornment={
                endAdornment ? (
                  <InputAdornment position='end'>{endAdornment}</InputAdornment>
                ) : (
                  <></>
                )
              }
              placeholder={props.placeholder}
              {...props}
            />
          </Box>
        )}
      />
      {errormsg && <Typography sx={useStyles.textError}>{errormsg}</Typography>}
    </Box>
  );
};
