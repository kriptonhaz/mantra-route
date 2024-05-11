import {useState} from 'react';
import * as PostalCodeAPI from '@/api/postalCodeRepo';
import {AddressPostalCode} from '@/interface/postalcode.interface';

export const usePostalCode = () => {
  const [address, setAddress] = useState<AddressPostalCode[] | []>([]);

  const getAddress = async (param?: string) => {
    try {
      const data = await PostalCodeAPI.getAddress(param);
      setAddress(data);
    } catch (err) {
      console.log(err);
    }
  };

  const getFormattedAddress = (): string => {
    let formatAddress = '';
    if (address.length !== 0) {
      const dataAddress: AddressPostalCode = address[0];
      formatAddress = `${dataAddress.BLDGNAME ? dataAddress.BLDGNAME : ''} ${
        dataAddress.BLDGNO ? dataAddress.BLDGNO : ''
      } ${dataAddress.STREETNAME ? dataAddress.STREETNAME : ''}`;
      return formatAddress;
    } else {
      return formatAddress;
    }
  };

  return {
    address,
    getFormattedAddress,
    getAddress,
  };
};
