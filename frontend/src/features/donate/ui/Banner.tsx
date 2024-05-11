import React from 'react';
import imgBg from '@/assets/img/donate-banner.jpg';
import {Box, Typography} from '@mui/material';
import classes from '../styles/Banner.module.scss';

interface IBannerProps {
  title?: string;
}
const Banner: React.FC<IBannerProps> = ({
  title = 'Cash Donations: Help our charity battle hunger in Singapore',
}) => {
  return (
    <Box className={classes.Container}>
      <Box sx={{backgroundImage: `url(${imgBg})`}} className={classes.Background}></Box>
      <Typography variant='h1' className={classes.Typography}>
        {title}
      </Typography>
    </Box>
  );
};

export default Banner;
