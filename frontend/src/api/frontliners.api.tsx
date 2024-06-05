import {
  FrontlineRequestType,
  FrontlinerAddResponseType,
  FrontlinerResponseType,
  IFrontliner,
} from '@/interface/frontliners.interface';
import MantraApi from './base-mantra-route';

export const getFrontlinerCompany = async (
  params?: FrontlineRequestType,
): Promise<FrontlinerResponseType> => {
  const {data} = await MantraApi().request<FrontlinerResponseType>({
    url: `${import.meta.env.VITE_BASE_API_VERSION}/frontline/company/${params?.companyId}`,
    method: 'GET',
    params: params,
  });

  return data;
};

export const postAddFrontlineCompany = async (
  payload?: IFrontliner[],
): Promise<FrontlinerAddResponseType> => {
  const {data} = await MantraApi().request<FrontlinerAddResponseType>({
    url: `${import.meta.env.VITE_BASE_API_VERSION}/frontline/bulk`,
    method: 'POST',
    data: payload,
  });

  return data;
};
