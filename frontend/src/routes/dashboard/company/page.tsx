import {LoadingPortal} from '@/components/LoadingPage/LoadingPage';
import {delayLoading} from '@/utils/delay-loading';
import React, {Suspense, lazy} from 'react';

const CompanyPage = lazy(() =>
  delayLoading(import('@/pages/company').then((module) => ({default: module.CompanyPage}))),
);

const Company: React.FC = () => {
  return (
    <Suspense fallback={<LoadingPortal />}>
      <CompanyPage />
    </Suspense>
  );
};

export default Company;
