import {
  AddBulkFrontlinePayloadType,
  FrontlineRequestType,
  FrontlinerAddResponseType,
  FrontlinerResponseType,
  IAddSingleFrontlineResponse,
  IFormSingleAddFrontliner,
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

export const postSingleAddFrontlineCompany = async (
  payload: IFormSingleAddFrontliner,
): Promise<IAddSingleFrontlineResponse> => {
  const {data} = await API().request<IAddSingleFrontlineResponse>({
    url: `${import.meta.env.VITE_BASE_API_VERSION}/frontline`,
    method: 'POST',
    data: payload,
  });

  return data;
};

export const postBulkAddFrontlineCompany = async (
  payload?: AddBulkFrontlinePayloadType,
): Promise<FrontlinerAddResponseType> => {
  const {data} = await API().request<FrontlinerAddResponseType>({
    url: `${import.meta.env.VITE_BASE_API_VERSION}/frontline/bulk`,
    method: 'POST',
    data: payload,
  });

  return data;
};
