import React from 'react';
import {Card, Button, Typography, Divider} from '@mui/material';

const CardInterest: React.FC = () => {
  return (
    <Card sx={{p: 6}}>
      <Typography variant='h6' fontWeight={'medium'} mb={1}>
        Interested with this route?
      </Typography>
      <Typography color={'text.secondary'}>Apply for this route</Typography>
      <Divider sx={{mt: 5, mb: 4}} />
      <Button fullWidth>Apply</Button>
    </Card>
  );
};

export default CardInterest;
