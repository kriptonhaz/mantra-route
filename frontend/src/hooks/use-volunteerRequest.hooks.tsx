import {useMutation, useQuery} from '@tanstack/react-query';
import {
  checkOutVRAttendance,
  checkinVRAttendance,
  getAssignedVolunteer,
  getCalendarSessionVr,
  getCheckinStatusVrAttendance,
  getListVolunteerRequest,
  getVolunteerRequestDetail,
  getVolunteerSession,
  getVolunteerSessionDetail,
  getVrAttendance,
  registerVolunteerRequestSession,
  submitVolunteerInvitationForm,
  registerRegularVR,
  withdrawnRegularVR,
} from '../api/volunteerRequest.api';
import useTokenStore from '@/store/use-token.store';
import {
  IAssignedVolunteerParams,
  IVrAttendanceCheckInPayload,
  IVrAttendanceCheckInResponse,
  IVrAttendanceCheckOutPayload,
  IVrAttendanceCheckOutResponse,
  IVrAttendanceCheckinStatusPayload,
  IVrAttendanceCheckinStatusResponse,
  VolunteerSessionDetailRequestType,
  VrDetailRequestType,
  VrRequestType,
} from '@/interface/volunteerRequest.interface';
import {AxiosError} from 'axios';
import useErrorStore from '@/store/use-error.store';
import {queryClient} from '@/service/QueryClient';
import useVolunteerStore from '@/store/use-volunteer.store';
import {getUpcomingPeVr} from '@/api/programmeEvents.api';

