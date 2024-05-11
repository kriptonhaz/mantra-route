import AvailableRoutes from '@/features/dashboard/breadrun/routes/ui/AvailableRoutes';
import YourRoutes from '@/features/dashboard/breadrun/routes/ui/YourRoutes';
import {Box, Stack} from '@mui/material';

export const DeliveryRoutes = () => {
  return (
    <>
      <Stack direction={{xs: 'column', md: 'row'}} spacing={6}>
        <Box sx={{flex: 1}}>
          <AvailableRoutes />
        </Box>
        <Box sx={{flex: 1}}>
          <YourRoutes />
        </Box>
      </Stack>
    </>
  );
};
