import {
  getJobsCompany,
  postCreateJobsCompany,
  putDraftJobsCompany,
  putExecuteJobsCompany,
} from '@/api/jobs.api';
import {GetJobRequestParamsType, PostCreateJobsType} from '@/interface/jobs.interface';
import {useMutation, useQuery} from '@tanstack/react-query';

export const useJobsHook = () => {
  const getJobsCompanyQuery = (params: GetJobRequestParamsType) => {
    return useQuery({
      queryKey: ['job', 'list', params],
      queryFn: () => getJobsCompany(params),
      enabled: !!params.companyId,
    });
  };

  const postCreateJobsCompanyMutation = ({
    onSuccess,
    onError,
  }: {
    onSuccess?:
      | ((data: void, variables: PostCreateJobsType, context: unknown) => unknown)
      | undefined;
    onError?:
      | ((error: Error, variables: PostCreateJobsType, context: unknown) => unknown)
      | undefined;
  }) =>
    useMutation({
      mutationKey: ['job', 'create'],
      mutationFn: postCreateJobsCompany,
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

  const putExecuteJobsCompanyMutation = ({
    onSuccess,
    onError,
  }: {
    onSuccess?: ((data: void, variables: string, context: unknown) => unknown) | undefined;
    onError?: ((error: Error, variables: string, context: unknown) => unknown) | undefined;
  }) =>
    useMutation({
      mutationKey: ['job', 'execute'],
      mutationFn: putExecuteJobsCompany,
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

  const putDraftJobsCompanyMutation = ({
    onSuccess,
    onError,
  }: {
    onSuccess?: ((data: void, variables: string, context: unknown) => unknown) | undefined;
    onError?: ((error: Error, variables: string, context: unknown) => unknown) | undefined;
  }) =>
    useMutation({
      mutationKey: ['job', 'draft'],
      mutationFn: putDraftJobsCompany,
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
    getJobsCompanyQuery,
    postCreateJobsCompanyMutation,
    putExecuteJobsCompanyMutation,
    putDraftJobsCompanyMutation,
  };
};
