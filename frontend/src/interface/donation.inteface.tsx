import {Postalcode} from './postalcode.interface';

export type TAmount = number | '' | 'Other';
export type TPaymentMethod = 'Credit Card' | 'PayNow';
export type TFrequency = 'One-time' | 'Monthly';
export type TDonor = 'Individual' | 'Organisation';
export type TIDType = 'nric' | 'fin' | 'uen';

export interface IDonationForm {
  donationID: string;
  donationNo: string;
  programmeId?: string;
  frequency: TFrequency;
  amount: number;
  donorType: TDonor | '';
  title: string;
  orgName: string;
  fullname: string;
  surname: string;
  idType: TIDType | '';
  idNumber: string;
  gender: string;
  birthdate: string;
  email: string;
  designation: string;
  mobile: string;
  country: string;
  postal: string;
  buildingNumber: string;
  street: string;
  unitNumber: string;
  city: string;
  officePhone: string;
  knowAboutUs: string;
  remarks: string;
  receiveMonthlyNewsletter: boolean;
  isTax: boolean;
}

export interface IDonationFormResponse {
  message: string;
  data: {
    donation: {
      id: string;
      Name: string;
    };
    checkoutToken: {
      merchant: string;
      session: {
        id: string;
        updateStatus: string;
        version: string;
      };
      successIndicator: string;
    };
  };
}

export interface IChangePaymentMethodDonationForm {
  donationId: string;
  paymentMethod: TPaymentMethod;
}

export interface IChangePaymentMethodDonationFormResponse {
  id: string;
  success: boolean;
  errors: any[];
}

export interface IUpdateDonationStatusForm {
  donationID: string;
  donationNumber: string;
  checkoutToken: string;
}

export interface IUpdateDonationStatusResponse {
  id: string;
  success: boolean;
  errors: any[];
}
