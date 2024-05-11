import VolunteerOpportunitiesUI from '@/features/dashboard/volunteer';
import {Box} from '@mui/material';
import * as React from 'react';

export const VolunteerPage: React.FC = () => {
  return (
    <Box component='main'>
      <VolunteerOpportunitiesUI />
    </Box>
  );
};
