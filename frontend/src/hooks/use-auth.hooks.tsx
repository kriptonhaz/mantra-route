import {AxiosError} from 'axios';
import {UseMutationResult, useMutation} from '@tanstack/react-query';
import {useNavigate} from 'react-router-dom';
import * as PortalAPI from '../api/auth.api';
import {LoginInput, LoginResult} from '../interface/auth.interface';
import {UseFormSetError} from 'react-hook-form';
import {queryClient} from '@/service/QueryClient';
import useTokenStore from '@/store/use-token.store';
import useErrorStore from '@/store/use-error.store';
import jwt_decode from 'jwt-decode';
import {JwtTokenType} from '@/interface/auth.interface';

interface PortalHookType {
  setErrorForm?: UseFormSetError<LoginInput>;
}

export const useAuthHook = (props?: PortalHookType) => {
  const navigate = useNavigate();
  const tokenStore = useTokenStore();
  const errorStore = useErrorStore();

  const onLoginAdmin = useMutation({
    mutationFn: PortalAPI.loginPortalAdmin,
    onSuccess: (loginInfo) => {
      tokenStore.setIsLogin(true);
      tokenStore.setAccessToken(loginInfo.accessToken);
      const decodeToken = jwt_decode(loginInfo.accessToken) as JwtTokenType;
      tokenStore.setRole(decodeToken.role);
      localStorage.setItem('accessToken', loginInfo.accessToken);
      navigate('/dashboard');
    },
    onError: (err) => {
      console.log('err', err);
    },
  });

  const onLoginAdminProd = (accessToken: string) => {
    tokenStore.setIsLogin(true);
    tokenStore.setAccessToken(accessToken);
    const decodeToken = jwt_decode(accessToken) as JwtTokenType;
    tokenStore.setRole(decodeToken.role);
    localStorage.setItem('accessToken', accessToken);
    navigate('/dashboard');
  };

  const onLogin: UseMutationResult<LoginResult, AxiosError | Error, LoginInput, unknown> =
    useMutation<LoginResult, AxiosError | Error, LoginInput, unknown>({
      mutationFn: PortalAPI.loginPortal,
      onSuccess: (loginInfo) => {
        tokenStore.setIsLogin(true);
        tokenStore.setAccessToken(loginInfo.accessToken); //useless but keep it first
        const decodeToken = jwt_decode(loginInfo.accessToken) as JwtTokenType;
        tokenStore.setRole(decodeToken.role);
        localStorage.setItem('accessToken', loginInfo.accessToken);
        navigate('/dashboard');
      },
      onError: (error) => {
        if (props?.setErrorForm) {
          if (error instanceof AxiosError) {
            props?.setErrorForm('Email', {message: error.response?.data?.error});
          } else if (error instanceof Error) {
            props?.setErrorForm('Email', {message: error.message});
          }
        }
      },
      cacheTime: 500,
    });

  const onLogout = () => {
    tokenStore.setAccessToken(null);
    tokenStore.setRole(null);
    queryClient.invalidateQueries({queryKey: ['profileUser']});
    navigate('/login');
  };

  const onForgotPassword = useMutation({
    mutationFn: PortalAPI.onForgotPassword,
    onError: (err) => {
      if (err instanceof AxiosError) {
        errorStore.open(err);
      } else if (err instanceof Error) {
        errorStore.open(err);
      }
    },
    cacheTime: 500,
  });

  const onResetPassword = useMutation({
    mutationFn: PortalAPI.onResetPassword,
    onError: (err) => {
      if (err instanceof AxiosError) {
        errorStore.open(err);
      } else if (err instanceof Error) {
        errorStore.open(err);
      }
    },
    cacheTime: 500,
  });

  return {
    onLogin,
    onLoginAdmin,
    onLoginAdminProd,
    onLogout,
    onForgotPassword,
    onResetPassword,
  };
};
