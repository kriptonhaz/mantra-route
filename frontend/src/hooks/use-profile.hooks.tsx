import {useEffect, useState} from 'react';
import {IProfile} from '@/interface/auth.interface';

export const useProfileHook = () => {
  const profileStorage = localStorage.getItem('profile');
  const [profileUser, setProfileUser] = useState<IProfile | null>(null);

  useEffect(() => {
    if (profileStorage) {
      setProfileUser(JSON.parse(profileStorage) as IProfile);
    }
  }, [profileStorage]);

  return {
    profileUser,
  };
};
