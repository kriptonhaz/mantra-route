import {changeProfileInfo, getProfileInfo} from '../api/profile.api';
import {useMutation, useQuery} from '@tanstack/react-query';
import {queryClient} from '../service/QueryClient';
import useTokenStore from '@/store/use-token.store';
import {AxiosError} from 'axios';
import {ProfileInfoInput} from '@/interface/profileInfo.interface';
import useErrorStore from '@/store/use-error.store';

export const useProfileHook = () => {
  const token = useTokenStore((state) => state.accessToken);
  const errorStore = useErrorStore((state) => state);

  const updateProfileUser = (params: {
    onSuccess?: (data: ProfileInfoInput, variables: ProfileInfoInput, context: unknown) => void;
    onError?: (error: unknown, variables: ProfileInfoInput, context: unknown) => unknown;
  }) =>
    useMutation({
      mutationKey: ['updateProfileUser'],
      mutationFn: changeProfileInfo,
      onSuccess: (data, variables, context) => {
        if (params.onSuccess) {
          params.onSuccess(data, variables, context);
        }
        queryClient.invalidateQueries(['profileUser']);
      },
      onError: (err: AxiosError | Error, variables, context) => {
        if (err instanceof AxiosError) {
          const statusCode = err.status || 0;
          if (400 <= statusCode && statusCode < 500 && params.onError) {
            return params.onError(err as AxiosError, variables, context);
          }
        }
        errorStore.open(err);
      },
    });

  const profileUser = useQuery({
    queryKey: ['profileUser'],
    queryFn: () => getProfileInfo(),
    enabled: !!token,
  });

  return {
    profileUser,
    updateProfileUser,
  };
};
