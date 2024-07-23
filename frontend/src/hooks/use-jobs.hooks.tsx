import {getJobsCompany, postCreateJobsCompany} from '@/api/jobs.api';
import {PostCreateJobsType} from '@/interface/jobs.interface';
import {useMutation, useQuery} from '@tanstack/react-query';

export const useJobsHook = () => {
  const getJobsCompanyQuery = (companyId: string) => {
    return useQuery({
      queryKey: ['job', 'list', companyId],
      queryFn: () => getJobsCompany(companyId),
      enabled: !!companyId,
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

  return {
    getJobsCompanyQuery,
    postCreateJobsCompanyMutation,
  };
};
