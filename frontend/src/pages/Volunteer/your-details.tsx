import LoadingPage from '@/components/LoadingPage';
import {delayLoading} from '@/utils/delay-loading';
import React, {Suspense, lazy} from 'react';

const YourDetailsScreen = lazy(() => delayLoading(import('@/features/volunteer/your-details')));

const VolunteerYourDetails: React.FC = () => {
  return (
    <Suspense fallback={<LoadingPage />}>
      <YourDetailsScreen />
    </Suspense>
  );
};

export default VolunteerYourDetails;
