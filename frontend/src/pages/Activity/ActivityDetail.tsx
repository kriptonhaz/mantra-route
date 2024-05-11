import ActivityDetailsUI from '@/features/dashboard/activities/detail';
import {Box} from '@mui/material';

export interface ActivityDetailProps {
  activityName?: string;
}

export const ActivityDetail = (props: ActivityDetailProps) => {
  return (
    <Box>
      <ActivityDetailsUI />
    </Box>
  );
};
