import {useMutation, useQuery} from '@tanstack/react-query';
import {deleteOutletsCompany, getOutletsCompany, postAddOutletsCompany} from '@/api/outlets.api';
import {
  IOutlets,
  IOutletAddResponseType,
  IOutletRequestType,
  IOutletDeleteResponseType,
} from '@/interface/outlets.interface';

export const useOutletsHook = () => {
  const getOutletsCompanyQuery = (params: IOutletRequestType) => {
    return useQuery({
      queryKey: ['outlets', 'list', params.companyId],
      queryFn: () => getOutletsCompany(params),
      enabled: !!params.companyId,
    });
  };

  const postAddOutletsCompanyMutation = ({
    onSuccess,
    onError,
  }: {
    onSuccess?:
      | ((data: IOutletAddResponseType, variables: IOutlets[], context: unknown) => unknown)
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

  const deleteOutletsCompanyMutation = ({
    onSuccess,
    onError,
  }: {
    onSuccess?:
      | ((data: IOutletDeleteResponseType, variables: string, context: unknown) => unknown)
      | undefined;
    onError?: ((error: Error, variables: string, context: unknown) => unknown) | undefined;
  }) =>
    useMutation({
      mutationKey: ['outlets', 'create'],
      mutationFn: deleteOutletsCompany,
      onSuccess: (data, variables, context) => {
        if (onSuccess) {
          return onSuccess(data, variables, context);
        }
      },
      onError: (err, variables, context) => {
        if (onError) {
          return onError(err as Error, variables, context);
        }
      },
    });

  return {
    getOutletsCompanyQuery,
    postAddOutletsCompanyMutation,
    deleteOutletsCompanyMutation,
  };
};
