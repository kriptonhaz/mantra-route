import {Button} from '@/components/Button/ThemedButton';
import FeatherIcon from '@/components/FeatherIcon/FeatherIcon';
import {Box, Paper, SxProps, Typography} from '@mui/material';
import {ResetPasswordForm} from '@/components/Form/ResetPasswordForm';
import {neutral, success} from '@/themes/ts/colors';
import ffthLogo from '../assets/img/logo-ffth.png';
import ffthTruckImg from '../assets/img/ffth-truck.jpg';
import {FormProvider, SubmitHandler, useForm} from 'react-hook-form';
import {ResetPasswordInput} from '@/interface/auth.interface';
import {yupResolver} from '@hookform/resolvers/yup';
import {resetPasswordSchema} from '@/validation/portal.validation';
import {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {useAuthHook} from '@/hooks/use-auth.hooks';

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

export const ResetPasswordPage = () => {
  const useStyles = styles();
  const navigate = useNavigate();
  const {token} = useParams();
  const [step, setStep] = useState<'reset' | 'success'>('reset');
  const methods = useForm<ResetPasswordInput>({
    defaultValues: {newPassword: '', confirmPassword: '', token: ''},
    // @ts-ignore
    resolver: yupResolver(resetPasswordSchema),
  });
  const {onResetPassword} = useAuthHook();

  useEffect(() => {
    if (!token) {
      navigate('/login');
    } else {
      methods.setValue('token', token);
    }
  }, [token]);

  const onSubmitReset: SubmitHandler<ResetPasswordInput> = (data) => {
    onResetPassword.reset();
    onResetPassword.mutate(data);
    methods.reset();
  };

  useEffect(() => {
    if (onResetPassword.isSuccess) {
      setStep('success');
    }
  }, [onResetPassword.isSuccess]);

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
        <form onSubmit={methods.handleSubmit(onSubmitReset)}>
          {step === 'reset' && (
            <Paper sx={useStyles.paper}>
              <Paper sx={useStyles.icon} elevation={2}>
                <FeatherIcon icon='key' />
              </Paper>
              <Box sx={{padding: 2}}>
                <Typography component='h1' variant='h4' fontWeight='medium'>
                  Reset your password
                </Typography>
                <Typography
                  variant='body1'
                  fontWeight='regular'
                  sx={{marginTop: 5, marginBottom: 5, color: neutral[500]}}
                >
                  Your new password must be different to previously used passwords
                </Typography>

                <ResetPasswordForm isLoading={onResetPassword.isLoading} />
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
                  Password reset
                </Typography>
                <Typography
                  variant='body1'
                  fontWeight='regular'
                  sx={{marginTop: 5, marginBottom: 5, color: neutral[500]}}
                >
                  Your password has been successfully reset
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
