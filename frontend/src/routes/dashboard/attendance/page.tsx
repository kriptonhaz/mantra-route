import {LoadingPortal} from '@/components/LoadingPage/LoadingPage';
import {delayLoading} from '@/utils/delay-loading';
import React, {Suspense, lazy} from 'react';

const AttendancePage = lazy(() =>
  delayLoading(import('@/pages/attendance').then((module) => ({default: module.AttendancePage}))),
);

const Attendance: React.FC = () => {
  return (
    <Suspense fallback={<LoadingPortal />}>
      <AttendancePage />
    </Suspense>
  );
};

export default Attendance;
