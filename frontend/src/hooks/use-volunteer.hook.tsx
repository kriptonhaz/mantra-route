import {useQuery} from '@tanstack/react-query';
import {getUserActivity} from '../api/contact.api';
import useTokenStore from '@/store/use-token.store';

export const useVolunteerHook = () => {
  const token = useTokenStore((state) => state.accessToken);

  const volunteerActivity = useQuery({
    queryKey: ['volunteerActivity'],
    queryFn: () => getUserActivity(),
    enabled: !!token,
  });

  return {
    volunteerActivity,
  };
};
