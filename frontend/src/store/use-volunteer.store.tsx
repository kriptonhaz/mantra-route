import {create} from 'zustand';

export interface VolunteerStoreType {
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

const useVolunteerStore = create<VolunteerStoreType>()((set, _) => ({
  isLoading: false,
  setIsLoading: (by) => {
    set((state) => ({...state, isLoading: by}));
  },
}));

export default useVolunteerStore;
