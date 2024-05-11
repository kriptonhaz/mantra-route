import LoadingPage from '@/components/LoadingPage/LoadingPage';
import React, {Suspense, lazy} from 'react';
import {delayLoading} from '@/utils/delay-loading';

const VolunteerRequestPage = lazy(() =>
  delayLoading(
    import('@/pages/Volunteer/VolunteerRequest').then((module) => ({
      default: module.VolunteerRequestPage,
    })),
  ),
);

const VolunteerRequestInvitationPage = lazy(() =>
  delayLoading(
    import('@/pages/Volunteer/Invitation').then((module) => ({
      default: module.VolunteerRequestInvitation,
    })),
  ),
);

export const VolunteerRequest: React.FC = () => {
  return (
    <Suspense fallback={<LoadingPage />}>
      <VolunteerRequestPage />
    </Suspense>
  );
};
export const VolunteerRequestInvitation: React.FC = () => {
  return (
    <Suspense fallback={<LoadingPage />}>
      <VolunteerRequestInvitationPage />
    </Suspense>
  );
};
