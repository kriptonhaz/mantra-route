import {
  IOutlets,
  IOutletAddResponseType,
  IOutletRequestType,
  IOutletResponseType,
  IOutletDeleteResponseType,
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

export const deleteOutletsCompany = async (
  outledId: string,
): Promise<IOutletDeleteResponseType> => {
  const {data} = await API().request<IOutletDeleteResponseType>({
    url: `${import.meta.env.VITE_BASE_API_VERSION}/outlet/${outledId}`,
    method: 'DELETE',
  });

  return data;
};
