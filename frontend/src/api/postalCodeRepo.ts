import {
  AddressPostalCode,
  IPostalCodeParams,
  IPostalCodeResponse,
} from '@/interface/postalcode.interface';
import FfthAPIProd from './baseProduction';
import PostalCodeAPI from './postalCodeService';

export const getAddress = async (params?: string): Promise<AddressPostalCode[]> => {
  const {data} = await PostalCodeAPI().request<AddressPostalCode[]>({
    url: params ? `/postalcodes/${params}` : '/postalcodes',
    method: 'get',
  });
  return data;
};

export const apiPostalCode = async (params?: IPostalCodeParams): Promise<IPostalCodeResponse> => {
  const {data} = await FfthAPIProd().request<IPostalCodeResponse>({
    url: `/postalcodes/${params?.postalCode}`,
    method: 'GET',
    data: null,
  });

  return data;
};
