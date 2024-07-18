import {Box, IconButton, Stack, Typography} from '@mui/material';
import React, {useState} from 'react';
import {useFormContext} from 'react-hook-form';
import {ILoginInput} from '../../interface/auth.interface';
import {Button} from '../Button/ThemedButton';
import FeatherIcon from '../FeatherIcon/FeatherIcon';
import InputFloating from '../InputFloating/InputFloating';

export const LoginForm = () => {
  const {
    register,
    formState: {errors},
  } = useFormContext<ILoginInput>();

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <>
      <Typography component='h1' variant='h4' fontWeight={'medium'} mb={1}>
        Welcome Back
      </Typography>
      <Typography component='h5' color='text.secondary' mb={8}>
        Please login to experience our magic!
      </Typography>
      <Stack direction='column' spacing={4}>
        <InputFloating
          label='Username'
          {...register('username')}
          error={!!errors?.username?.message}
          helperText={errors?.username?.message}
          startIcon={<FeatherIcon icon='user' />}
        />
        <InputFloating
          label='Password'
          {...register('password')}
          startIcon={<FeatherIcon icon='lock' />}
          type={showPassword ? 'text' : 'password'}
          error={!!errors?.password?.message}
          helperText={errors?.password?.message}
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
      </Stack>
      <Box sx={{display: 'flex', justifyContent: 'flex-end', paddingY: 2}}></Box>
      <Button type='submit' variant='contained' fullWidth size='2xl'>
        Sign In
      </Button>
    </>
  );
};
