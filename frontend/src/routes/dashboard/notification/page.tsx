import {LoadingPortal} from '@/components/LoadingPage/LoadingPage';
import {delayLoading} from '@/utils/delay-loading';
import React, {Suspense, lazy} from 'react';

const NotificationPage = lazy(() =>
  delayLoading(
    import('@/pages/Notification').then((module) => ({default: module.NotificationPage})),
  ),
);

const Notification: React.FC = () => {
  return (
    <Suspense fallback={<LoadingPortal />}>
      <NotificationPage />
    </Suspense>
  );
};

export default Notification;
