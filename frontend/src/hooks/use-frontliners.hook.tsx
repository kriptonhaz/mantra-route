import {useMutation, useQuery} from '@tanstack/react-query';
import useTokenStore from '@/store/use-token.store';
import {AxiosError} from 'axios';
import useErrorStore from '@/store/use-error.store';
import {queryClient} from '@/service/QueryClient';
import useVolunteerStore from '@/store/use-volunteer.store';
import {getFrontlinerCompany, postAddFrontlineCompany} from '@/api/frontliners.api';
import {
  FrontlineRequestType,
  FrontlinerAddResponseType,
  IFrontliner,
} from '@/interface/frontliners.interface';

export const useFrontlinersHook = () => {
  const token = useTokenStore((state) => state.accessToken);
  const errorStore = useErrorStore((state) => state);
  const volunteerStore = useVolunteerStore((state) => state);

  const getFrontlinerCompanyQuery = (params: FrontlineRequestType) => {
    return useQuery({
      queryKey: ['frontliner', 'list', params.companyId],
      queryFn: () => getFrontlinerCompany(params),
    });
  };

  const postAddFrontlinerCompanyMutation = ({
    onSuccess,
    onError,
  }: {
    onSuccess?:
      | ((data: FrontlinerAddResponseType, variables: IFrontliner[], context: unknown) => unknown)
      | undefined;
    onError?: ((error: Error, variables: IFrontliner[], context: unknown) => unknown) | undefined;
  }) =>
    useMutation({
      mutationKey: ['helpdesk', 'ticket', 'create'],
      mutationFn: postAddFrontlineCompany,
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
    getFrontlinerCompanyQuery,
    postAddFrontlinerCompanyMutation,
  };
};
