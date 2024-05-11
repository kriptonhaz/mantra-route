import {Box, Grid, Paper, Typography, Button} from '@mui/material';
import ffthBg from '../assets/img/ffth-bg.jpg';
import logoFfth from '../assets/img/logo-ffth.png';
import {useAuthHook} from '../hooks/use-auth.hooks';
import logoSF from '@/assets/img/logo-sf-white.svg';
import {useEffect} from 'react';
import {useLocation} from 'react-router-dom';

export const LoginAdminPage = () => {
  const location = useLocation();
  const {onLoginAdmin, onLoginAdminProd} = useAuthHook();
  const accessToken = new URLSearchParams(location.search).get('accessToken') || '';

  useEffect(() => {
    if (accessToken) {
      onLoginAdminProd(accessToken);
    }
  }, [accessToken]);

  const submitLogin = () => {
    if (import.meta.env.PROD) {
      window.location.href = 'https://helpnow.foodfromtheheart.sg/api/oauth/auth';
    } else {
      onLoginAdmin.mutate();
    }
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
            <img src={logoFfth} style={{height: 40}} />
          </Box>
          <Box>
            <Typography component='h1' variant='h4' fontWeight={'medium'} mb={1}>
              Welcome Back
            </Typography>
            <Typography component='h5' color='text.secondary' mb={8}>
              Please use your Salesforce SSO
            </Typography>
            <Button
              color='info'
              sx={{
                backgroundColor: '#00A1E0',
                paddingY: '16px 28px !important',
                height: 'auto',
                '&:hover': {backgroundColor: '#008cc3'},
              }}
              size='xl'
              fullWidth
              onClick={submitLogin}
              startIcon={<img src={logoSF} />}
            >
              Login with Salesforce
            </Button>
          </Box>
          <Box sx={{my: 4}}>
            <Typography variant='body2' color='text.secondary' fontWeight={'light'}>
              2023 © Food from the Heart
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
            background: `linear-gradient(180deg, rgba(255, 210, 0, 0.4) 37.08%, rgba(0, 0, 0, 0.248) 100%), url(${ffthBg});`,
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
            Recognised among charities in Singapore working towards a social good
          </Typography>
          <Typography
            component='h5'
            variant='subtitle1'
            sx={{color: '#E4E4E7', fontSize: 20, fontWeight: 300}}
          >
            Food From The Heart
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
};
