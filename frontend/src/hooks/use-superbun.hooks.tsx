import axios from 'axios';
import {useState} from 'react';
import {getDeliveryOrder} from '../api/breadrun.api';
import {GetDeliveryOrderProps, GetDeliveryResponseType} from '../interface/delivery.interface';
import {
  ListNotificationResponseType,
  UnreadNotifResponseType,
} from '../interface/superbun.interface';

export const useSuperbunHook = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [listNotif, setListNotif] = useState<ListNotificationResponseType | null>(null);
  const [unreadNotif, setunreadNotif] = useState<UnreadNotifResponseType | null>(null);
  const [upcomingDo, setUpcomingDo] = useState<GetDeliveryResponseType | null>(null);
  const [currentDo, setCurrentDo] = useState<GetDeliveryResponseType | null>(null);
  const [urgentDo, setUrgentDo] = useState<GetDeliveryResponseType | null>(null);

  const getListDo = async (
    props: GetDeliveryOrderProps,
    type: 'upcoming' | 'urgent' | 'current',
  ) => {
    setIsLoading(true);
    setIsError(false);
    setErrorMsg('');
    try {
      const response = await getDeliveryOrder(props);
      if (type === 'upcoming') {
        setUpcomingDo(response);
      } else if (type === 'urgent') {
        setUrgentDo(response);
      } else if (type === 'current') {
        setCurrentDo(response);
      }
    } catch (err) {
      setIsError(true);
      if (axios.isAxiosError(err)) {
        setErrorMsg(err.response?.data?.error);
      } else if (err instanceof Error) {
        setErrorMsg(err.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    isError,
    errorMsg,
    listNotif,
    unreadNotif,
    getListDo,
    upcomingDo,
    currentDo,
    urgentDo,
  };
};
