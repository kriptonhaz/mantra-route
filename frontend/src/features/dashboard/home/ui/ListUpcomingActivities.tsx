import {getListProgrammeEvents, getUpcomingPeVr} from '@/api/programmeEvents.api';
import {CardActivity} from '@/components/CardActivity';
import {EmptyStateBox} from '@/components/EmptyState/EmptyState';
import Render from '@/components/Render';
import {useProgrammeEventsHook} from '@/hooks/use-programmeEvents.hooks';
import {ProgrammeEventRequestType} from '@/interface/programmeEvents.interface';
import {queryClient} from '@/service/QueryClient';
import useTokenStore from '@/store/use-token.store';
import {Box, CircularProgress, Typography} from '@mui/material';
import dayjs from 'dayjs';
import React, {useEffect} from 'react';

const ListUpcomingActivities: React.FC = () => {
  const role = useTokenStore((state) => state.role);
  const {listProgrammeEvents, ListUpcomingEvents} = useProgrammeEventsHook();
  const [propsRequest, setPropsRequest] = React.useState<ProgrammeEventRequestType>({
    page: 1,
    limit: 4,
    search: '',
    status: [],
    name: '',
    date: '',
  });
  const {
    data: dataProgrammeEvent,
    isPreviousData,
    isLoading: isLoadingProgrammeEvent,
  } = listProgrammeEvents(propsRequest);
  const {
    data: dataUpcomingEvents,
    isPreviousData: isPreviousDataUpcoming,
    isLoading: isLoadingUpcoming,
  } = ListUpcomingEvents();

  useEffect(() => {
    if (
      !isPreviousData &&
      (dataProgrammeEvent?.metaData.totalPages || 0) <= (propsRequest.page || 0)
    ) {
      queryClient.prefetchQuery({
        queryKey: ['listProgrammeEvents', propsRequest],
        queryFn: () => getListProgrammeEvents(propsRequest),
      });
    }
  }, [dataProgrammeEvent, queryClient, isPreviousData, propsRequest]);

  useEffect(() => {
    if (
      !isPreviousData &&
      (dataProgrammeEvent?.metaData.totalPages || 0) <= (propsRequest.page || 0) &&
      role === 'volunteer'
    ) {
      queryClient.prefetchQuery({
        queryKey: ['programmeEvents', 'upcoming'],
        queryFn: () => getUpcomingPeVr(),
      });
    }
  }, [dataUpcomingEvents, queryClient, isPreviousDataUpcoming, propsRequest]);

  return (
    <Box sx={{p: 6}}>
      <Typography fontWeight={500} variant='subtitle1'>
        Upcoming Events
      </Typography>
      <Typography color='text.secondary' variant='body2'>
        Keep track of events every month
      </Typography>
      <Render in={isLoadingProgrammeEvent}>
        <CircularProgress />
      </Render>
      {/* TODO: need to add pagination */}
      <Render in={!isLoadingProgrammeEvent}>
        <Render in={!!dataUpcomingEvents?.requestAndEventDatas.length}>
          {dataUpcomingEvents?.requestAndEventDatas
            .filter((ar) => ar.attributes.type !== 'Participants__c')
            .map((item) => (
              <a
                href={
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
              </a>
            ))}
        </Render>
        <Render in={!dataUpcomingEvents?.requestAndEventDatas.length}>
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

export default ListUpcomingActivities;
