import {Box, Container, Typography} from '@mui/material';
import React from 'react';
import Banner from '../ui/Banner';
import Footer from '../ui/Footer';
import Navbar from '../ui/Navbar';
import classes from './styles/SubmissionSuccess.module.scss';

const SubmissionSuccessScreen: React.FC = () => {
  return (
    <>
      <Navbar />
      <Banner title='Submission Success' />
      <Container maxWidth='lg' sx={{my: 10}} className={classes.Container}>
        <Typography variant='h3' mb={8} fontWeight='bold'>
          Thank you!
        </Typography>
        <Typography>
          Kindly check your email or junk folder for instructions logging into the volunteer portal.{' '}
        </Typography>
        <Box my={4}>
          <Typography>Curious about what we've been up to?</Typography>
          <Typography>
            Visit our <a href='https://www.foodfromtheheart.sg/highlights/'>highlights</a> page!{' '}
          </Typography>
        </Box>
        <a href='https://www.foodfromtheheart.sg/'>Return to home page</a>
      </Container>
      <Footer />
    </>
  );
};

export default SubmissionSuccessScreen;
