import {Box, Typography} from '@mui/material';
import {PropsWithChildren} from 'react';
import Background from '../../../assets/img/ffth-truck.jpg';

interface LayoutProps extends PropsWithChildren {}
export const OrientationLayoutPage: React.FC<LayoutProps> = ({children}) => {
  return (
    <Box
      sx={{
        width: '100%',
        minHeight: '100vh',
        background: `linear-gradient(180deg, rgba(255, 210, 0, 0.4) 37.08%, rgba(0, 0, 0, 0.248) 100%), url(${Background});`,
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: {xs: '0', md: '3rem 7rem'},
      }}
    >
      <Box sx={{width: '100%', display: 'flex'}}></Box>
      {children}
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
