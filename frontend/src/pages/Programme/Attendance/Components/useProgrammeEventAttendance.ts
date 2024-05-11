import {ICheckEmailPEResponse, ParticipantStatusType} from '@/interface/programmeEvents.interface';
import {create} from 'zustand';

export interface IProgrammeEventStore {
  participant: ICheckEmailPEResponse | null;
  setParticipant: (participant: ICheckEmailPEResponse) => void;
  updateStatus: (status: ParticipantStatusType) => void;
}

const useProgrammeEventAttendance = create<IProgrammeEventStore>()((set, get) => ({
  participant: null,
  setParticipant: (participant) => set((state) => ({...state, participant})),
  updateStatus: (status) => {
    if (get().participant) {
      const updatedParticipant: Required<ICheckEmailPEResponse> = {
        ...(get().participant as ICheckEmailPEResponse),
        Status__c: status,
      };
      set((state) => ({...state, participant: updatedParticipant}));
    }
  },
}));

export default useProgrammeEventAttendance;
