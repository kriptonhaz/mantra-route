import MantraApi from './base-mantra-route';
import {
  IOutlets,
  OutletAddResponseType,
  OutletRequestType,
  OutletResponseType,
} from '@/interface/outlets.interface';

export const getOutletsCompany = async (
  params?: OutletRequestType,
): Promise<OutletResponseType> => {
  const {data} = await MantraApi().request<OutletResponseType>({
    url: `${import.meta.env.VITE_BASE_API_VERSION}/outlet/company/${params?.companyId}`,
    method: 'GET',
    params: params,
  });

  return data;
};

export const postAddOutletsCompany = async (
  payload?: IOutlets[],
): Promise<OutletAddResponseType> => {
  const {data} = await MantraApi().request<OutletAddResponseType>({
    url: `${import.meta.env.VITE_BASE_API_VERSION}/outlet/bulk`,
    method: 'POST',
    data: payload,
  });

  return data;
};
