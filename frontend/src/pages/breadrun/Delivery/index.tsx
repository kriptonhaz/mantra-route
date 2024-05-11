import {Box, Divider, Grid, Stack, Typography} from '@mui/material';
import {DeliveryCard} from '../../../components/Card/DeliveryCard';
import UrgentDeliveries from '@/features/dashboard/breadrun/deliver-orders/ui/UrgentDeliveries';
import UpcomingDeliveries from '@/features/dashboard/breadrun/deliver-orders/ui/UpcomingDeliveries';

export const DeliveryOrders = () => {
  return (
    <>
      <Stack direction={{xs: 'column', md: 'row'}} spacing={6}>
        <Box sx={{flex: 1}}>
          <UrgentDeliveries />
        </Box>
        <Box sx={{flex: 1}}>
          <UpcomingDeliveries />
        </Box>
      </Stack>
    </>
  );
};
