import {LoadingPortal} from '@/components/LoadingPage/LoadingPage';
import {delayLoading} from '@/utils/delay-loading';
import React, {Suspense, lazy} from 'react';

const SchedulePage = lazy(() =>
  delayLoading(import('@/pages/schedule').then((module) => ({default: module.SchedulePage}))),
);

const Schedule: React.FC = () => {
  return (
    <Suspense fallback={<LoadingPortal />}>
      <SchedulePage />
    </Suspense>
  );
};

export default Schedule;
