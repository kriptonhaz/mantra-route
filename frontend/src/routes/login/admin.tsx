import LoadingPage from '@/components/LoadingPage/LoadingPage';
import React, {Suspense, lazy} from 'react';
import {delayLoading} from '@/utils/delay-loading';

const LoginAdminPage = lazy(() =>
  delayLoading(import('@/pages/login-admin').then((module) => ({default: module.LoginAdminPage}))),
);

const LoginAdmin: React.FC = () => {
  return (
    <Suspense fallback={<LoadingPage />}>
      <LoginAdminPage />
    </Suspense>
  );
};

export default LoginAdmin;
