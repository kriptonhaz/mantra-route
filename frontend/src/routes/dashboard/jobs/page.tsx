import {LoadingPortal} from '@/components/LoadingPage/LoadingPage';
import {delayLoading} from '@/utils/delay-loading';
import React, {Suspense, lazy} from 'react';

const JobsPage = lazy(() =>
  delayLoading(import('@/pages/jobs').then((module) => ({default: module.JobsPage}))),
);

const Jobs: React.FC = () => {
  return (
    <Suspense fallback={<LoadingPortal />}>
      <JobsPage />
    </Suspense>
  );
};

export default Jobs;
