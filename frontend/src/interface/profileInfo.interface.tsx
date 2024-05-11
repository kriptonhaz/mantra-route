export interface ProfileInfoInput {
  name: string;
  phoneNumber: string;
  email: string;
  file: File | string;
}

export interface ProfileChangePasswordProps {
  oldPassword: string;
  newPassword: string;
  verifyPassword: string;
}

export type ProfileInfoInputType = keyof ProfileInfoInput;

export interface ProfileDataResponseType {
  data: {
    Id: string;
    Name: string;
    Email: string;
    MobilePhone: string;
    Profile_Image_Url__c: string | undefined;
    Birthdate: string;
    Gender__c: string;
    MailingPostalCode: string;
    Unit_No__c: string;
    MailingAddress: {
      city: null | string;
      country: null | string;
      geocodeAccuracy: null | string;
      latitude: null | string;
      longitude: null | string;
      postalCode: string | null;
      state: null | string;
      street: string;
    };
    Email_Notification__c: string;
    Push_Notification__c: string;
  };
}

export interface PasswordFormInput {
  oldPassword: string;
  newPassword: string;
  verifyPassword: string;
}

export interface PasswordFormResponse {
  message: string;
}
