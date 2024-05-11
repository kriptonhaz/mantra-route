import {LoadingPortal} from '@/components/LoadingPage/LoadingPage';
import {delayLoading} from '@/utils/delay-loading';
import React, {Suspense, lazy} from 'react';

const UpcomingPage = lazy(() =>
  delayLoading(import('@/pages/upcoming').then((module) => ({default: module.UpcomingPage}))),
);

const Upcoming: React.FC = () => {
  return (
    <Suspense fallback={<LoadingPortal />}>
      <UpcomingPage />
    </Suspense>
  );
};

export default Upcoming;
