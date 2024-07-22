import {
  IOutlets,
  OutletAddResponseType,
  OutletRequestType,
  OutletResponseType,
} from '@/interface/outlets.interface';
import API from './base';

export const getOutletsCompany = async (
  params?: OutletRequestType,
): Promise<OutletResponseType> => {
  const {data} = await API().request<OutletResponseType>({
    url: `${import.meta.env.VITE_BASE_API_VERSION}/outlet/company/${params?.companyId}`,
    method: 'GET',
  });

  return data;
};

export const postAddOutletsCompany = async (
  payload?: IOutlets[],
): Promise<OutletAddResponseType> => {
  const {data} = await API().request<OutletAddResponseType>({
    url: `${import.meta.env.VITE_BASE_API_VERSION}/outlet/bulk`,
    method: 'POST',
    data: payload,
  });

  return data;
};
