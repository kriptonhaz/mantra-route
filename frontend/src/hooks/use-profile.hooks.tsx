import {changeProfileInfo} from '../api/profile.api';
import {useMutation} from '@tanstack/react-query';
import {queryClient} from '../service/QueryClient';
import {AxiosError} from 'axios';
import {ProfileInfoInput} from '@/interface/profileInfo.interface';
import useErrorStore from '@/store/use-error.store';
import {useEffect, useState} from 'react';
import {IProfile} from '@/interface/auth.interface';

export const useProfileHook = () => {
  const errorStore = useErrorStore((state) => state);
  const profileStorage = localStorage.getItem('profile');
  const [profileUser, setProfileUser] = useState<IProfile | null>(null);

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

  useEffect(() => {
    if (profileStorage) {
      setProfileUser(JSON.parse(profileStorage) as IProfile);
    }
  }, [profileStorage]);

  return {
    profileUser,
    updateProfileUser,
  };
};
