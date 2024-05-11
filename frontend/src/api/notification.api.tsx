import {
  GetListNotifProps,
  ListNotificationResponseType,
  UnreadNotifResponseType,
} from '../interface/notification.interface';
import FfthAPI from './base';

export const getNotification = async (
  props: GetListNotifProps,
): Promise<ListNotificationResponseType> => {
  const {data} = await FfthAPI().request<ListNotificationResponseType>({
    url: '/FSMAContacts/notification',
    method: 'GET',
    params: props,
  });

  return data;
};

export const countNotifUnread = async (): Promise<UnreadNotifResponseType> => {
  const {data} = await FfthAPI().request<UnreadNotifResponseType>({
    url: '/FSMAContacts/unread',
    method: 'GET',
  });

  return data;
};
