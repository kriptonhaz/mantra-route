import {LoadingPortal} from '@/components/LoadingPage/LoadingPage';
import {delayLoading} from '@/utils/delay-loading';
import React, {Suspense, lazy} from 'react';

const VolunteerOrganisation = lazy(() =>
  delayLoading(import('@/features/dashboard/frontliners/organisation')),
);

const VolunteerOrganisationPage: React.FC = () => {
  return (
    <Suspense fallback={<LoadingPortal />}>
      <VolunteerOrganisation />
    </Suspense>
  );
};

export default VolunteerOrganisationPage;
