import {JwtTokenType} from '@/interface/auth.interface';
import useTokenStore from '@/store/use-token.store';
import axios, {AxiosInstance, InternalAxiosRequestConfig} from 'axios';
import jwt_decode from 'jwt-decode';

type APIParams = {
  cookie?: string;
  baseUrl?: string;
};

let API: AxiosInstance;

const setupAPIClient = (params?: {baseUrl?: string}) => {
  API = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });

  API.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response) {
        console.error(
          JSON.stringify({
            name: '[api][error]',
            detail: error.response?.data,
          }),
        );
      } else {
        console.error('[error]', error);
      }

      return Promise.reject(error);
    },
  );
};

export const initialize = (params?: APIParams, anonymous?: boolean): AxiosInstance => {
  // always create new axios instance when cookie changed
  if (params?.cookie || params?.baseUrl || !API || anonymous) {
    if (params?.baseUrl) {
      setupAPIClient({baseUrl: params.baseUrl});
    } else {
      setupAPIClient();
    }
  }
  const tokenStore = useTokenStore.getState();
  API.interceptors.request.use(
    async (config: InternalAxiosRequestConfig): Promise<InternalAxiosRequestConfig> => {
      const accessToken = localStorage.getItem('accessToken') as string;
      if (accessToken) {
        const decodeToken = jwt_decode(accessToken) as JwtTokenType;
        const dateNow = Math.floor(new Date().getTime() / 1000);
        if (dateNow > decodeToken.exp) {
          localStorage.removeItem('accessToken');
          tokenStore.setIsLogin(false);
        } else {
          config.headers['Authorization'] = 'Bearer ' + accessToken;
        }
      }
      return config;
    },
  );
  return API;
};

export default initialize;
