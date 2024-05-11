import {AxiosError} from 'axios';
import {create} from 'zustand';

type TError = null | Error | AxiosError;
export interface IErrorState {
  show: boolean;
  error: Error | AxiosError | null;
  open: (err: TError) => void;
  close: () => void;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const useErrorStore = create<IErrorState>()((set, _) => ({
  show: false,
  error: null,
  open: (err) => {
    set((state) => ({...state, show: true, error: err}));
  },
  close: () => {
    set((state) => ({...state, show: false}));
  },
}));

export default useErrorStore;
