import {neutral} from '@/themes/ts/colors';
import {Box, CircularProgress, IconButton, Stack} from '@mui/material';
import {useFormContext} from 'react-hook-form';
import {Button} from '../Button/ThemedButton';
import FeatherIcon from '../FeatherIcon/FeatherIcon';
import InputFloating from '../InputFloating/InputFloating';
import {useState} from 'react';
import {ResetPasswordInput} from '@/interface/auth.interface';

export const ResetPasswordForm = ({isLoading}: {isLoading: boolean}) => {
  const {
    register,
    formState: {errors},
  } = useFormContext<ResetPasswordInput>();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowConfirmPassword = () => setShowConfirmPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };
  const handleMouseDownConfirmPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <>
      <Stack direction='column' spacing={4}>
        <InputFloating
          label='New Password'
          {...register('newPassword')}
          startIcon={<FeatherIcon icon='lock' />}
          type={showPassword ? 'text' : 'password'}
          error={!!errors?.newPassword?.message}
          helperText={errors?.newPassword?.message}
          endIcon={
            <IconButton
              sx={{mt: -2}}
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
            >
              <FeatherIcon icon={showPassword ? 'eye-off' : 'eye'} />
            </IconButton>
          }
        />
        <InputFloating
          label='Verify Password'
          {...register('confirmPassword')}
          startIcon={<FeatherIcon icon='lock' />}
          type={showConfirmPassword ? 'text' : 'password'}
          error={!!errors?.confirmPassword?.message}
          helperText={errors?.confirmPassword?.message}
          endIcon={
            <IconButton
              sx={{mt: -2}}
              onClick={handleClickShowConfirmPassword}
              onMouseDown={handleMouseDownConfirmPassword}
            >
              <FeatherIcon icon={showConfirmPassword ? 'eye-off' : 'eye'} />
            </IconButton>
          }
        />
      </Stack>
      <Box sx={{display: 'flex', justifyContent: 'flex-end', paddingY: 2}}></Box>
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          justifyContent: 'space-evenly',
          paddingTop: 4,
          borderColor: neutral[200],
          borderStyle: 'solid',
          borderBottom: 0,
          borderLeft: 0,
          borderRight: 0,
        }}
      >
        <Button variant='contained' type='submit' disabled={isLoading}>
          {isLoading && <CircularProgress />}
          Reset Password
        </Button>
      </Box>
    </>
  );
};
