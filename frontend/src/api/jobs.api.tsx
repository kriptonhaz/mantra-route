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
    url: `v1/job/${params.companyId}`,
    method: 'GET',
    params: params,
  });

  return data;
};

export const postCreateJobsCompany = async (payload: PostCreateJobsType): Promise<void> => {
  const {data} = await API().request<void>({
    url: `v1/job`,
    method: 'POST',
    data: payload,
  });

  return data;
};

export const putExecuteJobsCompany = async (jobsId: string): Promise<void> => {
  const {data} = await API().request<void>({
    url: `v1/job/execute/${jobsId}`,
    method: 'PUT',
  });

  return data;
};

export const putDraftJobsCompany = async (jobsId: string): Promise<void> => {
  const {data} = await API().request<void>({
    url: `v1/job/draft/${jobsId}`,
    method: 'PUT',
  });

  return data;
};
