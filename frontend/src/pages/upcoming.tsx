import UpcomingActivitiesUI from '@/features/dashboard/activities';
import {Box} from '@mui/material';
import * as React from 'react';

export const UpcomingPage: React.FC = () => {
  return (
    <Box component='main'>
      <UpcomingActivitiesUI />
    </Box>
  );
};
