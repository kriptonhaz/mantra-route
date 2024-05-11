import React from 'react';
import CardForm from './CardForm';
import {Box, Container, Divider, Typography} from '@mui/material';
import {neutral} from '@/themes/ts/colors';
import classes from '../styles/Content.module.scss';

const Content: React.FC = () => {
  return (
    <Container maxWidth='lg' className={classes.Container} sx={{py: 10}}>
      <Box textAlign={'center'} mb={8}>
        <Typography variant='h5' fontWeight={'bold'} mb={4}>
          Join us and make a difference.
        </Typography>
        <Typography color={neutral[600]}>
          Food is a basic necessity, and every human has a right to it. Help Food from the Heart
          support those less fortunate with a stable source of supplies in their time of need. By
          making a cash donation to our charity in Singapore, you&#39;re making a vital contribution
          towards our operating costs and the essentials we provide to our beneficiaries.
        </Typography>
      </Box>
      <CardForm />
      <Box mt={6} pb={5}>
        <Typography variant='h6' fontWeight={'bold'} mb={2}>
          How to make a cash donation
        </Typography>
        <Typography color={neutral[600]}>
          Walk-ins for cash donations are welcomed to our office at 130 Joo Seng Road #03-01
          Singapore 368357 from Monday to Friday, 9am to 6pm. We discourage sending cash via mail or
          any other methods, so please ensure you do so online, in person or via cheque.
        </Typography>
      </Box>
      <Divider />
      <Box mt={6} pb={5}>
        <Typography variant='h6' fontWeight={'bold'} mb={2}>
          How to send us a cheque
        </Typography>
        <Typography color={neutral[600]}>
          We welcome contributions by cheque, which can can be made payable to &#39;Food from the
          Heart&#39; and sent by post to our charity at 130 Joo Seng Road #03-01 Singapore 368357.
        </Typography>
      </Box>
      <Divider />
      <Box mt={6} pb={5}>
        <Typography variant='h6' fontWeight={'bold'} mb={2}>
          Every cash donation counts, no matter how small
        </Typography>
        <Typography color={neutral[600]} mb={2}>
          Each year, we help tens of thousands of underprivileged beneficiaries with safe-to-eat
          food that&#39;s been donated or saved from unnecessary wastage. This is only possible
          thanks to the help of the people like you, who provide us with everything from financial
          support to volunteering.
        </Typography>
        <Typography color={neutral[600]}>
          Your support is invaluable to our mission to feed the needy. Your donation will go towards
          our programmes such as <a href='#'>Bread Run</a>, <a href='#'>Community Food Pack</a>,
          <a href='#'>School Goodie Bag</a>, <a href='#'>Market Place</a>,{' '}
          <a href='#'>Project Belanja!</a>, <a href='#'>Clean Plate Campaign</a> and other relevant
          initiatives. Thank you!
        </Typography>
      </Box>
    </Container>
  );
};

export default Content;
