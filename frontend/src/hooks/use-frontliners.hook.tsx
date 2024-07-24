import {useMutation, useQuery} from '@tanstack/react-query';
import {
  deleteFrontliner,
  getFrontlinerCompany,
  postBulkAddFrontlineCompany,
  postSingleAddFrontlineCompany,
} from '@/api/frontliners.api';
import {
  AddBulkFrontlinePayloadType,
  IFrontlineRequestType,
  FrontlinerAddResponseType,
  IAddSingleFrontlineResponse,
  IFormSingleAddFrontliner,
  IFrontlinerDeleteResponse,
} from '@/interface/frontliners.interface';

export const useFrontlinersHook = () => {
  const getFrontlinerCompanyQuery = (params: IFrontlineRequestType) => {
    return useQuery({
      queryKey: ['frontliner', 'list', params.companyId],
      queryFn: () => getFrontlinerCompany(params),
      enabled: !!params.companyId,
    });
  };

  const postAddFrontlinerSingleCompanyMutation = ({
    onSuccess,
    onError,
  }: {
    onSuccess?:
      | ((
          data: IAddSingleFrontlineResponse,
          variables: IFormSingleAddFrontliner,
          context: unknown,
        ) => unknown)
      | undefined;
    onError?:
      | ((error: Error, variables: IFormSingleAddFrontliner, context: unknown) => unknown)
      | undefined;
  }) =>
    useMutation({
      mutationKey: ['frontliner', 'add', 'single'],
      mutationFn: postSingleAddFrontlineCompany,
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

  const postAddFrontlinerBulkCompanyMutation = ({
    onSuccess,
    onError,
  }: {
    onSuccess?:
      | ((
          data: FrontlinerAddResponseType,
          variables: AddBulkFrontlinePayloadType,
          context: unknown,
        ) => unknown)
      | undefined;
    onError?:
      | ((error: Error, variables: AddBulkFrontlinePayloadType, context: unknown) => unknown)
      | undefined;
  }) =>
    useMutation({
      mutationKey: ['frontliner', 'add', 'bulk'],
      mutationFn: postBulkAddFrontlineCompany,
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

  const deleteFrontlinerMutation = ({
    onSuccess,
    onError,
  }: {
    onSuccess?:
      | ((data: IFrontlinerDeleteResponse, variables: string, context: unknown) => unknown)
      | undefined;
    onError?: ((error: Error, variables: string, context: unknown) => unknown) | undefined;
  }) =>
    useMutation({
      mutationKey: ['frontliner', 'add', 'single'],
      mutationFn: deleteFrontliner,
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
    getFrontlinerCompanyQuery,
    postAddFrontlinerSingleCompanyMutation,
    postAddFrontlinerBulkCompanyMutation,
    deleteFrontlinerMutation,
  };
};