export const useVolunteerRequestHook = () => {
  const token = useTokenStore((state) => state.accessToken);
  const errorStore = useErrorStore((state) => state);
  const volunteerStore = useVolunteerStore((state) => state);

  const listVolunteerRequest = (props?: VrRequestType) =>
    useQuery({
      queryKey: ['listVolunteerRequest', props],
      queryFn: () => getListVolunteerRequest(props),
      keepPreviousData: true,
      staleTime: 5000,
      enabled: !!token,
    });

  const ListUpcomingVr = () =>
    useQuery({
      queryKey: ['listVolunteerRequest', 'upcoming'],
      queryFn: () => getUpcomingPeVr({type: JSON.stringify(['vr', 'vs'])}),
      enabled: !!token,
      onError: (err: Error) => errorStore.open(err),
    });

  const listVolunteerRequestSessionCalendar = () =>
    useQuery({
      queryKey: ['volunteerRequestDetail'],
      queryFn: () => getCalendarSessionVr(),
      enabled: !!token,
    });

  const volunteerRequestDetail = (props?: VrDetailRequestType) =>
    useQuery({
      queryKey: ['volunteerRequestDetail', props],
      queryFn: () => getVolunteerRequestDetail(props),
      enabled: !!token,
      onSettled: () => {
        if (volunteerStore.isLoading) {
          volunteerStore.setIsLoading(false);
        }
      },
    });

  const listVolunteerRequestSession = (props?: VrDetailRequestType) =>
    useQuery({
      queryKey: ['listVolunteerRequestSession', props],
      queryFn: () => getVolunteerSession(props),
      enabled: !!token,
    });

  const volunteerSessionDetail = (props?: VolunteerSessionDetailRequestType) =>
    useQuery({
      queryKey: ['volunteerSessionDetail', props],
      queryFn: () => getVolunteerSessionDetail(props),
      enabled: !!token,
    });

  const registerMutationRegular = ({idVr}: {idVr: string}) =>
    useMutation({
      mutationKey: ['volunteerRequestRegisterRegular', {idVr}, 'register'],
      mutationFn: registerRegularVR,
      onSuccess: () => {
        queryClient.invalidateQueries(['volunteerRequestDetail', {idVr}]);
      },
      onError: (err: Error | AxiosError) => {
        if (err instanceof AxiosError) {
          if (err.response?.data.error.includes('exceeded')) {
            let newError: Error = {
              name: 'Registration Failed',
              message:
                'For bookings with more than 2 slots per month, please contact Food from the Heart staff directly at amanda@foodheart.org for assistance',
            };
            errorStore.open(newError);
          } else if (err.response?.data.error.includes('Volunteer is already registered')) {
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

  const withdrawnMutationRegular = ({idVr, reason}: {idVr: string; reason: string}) =>
    useMutation({
      mutationKey: ['volunteerRequestRegisterRegular', {idVr}, {reason}, 'register'],
      mutationFn: withdrawnRegularVR,
      onSuccess: () => {
        queryClient.invalidateQueries(['volunteerRequestDetail', {idVr}]);
      },
      onError: (err) => errorStore.open(err as Error),
    });

  const volunteerRequestSessionRegister = ({onSuccess}: {onSuccess: () => void}) =>
    useMutation({
      mutationFn: registerVolunteerRequestSession,
      onSuccess: (res) => {
        onSuccess();
      },
      onError: (err) => {
        if (err instanceof AxiosError) {
          errorStore.open(err);
        } else if (err instanceof Error) {
          errorStore.open(err);
        }
      },
    });

  const getAssignedVolunteerQuery = (params: IAssignedVolunteerParams) =>
    useQuery({
      queryKey: ['volunteer', 'assigned', params],
      queryFn: () => getAssignedVolunteer(params),
    });

  const invitationVRMutation = useMutation({
    mutationFn: submitVolunteerInvitationForm,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['volunteer', 'assigned', {assignedId: variables.assignedId}],
      });
    },
    onError: (err: Error) => errorStore.open(err),
  });

  const vrAttendanceQuery = (vrId: string) =>
    useQuery({
      queryKey: ['volunteer-request', 'attendance', {vrId}],
      queryFn: () => getVrAttendance(vrId),
      enabled: !!vrId,
    });

  const getStatusVRAttendanceMutation = ({
    onSuccess,
    onError,
  }: {
    onSuccess?: (
      data: IVrAttendanceCheckinStatusResponse,
      variables: IVrAttendanceCheckinStatusPayload,
      context: unknown,
    ) => unknown;
    onError?: (
      error: Error,
      variables: IVrAttendanceCheckinStatusPayload,
      context: unknown,
    ) => unknown;
  }) =>
    useMutation({
      mutationKey: ['volunteer-request', 'attendance', 'check-in', 'status'],
      mutationFn: getCheckinStatusVrAttendance,
      onSuccess: (data, variables, context) => {
        if (onSuccess) {
          onSuccess(data, variables, context);
        }
      },
      onError: (err: Error | AxiosError, variables, context) => {
        if (onError) onError(err, variables, context);
        if (err instanceof AxiosError) {
          const statusCode = err.response?.status || 0;
          if (400 <= statusCode && statusCode < 500) {
            return;
          }
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

  const checkinVRAttendanceMutation = ({
    onSuccess,
  }: {
    onSuccess: (
      data: IVrAttendanceCheckInResponse,
      variables: IVrAttendanceCheckInPayload,
      context: unknown,
    ) => unknown;
  }) =>
    useMutation({
      mutationKey: ['volunteer-request', 'attendance', 'check-in'],
      mutationFn: checkinVRAttendance,
      onSuccess: (data, variables, context) => {
        if (onSuccess) onSuccess(data, variables, context);
      },
      onError: (err: Error) => errorStore.open(err),
    });

  const checkoutVRAttendanceMutation = ({
    onSuccess,
  }: {
    onSuccess?: (
      data: IVrAttendanceCheckOutResponse,
      variables: IVrAttendanceCheckOutPayload,
      context: unknown,
    ) => unknown;
  }) =>
    useMutation({
      mutationKey: ['volunteer-request', 'attendance', 'check-out'],
      mutationFn: checkOutVRAttendance,
      onSuccess: (data, variables, context) => {
        if (onSuccess) onSuccess(data, variables, context);
      },
      onError: (err: Error) => errorStore.open(err),
    });

  return {
    volunteerStore,
    listVolunteerRequest,
    ListUpcomingVr,
    volunteerRequestDetail,
    listVolunteerRequestSessionCalendar,
    listVolunteerRequestSession,
    volunteerRequestSessionRegister,
    volunteerSessionDetail,
    registerMutationRegular,
    withdrawnMutationRegular,
    getAssignedVolunteerQuery,
    invitationVRMutation,
    vrAttendanceQuery,
    getStatusVRAttendanceMutation,
    checkinVRAttendanceMutation,
    checkoutVRAttendanceMutation,
  };
};
