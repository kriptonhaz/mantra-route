import useErrorStore from '@/store/use-error.store';
import useTokenStore from '@/store/use-token.store';
import {useQuery} from '@tanstack/react-query';
import {countNotifUnread, getNotification} from '../api/notification.api';
import {GetListNotifProps} from '@/interface/notification.interface';

export const useNotificationHook = () => {
  const token = useTokenStore((state) => state.accessToken);
  const errorState = useErrorStore((state) => state);

  const notificationUnreadUser = useQuery({
    queryKey: ['notificationUnreadUser'],
    queryFn: () => countNotifUnread(),
    enabled: !!token,
  });

  const listNotifications = (props: GetListNotifProps) =>
    useQuery({
      queryKey: ['notifications', props],
      queryFn: () => getNotification(props),
      keepPreviousData: true,
      staleTime: 5000,
      enabled: !!token,
    });

  return {
    listNotifications,
    notificationUnreadUser,
  };
};
