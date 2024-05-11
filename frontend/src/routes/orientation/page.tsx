import LoadingPage from '@/components/LoadingPage/LoadingPage';
import React, {Suspense, lazy} from 'react';
import {delayLoading} from '@/utils/delay-loading';
import {OrientationInvitPage} from '@/pages/Orientation/Invitation';

const OrientationPage = lazy(() =>
  delayLoading(import('@/pages/Orientation').then((module) => ({default: module.OrientationPage}))),
);

export const Orientation: React.FC = () => {
  return (
    <Suspense fallback={<LoadingPage />}>
      <OrientationPage />
    </Suspense>
  );
};

export const OrientationInvitation: React.FC = () => {
  return (
    <Suspense fallback={<LoadingPage />}>
      <OrientationInvitPage />
    </Suspense>
  );
};
