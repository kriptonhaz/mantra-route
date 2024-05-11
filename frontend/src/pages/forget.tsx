import {Button} from '@/components/Button/ThemedButton';
import FeatherIcon from '@/components/FeatherIcon/FeatherIcon';
import {Box, Divider, Paper, SxProps, Typography} from '@mui/material';
import {useEffect, useState} from 'react';

import {ForgetPasswordForm} from '@/components/Form/ForgetPasswordForm';
import {neutral, success} from '@/themes/ts/colors';
import ffthLogo from '../assets/img/logo-ffth.png';
import ffthTruckImg from '../assets/img/ffth-truck.jpg';
import {FormProvider, SubmitHandler, useForm} from 'react-hook-form';
import {ForgetPasswordInput} from '@/interface/auth.interface';
import {yupResolver} from '@hookform/resolvers/yup';
import {forgetPasswordSchema} from '@/validation/portal.validation';
import {useAuthHook} from '@/hooks/use-auth.hooks';
import {useNavigate} from 'react-router-dom';

interface StyleProps {
  root: SxProps;
  paper: SxProps;
  icon: SxProps;
  divider: SxProps;
}

const styles = (): StyleProps => ({
  root: {
    width: '100%',
    minHeight: '100vh',
    background: `linear-gradient(180deg, rgba(255, 210, 0, 0.4) 37.08%, rgba(0, 0, 0, 0.248) 100%), url(${ffthTruckImg});`,
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '3rem 7rem',
    textAlign: 'center',
  },
  paper: {
    width: {sm: 400, md: 500},
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: 5,
  },
  icon: {
    width: 56,
    height: 56,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  divider: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-evenly',
    padding: 2,
    borderColor: neutral[200],
    borderStyle: 'solid',
    borderBottom: 0,
    borderLeft: 0,
    borderRight: 0,
  },
});

export const ForgetPasswordPage = () => {
  const useStyles = styles();
  const navigate = useNavigate();
  const [step, setStep] = useState<'forget' | 'success'>('forget');
  const methods = useForm<ForgetPasswordInput>({
    // @ts-ignore
    resolver: yupResolver(forgetPasswordSchema),
  });
  const {onForgotPassword} = useAuthHook();

  const onSubmitForgot: SubmitHandler<ForgetPasswordInput> = (data) => {
    onForgotPassword.reset();
    onForgotPassword.mutate(data);
    methods.reset();
  };

  useEffect(() => {
    if (onForgotPassword.isSuccess) {
      setStep('success');
    }
  }, [onForgotPassword.isSuccess]);

  const gotoLogin = () => {
    navigate('/login');
  };

  return (
    <Box sx={useStyles.root}>
      <Box sx={{width: '100%', display: 'flex'}}>
        <Box
          component='img'
          sx={{
            height: 50,
          }}
          alt='FFTH'
          src={ffthLogo}
        />
      </Box>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmitForgot)}>
          {step === 'forget' && (
            <Paper sx={useStyles.paper}>
              <Paper sx={useStyles.icon} elevation={2}>
                <FeatherIcon icon='key' />
              </Paper>
              <Box sx={{padding: 2}}>
                <Typography component='h1' variant='h4' fontWeight='medium'>
                  Forgot your password?
                </Typography>
                <Typography
                  variant='body1'
                  fontWeight='regular'
                  sx={{marginTop: 5, marginBottom: 5, color: neutral[500]}}
                >
                  No worries, we’ll send you reset instructions to your email address
                </Typography>
                <ForgetPasswordForm isLoading={onForgotPassword.isLoading} />
              </Box>
            </Paper>
          )}
          {step === 'success' && (
            <Paper sx={useStyles.paper}>
              <Paper sx={useStyles.icon} elevation={2}>
                <FeatherIcon icon='check-circle' sx={{color: success[700]}} />
              </Paper>
              <Box sx={{padding: 2}}>
                <Typography component='h1' variant='h4' fontWeight='medium'>
                  Email has been sent
                </Typography>
                <Typography
                  variant='body1'
                  fontWeight='regular'
                  sx={{marginTop: 5, marginBottom: 5, color: neutral[500]}}
                >
                  The instruction to reset the password has been sent to your email
                </Typography>
              </Box>
              <Box sx={useStyles.divider}>
                <Button variant='contained' onClick={gotoLogin}>
                  Return to login
                </Button>
              </Box>
            </Paper>
          )}
        </form>
      </FormProvider>
      <Typography
        component='h5'
        variant='subtitle1'
        sx={{color: '#E4E4E7', fontSize: 20, fontWeight: 300}}
      >
        2023 © Food from the Heart
      </Typography>
    </Box>
  );
};
