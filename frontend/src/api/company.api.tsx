import {
  IGetCompanyResponse,
  IPostCompanyData,
  IPostCompanyResponse,
} from '@/interface/company.interface';
import API from './base';

export const getCompany = async (): Promise<IGetCompanyResponse> => {
  const {data} = await API().request<IGetCompanyResponse>({
    url: '/v1/company',
    method: 'GET',
  });

  return data;
};

export const postCompany = async (payload: IPostCompanyData): Promise<IPostCompanyResponse> => {
  const {data} = await API().request<IPostCompanyResponse>({
    url: '/v1/company',
    method: 'POST',
    data: payload,
  });

  return data;
};
