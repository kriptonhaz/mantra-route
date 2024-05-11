export interface LoginInput {
  Email: string | '';
  Password: string | '';
}

export interface ForgetPasswordInput {
  email: string | '';
}

export interface ResetPasswordInput {
  newPassword: string;
  confirmPassword: string | undefined;
  token: string;
}

export type LoginInputType = keyof LoginInput;

export interface LoginResult {
  message: string;
  accessToken: string;
  userType: string;
  isPhoneVerified: boolean;
}

export interface EditableFormProp {
  isEdit: boolean;
}

export interface RefreshTokenResponse {
  accessToken: string;
}

export type VolunteerTokenType = 'Individual' | 'Contact';
export type RoleType = 'volunteer' | 'volunteer officer';
export interface JwtTokenType {
  userType: string;
  role: RoleType;
  volunteerType: VolunteerTokenType;
  Stakeholder: string;
  Id: string;
  Name: string;
  Title: string;
  Email: string;
  HomePhone: string | null;
  MobilePhone: string | null;
  Birthdate: string | null;
  iat: number;
  exp: number;
}
