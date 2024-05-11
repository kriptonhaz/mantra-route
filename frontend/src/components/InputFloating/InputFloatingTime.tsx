import React, {InputHTMLAttributes, ReactNode, useId} from 'react';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import dayjs, {Dayjs} from 'dayjs';
import classes from './InputFloating.module.scss';
import {Box, FormControl, FormHelperText} from '@mui/material';
import Render from '../Render/Render';
import {DatePickerProps, TimePickerProps} from '@mui/lab';
import {combineClasses} from '@/utils/styles';
import {TimePicker} from '@mui/x-date-pickers';

interface InputTimeProps extends Omit<TimePickerProps<Dayjs>, 'onChange' | 'value'> {
  label: string;
  disabled?: boolean;
  required?: boolean;
  error?: boolean;
  helperText?: string;
  maxDate?: string;
  minDate?: string;
  readOnly?: boolean;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  fullwidth?: boolean;
  onChange?: (val: string | Dayjs) => void;
}

const slotProps = {
  popper: {
    className: 'date-picker__popper',
  },
  desktopPaper: {
    className: 'date-picker__paper',
  },
};

const InputFloatingTime: React.FC<InputTimeProps> = React.forwardRef<
  HTMLInputElement,
  InputTimeProps
>((props, ref) => {
  const id = useId();
  const {
    label,
    error,
    startIcon,
    endIcon,
    helperText,
    fullwidth,
    value,
    maxDate,
    minDate,
    disabled,
    readOnly,
    onChange,
    ...inputProps
  } = props;

  return (
    <FormControl
      data-testid='input-label'
      data-error={error ? 'true' : 'false'}
      error={error}
      fullWidth
      ref={ref}
    >
      <Box id={id} className={classes.FormGroup}>
        {startIcon && (
          <Box data-shape='icon' className={classes.StartIcon}>
            {startIcon || ''}
          </Box>
        )}
        <Box
          className={[
            classes.Container,
            classes.DateContainer,
            error && classes.Error,
            props.disabled && classes.Disabled,
            props.startIcon && classes.Input_startIcon,
          ].join(' ')}
        >
          <Box className={classes.InputLabel}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <TimePicker
                value={dayjs(value ?? '')}
                className={combineClasses([`date-picker ${error && 'Mui-error'}`, classes.Input])}
                disabled={disabled}
                readOnly={readOnly}
                slotProps={{
                  ...slotProps,
                  textField: {
                    error: error,
                    InputProps: {
                      disableUnderline: true,
                    },
                    InputLabelProps: {
                      shrink: true,
                    },
                  },
                }}
                onChange={(val) => (onChange ? onChange(val || '') : '')}
                {...inputProps}
              />
            </LocalizationProvider>
            <label className={classes.Label}>
              {label}
              <Render in={!!props.required}>
                <span className={classes.Asteric}>*</span>
              </Render>
            </label>
          </Box>
        </Box>
        {endIcon && (
          <Box data-shape='icon' className={classes.EndIcon}>
            {endIcon || ''}
          </Box>
        )}
      </Box>
      <Render in={!!helperText}>
        <FormHelperText>{helperText}</FormHelperText>
      </Render>
    </FormControl>
  );
});

InputFloatingTime.displayName = 'InputFloatingTime';
export default InputFloatingTime;
