import {
  FrontlineRequestType,
  FrontlinerAddResponseType,
  FrontlinerResponseType,
  IFrontliner,
} from '@/interface/frontliners.interface';
import API from './base';

export const getFrontlinerCompany = async (
  params?: FrontlineRequestType,
): Promise<FrontlinerResponseType> => {
  const {data} = await API().request<FrontlinerResponseType>({
    url: `${import.meta.env.VITE_BASE_API_VERSION}/frontline/company/${params?.companyId}`,
    method: 'GET',
  });

  return data;
};

export const postAddFrontlineCompany = async (
  payload?: IFrontliner[],
): Promise<FrontlinerAddResponseType> => {
  const {data} = await API().request<FrontlinerAddResponseType>({
    url: `${import.meta.env.VITE_BASE_API_VERSION}/frontline/bulk`,
    method: 'POST',
    data: payload,
  });

  return data;
};
