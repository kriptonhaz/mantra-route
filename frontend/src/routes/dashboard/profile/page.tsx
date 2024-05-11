import {LoadingPortal} from '@/components/LoadingPage/LoadingPage';
import {delayLoading} from '@/utils/delay-loading';
import React, {Suspense, lazy} from 'react';

const ProfilePage = lazy(() =>
  delayLoading(import('@/pages/profile').then((module) => ({default: module.ProfilePage}))),
);

const Profile: React.FC = () => {
  return (
    <Suspense fallback={<LoadingPortal />}>
      <ProfilePage />
    </Suspense>
  );
};

export default Profile;
