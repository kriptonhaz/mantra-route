import {LoadingPortal} from '@/components/LoadingPage/LoadingPage';
import {delayLoading} from '@/utils/delay-loading';
import React, {Suspense, lazy} from 'react';

const FrontlinersPage = lazy(() =>
  delayLoading(import('@/pages/frontliners').then((module) => ({default: module.FrontlinersPage}))),
);

const Frontliner: React.FC = () => {
  return (
    <Suspense fallback={<LoadingPortal />}>
      <FrontlinersPage />
    </Suspense>
  );
};

export default Frontliner;
