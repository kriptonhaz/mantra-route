import LoadingPage from '@/components/LoadingPage/LoadingPage';
import React, {Suspense, lazy} from 'react';
import {delayLoading} from '@/utils/delay-loading';

const ForgetPasswordPage = lazy(() =>
  delayLoading(import('@/pages/forget').then((module) => ({default: module.ForgetPasswordPage}))),
);

const ResetPasswordPage = lazy(() =>
  delayLoading(
    import('@/pages/resetPassword').then((module) => ({default: module.ResetPasswordPage})),
  ),
);

export const Forgot: React.FC = () => {
  return (
    <Suspense fallback={<LoadingPage />}>
      <ForgetPasswordPage />
    </Suspense>
  );
};

export const ResetPassword: React.FC = () => {
  return (
    <Suspense fallback={<LoadingPage />}>
      <ResetPasswordPage />
    </Suspense>
  );
};
