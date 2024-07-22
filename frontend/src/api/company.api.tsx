import {IGetCompanyResponse} from '@/interface/company.interface';
import API from './base';

export const getCompany = async (): Promise<IGetCompanyResponse> => {
  const {data} = await API().request<IGetCompanyResponse>({
    url: '/v1/company',
    method: 'GET',
  });

  return data;
};
