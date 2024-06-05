import {useMutation, useQuery} from '@tanstack/react-query';
import useTokenStore from '@/store/use-token.store';
import {AxiosError} from 'axios';
import useErrorStore from '@/store/use-error.store';
import {queryClient} from '@/service/QueryClient';
import useVolunteerStore from '@/store/use-volunteer.store';
import {getOutletsCompany, postAddOutletsCompany} from '@/api/outlets.api';
import {IOutlets, OutletAddResponseType, OutletRequestType} from '@/interface/outlets.interface';

export const useOutletsHook = () => {
  const token = useTokenStore((state) => state.accessToken);
  const errorStore = useErrorStore((state) => state);
  const volunteerStore = useVolunteerStore((state) => state);

  const getOutletsCompanyQuery = (params: OutletRequestType) => {
    return useQuery({
      queryKey: ['outlets', 'list', params.companyId],
      queryFn: () => getOutletsCompany(params),
    });
  };

  const postAddOutletsCompanyMutation = ({
    onSuccess,
    onError,
  }: {
    onSuccess?:
      | ((data: OutletAddResponseType, variables: IOutlets[], context: unknown) => unknown)
      | undefined;
    onError?: ((error: Error, variables: IOutlets[], context: unknown) => unknown) | undefined;
  }) =>
    useMutation({
      mutationKey: ['outlets', 'create'],
      mutationFn: postAddOutletsCompany,
      onSuccess: (data, variables, context) => {
        if (onSuccess) {
          // @ts-ignore
          return onSuccess(data, variables, context);
        }
      },
      onError: (err, variables, context) => {
        if (onError) {
          // @ts-ignore
          return onError(err, variables, context);
        }
      },
    });

  return {
    volunteerStore,
    getOutletsCompanyQuery,
    postAddOutletsCompanyMutation,
  };
};
