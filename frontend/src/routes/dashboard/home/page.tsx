import {LoadingPortal} from '@/components/LoadingPage/LoadingPage';
import {delayLoading} from '@/utils/delay-loading';
import React, {Suspense, lazy} from 'react';

const HomePage = lazy(() =>
  delayLoading(import('@/pages/home').then((module) => ({default: module.DashboardHome}))),
);

const Home: React.FC = () => {
  return (
    <Suspense fallback={<LoadingPortal />}>
      <HomePage />
    </Suspense>
  );
};

export default Home;
