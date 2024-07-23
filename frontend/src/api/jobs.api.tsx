import {GetJobRequestType} from '@/interface/jobs.interface';
import API from './base';

export const getJobsCompany = async (companyId: string): Promise<GetJobRequestType> => {
  const {data} = await API().request<GetJobRequestType>({
    url: `${import.meta.env.VITE_BASE_API_VERSION}/job/${companyId}`,
    method: 'GET',
  });

  return data;
};
