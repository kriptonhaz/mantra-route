import {GetJobRequestType, PostCreateJobsType} from '@/interface/jobs.interface';
import API from './base';

export const getJobsCompany = async (companyId: string): Promise<GetJobRequestType> => {
  const {data} = await API().request<GetJobRequestType>({
    url: `${import.meta.env.VITE_BASE_API_VERSION}/job/${companyId}`,
    method: 'GET',
  });

  return data;
};

export const postCreateJobsCompany = async (payload: PostCreateJobsType): Promise<void> => {
  const {data} = await API().request<void>({
    url: `${import.meta.env.VITE_BASE_API_VERSION}/job`,
    method: 'POST',
    data: payload,
  });

  return data;
};
