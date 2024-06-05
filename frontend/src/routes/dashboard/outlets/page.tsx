import {LoadingPortal} from '@/components/LoadingPage/LoadingPage';
import {delayLoading} from '@/utils/delay-loading';
import React, {Suspense, lazy} from 'react';

const OutletsPage = lazy(() =>
  delayLoading(import('@/pages/outlets').then((module) => ({default: module.OutletsPage}))),
);

const Outlets: React.FC = () => {
  return (
    <Suspense fallback={<LoadingPortal />}>
      <OutletsPage />
    </Suspense>
  );
};

export default Outlets;
