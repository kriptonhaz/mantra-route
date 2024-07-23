import {Box} from '@mui/material';
import * as React from 'react';
import JobsUI from '@/features/dashboard/jobs';

export const JobsPage: React.FC = () => {
  return (
    <Box component='main'>
      <JobsUI />
    </Box>
  );
};
