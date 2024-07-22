import {useMutation, useQuery} from '@tanstack/react-query';
import {getCompany, postCompany} from '@/api/company.api';
import {IPostCompanyData, IPostCompanyResponse} from '@/interface/company.interface';

export const useCompanyHook = () => {
  const getCompanyQuery = () => {
    return useQuery({
      queryKey: ['company', 'list'],
      queryFn: () => getCompany(),
    });
  };

  const postAddCompany = ({
    onSuccess,
    onError,
  }: {
    onSuccess?:
      | ((data: IPostCompanyResponse, variables: IPostCompanyData, context: unknown) => unknown)
      | undefined;
    onError?:
      | ((error: Error, variables: IPostCompanyData, context: unknown) => unknown)
      | undefined;
  }) =>
    useMutation({
      mutationKey: ['company', 'create'],
      mutationFn: postCompany,
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
    getCompanyQuery,
    postAddCompany,
  };
};
