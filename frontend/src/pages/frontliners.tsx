import FrontlinersUI from '@/features/dashboard/frontliners';
import {Box} from '@mui/material';
import * as React from 'react';

export const FrontlinersPage: React.FC = () => {
  return (
    <Box component='main'>
      <FrontlinersUI />
    </Box>
  );
};
