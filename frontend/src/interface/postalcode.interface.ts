export interface AddressPostalCode {
  BLDGNAME: string;
  BLDGNO: string;
  POSTCODE: string;
  STREETNAME: string;
}

export interface IPostalCodeParams {
  postalCode: string;
}

export interface IPostalCodeResponse {
  postalcodes: Postalcode[];
}

export interface Postalcode {
  id: string;
  name: string;
  block: string;
  buildingName: string;
  country: null;
  street: string;
}
