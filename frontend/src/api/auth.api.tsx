import {
  ForgetPasswordInput,
  ILoginInput,
  LoginResult,
  RefreshTokenResponse,
  ResetPasswordInput,
} from '../interface/auth.interface';
import FfthAPI from './base';

export const loginPortalAdmin = async () => {
  const {data} = await FfthAPI().request<LoginResult>({
    url: '/contacts/officer-login',
    method: 'POST',
  });

  return data;
};

export const loginPortal = async (dataLogin: ILoginInput): Promise<LoginResult> => {
  const {data} = await FfthAPI().request<LoginResult>({
    url: '/contacts/login',
    method: 'POST',
    data: dataLogin,
  });

  return data;
};

export const refreshToken = async (): Promise<RefreshTokenResponse> => {
  const {data} = await FfthAPI().request<RefreshTokenResponse>({
    url: '/FSMAContacts/refresh-token',
    method: 'POST',
  });

  return data;
};

export const onForgotPassword = async (dataForgot: ForgetPasswordInput): Promise<any> => {
  const {data} = await FfthAPI().request<any>({
    url: '/contacts/forget-password',
    method: 'POST',
    data: dataForgot,
  });

  return data;
};

export const onResetPassword = async (dataReset: ResetPasswordInput): Promise<any> => {
  const {data} = await FfthAPI().request<any>({
    url: `/contacts/forget-password/verifyToken/${dataReset.token}`,
    method: 'PATCH',
    data: dataReset,
  });

  return data;
};
