import React from 'react';
import {Card, Button, Typography, Divider} from '@mui/material';

const CardAcceptDelivery: React.FC = () => {
  return (
    <Card sx={{p: 6}}>
      <Typography variant='h6' fontWeight={'medium'} mb={1}>
        Accept this delivery order
      </Typography>
      <Typography color={'text.secondary'}>Help out by taking this order</Typography>
      <Divider sx={{mt: 5, mb: 4}} />
      <Button fullWidth>Accept</Button>
    </Card>
  );
};

export default CardAcceptDelivery;
