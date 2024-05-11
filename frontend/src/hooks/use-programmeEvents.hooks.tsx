import {useMutation, useQuery} from '@tanstack/react-query';
import {
  cancelWithdrawProgrammeEvents,
  checkEmailProgrammeEvent,
  checkinProgrammeEvent,
  getAllParticipants,
  getDetailProgrammeEvents,
  getListProgrammeEvents,
  getUpcomingPeVr,
  registerProgrammeEvents,
} from '../api/programmeEvents.api';
import useTokenStore from '@/store/use-token.store';
import {
  IGetAllParticipantsParams,
  ProgrammeEventDetailRequestType,
  ProgrammeEventRequestType,
} from '@/interface/programmeEvents.interface';
import {queryClient} from '@/service/QueryClient';
import useErrorStore from '@/store/use-error.store';
import {AxiosError} from 'axios';
import useProgrammeEventAttendance from '@/pages/Programme/Attendance/Components/useProgrammeEventAttendance';

type ProgrammeEventHookType = {
  idProgramme?: string;
};
export const useProgrammeEventsHook = (props?: ProgrammeEventHookType) => {
  const token = useTokenStore((state) => state.accessToken);
  const role = useTokenStore((state) => state.role);
  const errorStore = useErrorStore((state) => state);
  const setParticipant = useProgrammeEventAttendance((state) => state.setParticipant);
  const updateStatusParticipant = useProgrammeEventAttendance((state) => state.updateStatus);

  const listProgrammeEvents = (props: ProgrammeEventRequestType) =>
    useQuery({
      queryKey: ['listProgrammeEvents', props],
      queryFn: () => getListProgrammeEvents(props),
      keepPreviousData: true,
      staleTime: 5000,
      enabled: !!token,
    });

  const programmeEventDetail = (props: ProgrammeEventDetailRequestType) =>
    useQuery({
      queryKey: ['programmeEventDetail', props],
      queryFn: () => getDetailProgrammeEvents(props),
      enabled: !!token,
    });

  const listParticipants = (props: IGetAllParticipantsParams) =>
    useQuery({
      queryKey: ['programmeEvents', 'participants', props],
      queryFn: () => getAllParticipants(props),
      enabled: !!token,
      onError: (err: Error) => errorStore.open(err),
    });

  const ListUpcomingEvents = () =>
    useQuery({
      queryKey: ['programmeEvents', 'upcoming'],
      queryFn: () => getUpcomingPeVr(),
      enabled: !!token && role !== 'volunteer officer',
      onError: (err: Error) => errorStore.open(err),
    });

  const programmeEventRegister = useMutation({
    mutationFn: registerProgrammeEvents,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['programmeEventDetail', {idProgramme: props?.idProgramme}],
      });
    },
    onError: (err: Error | AxiosError) => {
      if (err instanceof AxiosError) {
        if (err.response?.data.error.includes('Volunteer is already registered')) {
          let newError: Error = {
            name: 'Registration Failed',
            message: 'You already registered for another event at the same time.',
          };
          errorStore.open(newError);
        } else {
          let newError: Error = {
            name: 'Registration Failed',
            message: 'Internal Server Error.',
          };
          errorStore.open(newError);
        }
      } else {
        errorStore.open(err);
      }
    },
  });

  const programmeEventCancelWithdraw = useMutation({
    mutationFn: cancelWithdrawProgrammeEvents,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['programmeEventDetail', {idProgramme: props?.idProgramme}],
      });
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        errorStore.open(err);
      } else if (err instanceof Error) {
        errorStore.open(err);
      }
    },
  });

  const programmeEventCheckEmailMutation = useMutation({
    mutationFn: checkEmailProgrammeEvent,
    onSuccess: (data) => {
      setParticipant(data);
    },
    onError: (err: Error) => {
      if (err instanceof AxiosError) {
        let newError: Error = {
          name: 'Checkin Failed',
          message: err.response?.data.error,
        };
        errorStore.open(newError);
      } else {
        let newError: Error = {
          name: 'Checkin Failed',
          message: 'Internal Server Error',
        };
        errorStore.open(newError);
      }
    },
  });

  const programmeEventCheckinMutation = useMutation({
    mutationFn: checkinProgrammeEvent,
    onSuccess: () => {
      updateStatusParticipant('Attended');
    },
    onError: (err: Error) => errorStore.open(err),
  });

  return {
    listProgrammeEvents,
    listParticipants,
    programmeEventDetail,
    ListUpcomingEvents,
    programmeEventRegister,
    programmeEventCancelWithdraw,
    programmeEventCheckEmailMutation,
    programmeEventCheckinMutation,
  };
};
