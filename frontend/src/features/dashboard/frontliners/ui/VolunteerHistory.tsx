import FeatherIcon from '@/components/FeatherIcon/FeatherIcon';
import {Button, Divider, Stack, Typography, Box, CircularProgress} from '@mui/material';
import React from 'react';
import {Link} from 'react-router-dom';
import Render from '@/components/Render';
import {CardActivity} from '@/components/CardActivity';
import dayjs from 'dayjs';
import {useVolunteerRequestHook} from '@/hooks/use-volunteerRequest.hooks';
import {EmptyStateBox} from '@/components/EmptyState/EmptyState';

const VolunteerHistory: React.FC = () => {
  const {ListUpcomingVr} = useVolunteerRequestHook();
  const {data: dataUpcomingVr, isLoading: isLoadingUpcomingVr} = ListUpcomingVr();

  return (
    <Box sx={{display: {xs: 'none', md: 'block'}}}>
      <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
        <Typography variant='h6' fontWeight={'medium'}>
          Registrations
        </Typography>
        <Link to='/dashboard/attendance'>
          <Button
            variant='outlined'
            color='inherit'
            endIcon={<FeatherIcon icon='arrow-up-right' />}
          >
            See All
          </Button>
        </Link>
      </Stack>
      <Divider sx={{my: 6}} />
      <Render in={isLoadingUpcomingVr}>
        <CircularProgress />
      </Render>
      {/* TODO: need to add pagination */}
      <Render in={!isLoadingUpcomingVr}>
        <Render in={!!dataUpcomingVr?.requestAndEventDatas.length}>
          {dataUpcomingVr?.requestAndEventDatas
            .filter((ar) => ar.attributes.type !== 'Participants__c')
            .map((item) => (
              <Link
                to={
                  item.attributes.type === 'Programme_Events__c'
                    ? `/dashboard/upcoming/${item.Id}`
                    : item.attributes.type === 'Volunteer_Request__c'
                    ? `/dashboard/volunteer/${item.Id}`
                    : `/dashboard/volunteer/${item.Id}/assignment`
                }
              >
                <CardActivity
                  title={'Session_Title__c' in item ? item.Session_Title__c : item.Name}
                  time={dayjs(item.Start_Date__c).format('DD MMMM YYYY')}
                  status={'Planned'}
                />
              </Link>
            ))}
        </Render>
        <Render in={!dataUpcomingVr?.requestAndEventDatas.length}>
          <EmptyStateBox
            title='No activity found'
            message='Let’s find an activity!'
            action='Look for activities'
            to='/dashboard/volunteer'
          />
        </Render>
      </Render>
    </Box>
  );
};

export default VolunteerHistory;
