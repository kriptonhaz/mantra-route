import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import {
  Box,
  FormGroup,
  FormHelperText,
  FormLabel,
  MenuItem,
  Select as MuiSelect,
  SelectChangeEvent,
  SelectProps,
} from '@mui/material';
import React, {useEffect, useState} from 'react';
import classes from './_.module.scss';
import Render from '../Render/Render';

export interface ISelectProps extends SelectProps {
  options: {label: string; value: any}[];
  label: string;
  error?: boolean;
  helperText?: string;
  value?: string;
}

const selectIcon = (props: any) => {
  return (
    <Box className={classes.Icon}>
      <KeyboardArrowDownRoundedIcon {...props} />
    </Box>
  );
};
const Select = React.forwardRef((props: ISelectProps, ref) => {
  const {options, label, error, helperText, required, ...selectProps} = props;
  const [value, setValue] = useState<string>((props.defaultValue as string) || '');

  const handleChange = (e: SelectChangeEvent<unknown>, c: React.ReactNode) => {
    if (typeof e.target.value === 'string') setValue(e.target.value);
    // @ts-ignore
    props.onChange(e, c);
  };

  useEffect(() => {
    setValue(props.value || '');
  }, [props.value]);

  return (
    <FormGroup
      className={[
        classes.Container,
        error && classes.Error,
        props.disabled && classes.Disabled,
      ].join(' ')}
    >
      <Box>
        <MuiSelect
          displayEmpty
          fullWidth
          ref={ref}
          IconComponent={selectIcon}
          className={[classes.Select, !!value && classes.Filled].join(' ')}
          {...selectProps}
          defaultValue={props.defaultValue || ''}
          onChange={handleChange}
          MenuProps={{
            PaperProps: {className: 'select-dropdown'},
          }}
        >
          {options.map((item, i) => (
            <MenuItem key={i} value={item.value}>
              {item.label}
            </MenuItem>
          ))}
        </MuiSelect>
        <FormLabel className={classes.Label}>
          {label}{' '}
          <Render in={!!required}>
            <span className={classes.Asteric}>*</span>
          </Render>
        </FormLabel>
        <FormHelperText
          sx={{position: props.helperText ? 'static' : 'absolute'}}
          className={classes.HelperText}
        >
          {helperText}
        </FormHelperText>
      </Box>
    </FormGroup>
  );
});

Select.displayName = 'Select';
export default Select;
