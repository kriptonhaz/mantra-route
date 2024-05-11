import {getNotification} from '@/api/notification.api';
import {EmptyStateBox} from '@/components/EmptyState/EmptyState';
import {LoadingPortal} from '@/components/LoadingPage/LoadingPage';
import Pagination from '@/components/Pagination/Pagination';
import Render from '@/components/Render/Render';
import {useNotificationHook} from '@/hooks/use-notification.hook';
import {GetListNotifProps, NotifDataType} from '@/interface/notification.interface';
import DashboardLayout from '@/layouts/dashboard.layout';
import {queryClient} from '@/service/QueryClient';
import {Box, Button, Divider, Stack, Typography} from '@mui/material';
import {useEffect, useState} from 'react';
import {NotificationDetail} from './Components/NotificationDetail';
import {NotificationItem} from './Components/NotificationItem';
import FeatherIcon from '@/components/FeatherIcon/FeatherIcon';

export const NotificationPage = () => {
  const {listNotifications} = useNotificationHook();
  const [isEmpty, setIsEmpty] = useState(false);
  const [currentNotification, setCurrentNotification] = useState<NotifDataType | null>(null);
  const [propsRequest, setPropsRequest] = useState<GetListNotifProps>({
    page: 1,
    limit: 10,
    search: '',
    status: '',
  });

  const {
    data: dataListNotifications,
    isPreviousData,
    isLoading: isLoadingListNotifications,
  } = listNotifications(propsRequest);

  useEffect(() => {
    if (
      !isPreviousData &&
      (dataListNotifications?.metaData.totalData || 0 <= (propsRequest.page || 0))
    ) {
      queryClient.prefetchQuery({
        queryKey: ['notifications', propsRequest],
        queryFn: () => getNotification(propsRequest),
      });
    }

    if (dataListNotifications?.metaData.totalData === 0) setIsEmpty(true);
  }, [dataListNotifications, queryClient, isPreviousData, propsRequest]);

  const onNextPage = () => {
    setPropsRequest((prevState: GetListNotifProps) => {
      return {
        ...propsRequest,
        page: (prevState.page ?? 1) + 1,
      };
    });
  };

  const onPrevPage = () => {
    setPropsRequest((prevState: GetListNotifProps) => {
      return {
        ...propsRequest,
        page: (prevState.page ?? 1) - 1,
      };
    });
  };

  const onChangePage = (val: number) => {
    setPropsRequest({...propsRequest, page: val});
  };

  if (isLoadingListNotifications) return <LoadingPortal />;

  return (
    <Box component='main'>
      <Box
        mt={9}
        mb={-8}
        sx={{display: {xs: !!currentNotification ? 'block' : 'none', md: 'none'}}}
      >
        <Button
          sx={{ml: 3, mt: 1}}
          variant='text'
          color='inherit'
          onClick={() => setCurrentNotification(null)}
          startIcon={<FeatherIcon icon='arrow-left' />}
        >
          Back
        </Button>
      </Box>
      <DashboardLayout title='Notification' subtitle='Track and manage your notifications'>
        <DashboardLayout.Content>
          <Stack direction={{xs: 'column', md: 'row'}} spacing={6}>
            <Box
              sx={{
                display: {xs: !!currentNotification ? 'none' : 'block', md: 'block'},
                width: {xs: '100%', md: '40%'},
                maxWidth: {xs: 'auto', md: '400px'},
              }}
            >
              <Typography variant='h6' mb={5}>
                Your notifications
              </Typography>
              <Divider></Divider>
              <Box my={6}>
                <Render in={isEmpty}>
                  <EmptyStateBox
                    title="You don't have any notifications"
                    message='Please check back later once you have a notification'
                  />
                </Render>
                <Render in={!isEmpty}>
                  {dataListNotifications?.notifData.map((notification) => (
                    <NotificationItem
                      key={notification.Id}
                      title={notification.Title__c}
                      subtitle={notification.Subtitle__c ?? ''}
                      createdDate={notification.CreatedDate}
                      danger={notification.isReadNotification__c}
                      active={notification.Id === currentNotification?.Id}
                      onClick={() => setCurrentNotification(notification)}
                    />
                  ))}
                </Render>
              </Box>
              <Pagination
                page={propsRequest.page ?? 1}
                count={dataListNotifications?.metaData.totalPage ?? 1}
                onNext={onNextPage}
                onPrev={onPrevPage}
                onChange={onChangePage}
              />
            </Box>
            <Box
              sx={{
                flex: 1,
                display: {xs: !!currentNotification ? 'block' : 'none', md: 'block'},
                transform: {xs: 'translateY(-20px)', md: 'translateY(0)'},
              }}
            >
              <Typography variant='h6' mb={5}>
                Details
              </Typography>
              <Divider sx={{mb: 6}}></Divider>
              <NotificationDetail notification={currentNotification} />
            </Box>
          </Stack>
        </DashboardLayout.Content>
      </DashboardLayout>
    </Box>
  );
};
