import {
  GetJobRequestParamsType,
  GetJobResponseType,
  PostCreateJobsType,
} from '@/interface/jobs.interface';
import API from './base';

export const getJobsCompany = async (
  params: GetJobRequestParamsType,
): Promise<GetJobResponseType> => {
  const {data} = await API().request<GetJobResponseType>({
    url: `${import.meta.env.VITE_BASE_API_VERSION}/job/${params.companyId}`,
    method: 'GET',
    params: params,
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
