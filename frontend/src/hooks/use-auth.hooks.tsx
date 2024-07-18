import {AxiosError} from 'axios';
import {UseMutationResult, useMutation} from '@tanstack/react-query';
import {useNavigate} from 'react-router-dom';
import * as PortalAPI from '../api/auth.api';
import {ILoginInput, LoginResult} from '../interface/auth.interface';
import {UseFormSetError} from 'react-hook-form';
import {queryClient} from '@/service/QueryClient';
import useTokenStore from '@/store/use-token.store';
import useErrorStore from '@/store/use-error.store';

interface PortalHookType {
  setErrorForm?: UseFormSetError<ILoginInput>;
}

export const useAuthHook = (props?: PortalHookType) => {
  const navigate = useNavigate();
  const tokenStore = useTokenStore();
  const errorStore = useErrorStore();

  const onLogin: UseMutationResult<LoginResult, AxiosError | Error, ILoginInput, unknown> =
    useMutation<LoginResult, AxiosError | Error, ILoginInput, unknown>({
      mutationFn: PortalAPI.loginPortal,
      onSuccess: (loginInfo) => {
        tokenStore.setIsLogin(true);
        tokenStore.setAccessToken(loginInfo.data.token); //useless but keep it first
        localStorage.setItem('profile', JSON.stringify(loginInfo.data));
        localStorage.setItem('accessToken', loginInfo.data.token);
        navigate('/dashboard');
      },
      onError: (error) => {
        if (props?.setErrorForm) {
          if (error instanceof AxiosError) {
            props?.setErrorForm('username', {message: error.response?.data?.message});
          } else if (error instanceof Error) {
            props?.setErrorForm('username', {message: error.message});
          }
        }
      },
      cacheTime: 500,
    });

  const onLogout = () => {
    tokenStore.setAccessToken(null);
    tokenStore.setRole(null);
    localStorage.clear();
    queryClient.invalidateQueries({queryKey: ['profileUser']});
    navigate('/');
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
    onLogout,
    onForgotPassword,
    onResetPassword,
  };
};
