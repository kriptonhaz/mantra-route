import {IDonationForm} from '@/interface/donation.inteface';
import {create} from 'zustand';
import {persist} from 'zustand/middleware';

export interface IDonationStore {
  data: Partial<IDonationForm> | null;
  createdTime: string;
  updateData: (data: IDonationForm) => void;
  resetData: () => void;
  setCreatedTime: (time: string) => void;
}

const initialData: Partial<IDonationForm> = {
  programmeId: '',
  donationID: '',
  donationNo: '',
  donorType: 'Individual',
  title: '',
  fullname: '',
  surname: '',
  idNumber: '',
  gender: '',
  birthdate: '',
  email: '',
  mobile: '',
  country: '',
  postal: '',
  buildingNumber: '',
  street: '',
  unitNumber: '',
  city: '',
  knowAboutUs: '',
  remarks: '',
  receiveMonthlyNewsletter: false,
  isTax: false,
};

const useDonationStore = create<IDonationStore>()(
  persist(
    (set) => ({
      data: initialData,
      createdTime: '',
      updateData: (data) => {
        set((state) => ({...state, data: {...state.data, ...data}}));
      },
      resetData: () => {
        set((state) => ({...state, data: initialData, createdTime: ''}));
      },
      setCreatedTime: (time) => set((state) => ({...state, createdTime: time})),
    }),
    {
      name: 'donation-form-storage',
    },
  ),
);

export default useDonationStore;
