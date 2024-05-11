import {LoadingPortal} from '@/components/LoadingPage/LoadingPage';
import {delayLoading} from '@/utils/delay-loading';
import React, {Suspense, lazy} from 'react';

const VolunteerPage = lazy(() =>
  delayLoading(import('@/pages/volunteer').then((module) => ({default: module.VolunteerPage}))),
);

const Volunteer: React.FC = () => {
  return (
    <Suspense fallback={<LoadingPortal />}>
      <VolunteerPage />
    </Suspense>
  );
};

export default Volunteer;
