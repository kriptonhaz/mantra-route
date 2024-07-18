export interface ILoginInput {
  username: string;
  password: string;
}

export interface ForgetPasswordInput {
  email: string | '';
}

export interface ResetPasswordInput {
  newPassword: string;
  confirmPassword: string | undefined;
  token: string;
}

export type LoginInputType = keyof ILoginInput;

export type IProfile = {
  id: string;
  username: string;
  password: string;
  vendor: string;
  phone: string;
  email: string;
  vendor_name: string;
  exp: number;
  token: string;
};
export interface LoginResult {
  code: number;
  data: IProfile;
  message: string;
  meta: number;
  status: number;
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
  id: string;
  username: string;
  password: string;
  vendor: string;
  phone: string;
  email: string;
  vendor_name: string;
  exp: number;
  token: string;
}
