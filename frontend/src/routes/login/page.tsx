import LoadingPage from '@/components/LoadingPage/LoadingPage';
import React, {Suspense, lazy} from 'react';
import {delayLoading} from '@/utils/delay-loading';

const LoginPage = lazy(() =>
  delayLoading(import('@/pages/login').then((module) => ({default: module.LoginPage}))),
);

const Login: React.FC = () => {
  return (
    <Suspense fallback={<LoadingPage />}>
      <LoginPage />
    </Suspense>
  );
};

export default Login;
