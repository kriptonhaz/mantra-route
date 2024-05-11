import {Box, Grid, Paper, Typography, CircularProgress} from '@mui/material';
import {yupResolver} from '@hookform/resolvers/yup';
import trafficBg from '@/assets/img/traffic-car.jpeg';
import logoMantra from '@/assets/img/logo-mantra.jpeg';
import {useForm, FormProvider, SubmitHandler} from 'react-hook-form';
import {LoginInput} from '../interface/auth.interface';
import {LoginForm} from '../components/Form/LoginForm';
import {schema} from '../validation/portal.validation';
import {useAuthHook} from '../hooks/use-auth.hooks';

export const LoginPage = () => {
  const methods = useForm<LoginInput>({
    // @ts-ignore
    resolver: yupResolver(schema),
    defaultValues: {Email: '', Password: ''},
  });

  const {onLogin} = useAuthHook({setErrorForm: methods.setError});

  const submitLogin: SubmitHandler<LoginInput> = (data) => {
    onLogin.reset();
    onLogin.mutate(data);
  };

  return (
    <Grid container component='main' sx={{height: '100vh', backgroundColor: 'white'}}>
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={0} square>
        <Box
          sx={{
            padding: {xs: '32px', md: '80px'},
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            minHeight: '100%',
          }}
        >
          <Box my={4}>
            <img src={logoMantra} style={{height: 80}} />
          </Box>
          <Box>
            <FormProvider {...methods}>
              <form onSubmit={methods.handleSubmit(submitLogin)}>
                {onLogin.isLoading ? (
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    {' '}
                    <CircularProgress />
                  </Box>
                ) : (
                  <LoginForm />
                )}
              </form>
            </FormProvider>
          </Box>
          <Box sx={{my: 4}}>
            <Typography variant='body2' color='text.secondary' fontWeight={'light'}>
              2024 © Mantra Maker
            </Typography>
          </Box>
        </Box>
      </Grid>
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          position: 'relative',
          borderRadius: '80px 0 0 0;',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            height: '100vh',
            width: '100%',
            borderRadius: '80px 0 0 0;',
            background: `linear-gradient(180deg, rgba(255, 210, 0, 0.4) 37.08%, rgba(0, 0, 0, 0.248) 100%), url(${trafficBg});`,
            display: 'flex',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'flex-end',
            padding: '3rem 7rem',
            textAlign: 'center',
          }}
        >
          <Typography
            component='h5'
            variant='h5'
            sx={{fontSize: 24, color: '#FFD200', fontWeight: 700, my: 3}}
          >
            Bringing magic to generate route optimization
          </Typography>
          <Typography
            component='h5'
            variant='subtitle1'
            sx={{color: '#E4E4E7', fontSize: 20, fontWeight: 300}}
          >
            Mantra Maker
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
};
