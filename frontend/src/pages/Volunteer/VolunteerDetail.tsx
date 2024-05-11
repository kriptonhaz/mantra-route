import VolunteerDetailUI from '@/features/dashboard/volunteer/detail';
import {Box} from '@mui/material';

export interface VolunteerDetailProps {
  volunteerName?: string;
}

export const VolunteerDetail = (props: VolunteerDetailProps) => {
  return (
    <Box component={'main'}>
      <VolunteerDetailUI />
    </Box>
  );
};
