import BtnFilter from '@/components/BtnFilter';
import Pagination from '@/components/Pagination/Pagination';
import usePagination from '@/hooks/use-pagination.hook';
import {Box, Divider, Stack, Typography} from '@mui/material';
import React from 'react';
import CardRoute from '../../ui/CardRoute';
import {useNavigate} from 'react-router-dom';

const YourRoutes: React.FC = () => {
  const navigate = useNavigate();
  const pagination = usePagination({page: 1, count: 5});
  return (
    <Box>
      <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
        <Box>
          <Typography variant='h6' mb={1} fontWeight={'medium'}>
            Your Routes
          </Typography>
          <Typography color='text.secondary'>Showing 5 out of 10</Typography>
        </Box>
        <Box>
          <BtnFilter />
        </Box>
      </Stack>
      <Divider sx={{mt: 5, mb: 6}} />
      <Stack direction='column' spacing={4}>
        <CardRoute onDetail={() => navigate('/breadrun/routedetail/1')} />
        <CardRoute onDetail={() => navigate('/breadrun/routedetail/1')} />
        <CardRoute onDetail={() => navigate('/breadrun/routedetail/1')} />
        <CardRoute onDetail={() => navigate('/breadrun/routedetail/1')} />
        <CardRoute onDetail={() => navigate('/breadrun/routedetail/1')} />
      </Stack>
      <Divider sx={{mb: 4, mt: 6}} />
      <Pagination {...pagination} />
    </Box>
  );
};

export default YourRoutes;
