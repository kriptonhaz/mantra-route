import {CardActivity} from '@/components/CardActivity';
import {EmptyStateBox} from '@/components/EmptyState/EmptyState';
import Render from '@/components/Render';
import {useProgrammeEventsHook} from '@/hooks/use-programmeEvents.hooks';
import {neutral} from '@/themes/ts/colors';
import {Box, CircularProgress, Divider, SxProps, Typography} from '@mui/material';
import dayjs from 'dayjs';
import React, {useEffect} from 'react';
import {Link} from 'react-router-dom';

const styles: {box: SxProps} = {
  box: {
    borderRadius: '8px',
    p: 6,
    mt: 4,
    textAlign: 'center',
    border: `1px solid ${neutral[200]}`,
  },
};

const RegisteredActivities: React.FC = () => {
  const {listParticipants} = useProgrammeEventsHook();
  const {data, isLoading} = listParticipants({
    page: 1,
    limit: 4,
    status: ['Accepted'],
  });

  return (
    <Box sx={{display: {xs: 'none', md: 'block'}}}>
      <Typography variant='h6' fontWeight={'medium'}>
        Registrations
      </Typography>
      <Divider sx={{my: 6}} />
      <Render in={isLoading}>
        <CircularProgress />
      </Render>
      <Render in={!!data}>
        <Render
          in={
            data?.metadata.totalData === 0 ||
            data?.participants.filter((ar) => ar.Programme_Event__r !== null).length === 0
          }
        >
          <EmptyStateBox title='No activity found' message='Lets find an activity!' />
        </Render>
        <Render
          in={
            (data?.metadata.totalData || 0) > 0 ||
            (!!data?.participants &&
              data?.participants.filter((ar) => ar.Programme_Event__r !== null).length > 0)
          }
        >
          {data?.participants
            .filter((ar) => ar.Programme_Event__r !== null)
            .map((item) => (
              <Link to={`/dashboard/upcoming/${item.Programme_Event__r?.Id}`}>
                <CardActivity
                  title={item.Programme_Event__r?.Name || '-'}
                  time={
                    !!item.End_Date_Time_Formula__c
                      ? dayjs(item.End_Date_Time_Formula__c).format('DD MMMM YYYY')
                      : '-'
                  }
                  status={item.Status__c}
                  badgeColor='success'
                />
              </Link>
            ))}
        </Render>
      </Render>
    </Box>
  );
};

export default RegisteredActivities;
