import Pagination from '@/components/Pagination/Pagination';
import useAttendances from '@/hooks/use-attendances.hook';
import DashboardLayout from '@/layouts/dashboard.layout';
import {Box, CircularProgress, Divider, Stack, Typography} from '@mui/material';
import * as React from 'react';
import {AttendancaTable} from '../components/Table/AttendanceTable';
import Render from '@/components/Render';

export const AttendancePage: React.FC = () => {
  const {
    query: {data, isLoading},
    pagination,
  } = useAttendances({
    limit: 10,
    page: 1,
  });

  return (
    <Box component='main'>
      <DashboardLayout title='Attendances' subtitle='Keep track and manage your attendances'>
        <DashboardLayout.Content>
          <Stack direction='row' alignItems={'center'} justifyContent={'space-between'}>
            <Typography>
              Showing{' '}
              {(data?.metaData?.totalRecords || 0) > pagination.limit
                ? pagination.limit
                : data?.metaData.totalRecords}{' '}
              of {data?.metaData.totalRecords} total
            </Typography>
          </Stack>
          <Divider sx={{my: 6}} />
          <Render in={isLoading}>
            <CircularProgress />
          </Render>
          <Render in={!isLoading}>
            <AttendancaTable listAttendances={data?.attendances} />
          </Render>
          <Divider sx={{my: 6}} />
          <Pagination {...pagination} />
        </DashboardLayout.Content>
      </DashboardLayout>
    </Box>
  );
};
