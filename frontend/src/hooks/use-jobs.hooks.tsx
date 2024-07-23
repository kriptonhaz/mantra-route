import {getJobsCompany} from '@/api/jobs.api';
import {useQuery} from '@tanstack/react-query';

export const useJobsHook = () => {
  const getJobsCompanyQuery = (companyId: string) => {
    return useQuery({
      queryKey: ['job', 'list', companyId],
      queryFn: () => getJobsCompany(companyId),
      enabled: !!companyId,
    });
  };

  return {
    getJobsCompanyQuery,
  };
};
