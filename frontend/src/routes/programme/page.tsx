import LoadingPage from '@/components/LoadingPage/LoadingPage';
import React, {Suspense, lazy} from 'react';
import {delayLoading} from '@/utils/delay-loading';

const ProgrammeInvitationPage = lazy(() =>
  delayLoading(
    import('@/pages/Programme').then((module) => ({default: module.ProgrammeInvitationPage})),
  ),
);
const ProgrammeAttendancePage = lazy(() =>
  delayLoading(
    import('@/pages/Programme/Attendance').then((module) => ({
      default: module.ProgrammeEventAttendance,
    })),
  ),
);

export const ProgrammeInvitation: React.FC = () => {
  return (
    <Suspense fallback={<LoadingPage />}>
      <ProgrammeInvitationPage />
    </Suspense>
  );
};
export const ProgrammeEventAttendance: React.FC = () => {
  return (
    <Suspense fallback={<LoadingPage />}>
      <ProgrammeAttendancePage />
    </Suspense>
  );
};
