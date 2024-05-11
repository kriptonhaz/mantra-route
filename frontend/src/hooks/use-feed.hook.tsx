import {useQuery} from '@tanstack/react-query';
import {getAnnouncements} from '../api/feed.api';
import useTokenStore from '@/store/use-token.store';

export const useFeedHook = () => {
  const token = useTokenStore((state) => state.accessToken);

  const listAnnouncements = useQuery({
    queryKey: ['listAnnouncements'],
    queryFn: () => getAnnouncements(),
    enabled: !!token,
  });

  return {
    listAnnouncements,
  };
};
