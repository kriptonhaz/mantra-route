import {RoleType} from '@/interface/auth.interface';
import {create} from 'zustand';
import {persist, createJSONStorage} from 'zustand/middleware';

export interface TokenStoreType {
  accessToken: string | null;
  isLogin: boolean;
  role: RoleType | null;
  setAccessToken: (token: string | null) => void;
  setRole: (role: RoleType | null) => void;
  setIsLogin: (login: boolean) => void;
}

const useTokenStore = create<TokenStoreType>()(
  persist(
    (set) => ({
      accessToken: null,
      isLogin: false,
      role: null,
      setAccessToken: (by) => {
        set((state) => ({...state, accessToken: by}));
      },
      setRole: (by) => {
        set((state) => ({...state, role: by}));
      },
      setIsLogin: (by) => {
        set((state) => ({...state, isLogin: by}));
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);

export default useTokenStore;
