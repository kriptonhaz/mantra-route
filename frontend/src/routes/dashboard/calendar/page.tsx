import {LoadingPortal} from '@/components/LoadingPage/LoadingPage';
import {delayLoading} from '@/utils/delay-loading';
import React, {Suspense, lazy} from 'react';

const CalendarPage = lazy(() =>
  delayLoading(import('@/pages/calendar').then((module) => ({default: module.CalendarPage}))),
);

const Calendar: React.FC = () => {
  return (
    <Suspense fallback={<LoadingPortal />}>
      <CalendarPage />
    </Suspense>
  );
};

export default Calendar;
