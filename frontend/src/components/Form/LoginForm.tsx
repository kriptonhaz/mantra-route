import {info} from '@/themes/ts/colors';
import {Box, IconButton, Stack, Typography} from '@mui/material';
import React, {useState} from 'react';
import {useFormContext} from 'react-hook-form';
import {NavLink} from 'react-router-dom';
import {LoginInput} from '../../interface/auth.interface';
import {Button} from '../Button/ThemedButton';
import FeatherIcon from '../FeatherIcon/FeatherIcon';
import InputFloating from '../InputFloating/InputFloating';

export const LoginForm = () => {
  const {
    register,
    formState: {errors},
  } = useFormContext<LoginInput>();

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
        Welcome back! Please enter your details
      </Typography>
      <Stack direction='column' spacing={4}>
        <InputFloating
          label='Email'
          type='email'
          {...register('Email')}
          error={!!errors?.Email?.message}
          helperText={errors?.Email?.message}
          startIcon={<FeatherIcon icon='mail' />}
        />
        <InputFloating
          label='Password'
          {...register('Password')}
          startIcon={<FeatherIcon icon='lock' />}
          type={showPassword ? 'text' : 'password'}
          error={!!errors?.Password?.message}
          helperText={errors?.Password?.message}
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
      <Stack
        direction={'row'}
        justifyContent={'flex-end'}
        alignItems={'center'}
        sx={{mt: 4, mb: 6}}
      >
        <NavLink to={'/forget'} style={{textDecoration: 'none'}}>
          <Typography variant='body2' sx={{color: info[500]}} fontWeight='medium'>
            Forgot Password
          </Typography>
        </NavLink>
      </Stack>
      <Box sx={{display: 'flex', justifyContent: 'flex-end', paddingY: 2}}></Box>
      <Button type='submit' variant='contained' fullWidth size='2xl'>
        Sign In
      </Button>
      <Box>
        <Typography variant='body2' textAlign={'center'} mt={6} color='text.secondary'>
          Don't have an account?{' '}
          <NavLink to='/your-details'>
            <Typography variant='body2' sx={{color: info[500], display: 'inline-block', ml: 2}}>
              Register as volunteer
            </Typography>
          </NavLink>
        </Typography>
      </Box>
    </>
  );
};
