import {
  IOutlets,
  IOutletAddResponseType,
  IOutletRequestType,
  IOutletResponseType,
} from '@/interface/outlets.interface';
import API from './base';

export const getOutletsCompany = async (
  params?: IOutletRequestType,
): Promise<IOutletResponseType> => {
  const {data} = await API().request<IOutletResponseType>({
    url: `${import.meta.env.VITE_BASE_API_VERSION}/outlet/company/${params?.companyId}`,
    method: 'GET',
    params: params,
  });

  return data;
};

export const postAddOutletsCompany = async (
  payload?: IOutlets[],
): Promise<IOutletAddResponseType> => {
  const {data} = await API().request<IOutletAddResponseType>({
    url: `${import.meta.env.VITE_BASE_API_VERSION}/outlet/bulk`,
    method: 'POST',
    data: payload,
  });

  return data;
};
