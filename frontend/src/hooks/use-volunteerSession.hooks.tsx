import {
  bulkInsertAssignedVolunteerForm,
  deleteVolunteerSession,
  getAllVolunteerOnSessions,
  insertAVolunteerSessionForm,
  registerSessionVR,
  updateVolunteerSession,
  uploadVolunteersOrg,
  withdrawRegularVR,
} from '@/api/volunteerSession.api';
import {
  IBulkInsertAssignedVolunteerPayload,
  IBulkInsertAssignedVolunteerResponse,
  IInsertVolunteerSessionPayload,
  IInsertVolunteerSessionResponse,
  IUpdateVolunteerSessionPayload,
  IUpdateVolunteerSessionResponse,
  IUploadVolunteersOrgForm,
  IUploadVolunteersOrgResponse,
  IWithdrawRegularVRPayload,
  IWithdrawRegularVRResponse,
} from '@/interface/volunteerSession.interface';
import useErrorStore from '@/store/use-error.store';
import useTokenStore from '@/store/use-token.store';
import useVolunteerStore from '@/store/use-volunteer.store';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {AxiosError} from 'axios';
import {useParams} from 'react-router-dom';

interface IResponseError {
  error: string;
}

export const useVolunteerSessionHook = () => {
  const queryClient = useQueryClient();
  const token = useTokenStore((state) => state.accessToken);
  const {sessionId} = useParams();
  const volunteerStore = useVolunteerStore((state) => state);
  const errorStore = useErrorStore((state) => state);

  const getAllQuery = () =>
    useQuery({
      queryKey: ['volunteer', {sessionId}, 'assignment', 'volunteers'],
      queryFn: () => getAllVolunteerOnSessions(sessionId || ''),
      onSettled: () => {
        if (volunteerStore.isLoading) {
          volunteerStore.setIsLoading(false);
        }
      },
      enabled: !!token,
    });

  // insert volunteer
  const insertMutation = (params: {
    onSuccess: (
      data: IInsertVolunteerSessionResponse,
      variables: IInsertVolunteerSessionPayload,
      context: unknown,
    ) => void;
  }) =>
    useMutation({
      mutationKey: ['volunteer', {sessionId}, 'assignment', 'insert'],
      mutationFn: insertAVolunteerSessionForm,
      onSuccess: (data, variables, context) => {
        params.onSuccess(data, variables, context);
        queryClient.invalidateQueries(['volunteer', {sessionId}, 'assignment', 'volunteers']);
      },
      onError: (err) => errorStore.open(err as Error),
    });

  const bulkInsertMutation = (params: {
    onSuccess: (
      data: IBulkInsertAssignedVolunteerResponse,
      variables: IBulkInsertAssignedVolunteerPayload,
      context: unknown,
    ) => void;
    onError: (err: AxiosError<IResponseError>) => void;
  }) =>
    useMutation({
      mutationKey: ['volunteer', {sessionId}, 'assignment', 'insert', 'bulk'],
      mutationFn: bulkInsertAssignedVolunteerForm,
      onSuccess(data, variables, context) {
        params.onSuccess(data, variables, context);
        queryClient.invalidateQueries(['volunteer', {sessionId}, 'assignment', 'volunteers']);
      },
      onError: (err: Error | AxiosError) => {
        if (err instanceof AxiosError) {
          const statusCode = err.response?.status || 0;
          if (statusCode >= 400 && statusCode < 500 && !!params.onError) {
            return params.onError(err as AxiosError<IResponseError>);
          }
        }
        errorStore.open(err as Error);
      },
    });

  // delete volunteer
  const deleteMutation = () =>
    useMutation({
      mutationKey: ['volunteer', {sessionId}, 'assignment', 'delete'],
      mutationFn: deleteVolunteerSession,
      onSuccess: () => {
        queryClient.invalidateQueries(['volunteer', {sessionId}, 'assignment', 'volunteers']);
      },
      onError: (err) => errorStore.open(err as Error),
    });

  // update volunteer
  const updateMutation = (params: {
    onSuccess: (
      data: IUpdateVolunteerSessionResponse,
      variables: IUpdateVolunteerSessionPayload,
      context: unknown,
    ) => void;
  }) =>
    useMutation({
      mutationKey: ['volunteer', {sessionId}, 'assignment', 'update'],
      mutationFn: updateVolunteerSession,
      onSuccess: (data, variables, context) => {
        params.onSuccess(data, variables, context);
        queryClient.invalidateQueries(['volunteer', {sessionId}, 'assignment', 'volunteers']);
      },
      onError: (err) => errorStore.open(err as Error),
    });

  const registerMutation = ({vrId, sessionId}: {vrId: string; sessionId: string}) =>
    useMutation({
      mutationKey: ['volunteer', {vrId}, 'register'],
      mutationFn: registerSessionVR,
      onSuccess: () => {
        queryClient.invalidateQueries(['volunteer', {sessionId}, 'assignment', 'volunteers']);
        queryClient.invalidateQueries(['volunteerSessionDetail', {sessionId}]);
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

  const withdrawMutation = (params: {
    onSuccess?: (
      data: IWithdrawRegularVRResponse,
      variables: IWithdrawRegularVRPayload,
      context: unknown,
    ) => void;
  }) =>
    useMutation({
      mutationKey: ['volunteer', 'withdraw'],
      mutationFn: withdrawRegularVR,
      onSuccess: (data, variables, context) => {
        if (params.onSuccess) {
          params.onSuccess(data, variables, context);
        }
        queryClient.invalidateQueries([
          'volunteer',
          {sessionId: variables.sessionId},
          'assigned',
          'volunteers',
        ]);
        queryClient.invalidateQueries(['volunteerSessionDetail', {sessionId: variables.sessionId}]);
      },
      onError: (err) => errorStore.open(err as Error),
    });

  const uploadBulkVolunteerOrg = (params: {
    onSuccess?: (
      data: IUploadVolunteersOrgResponse,
      variables: IUploadVolunteersOrgForm,
      context: unknown,
    ) => void;
  }) =>
    useMutation({
      mutationKey: ['volunteer', 'organisation', 'upload'],
      mutationFn: uploadVolunteersOrg,
      onSuccess: (data, variables, context) => {
        if (params.onSuccess) {
          params.onSuccess(data, variables, context);
        }
      },
      onError: (err) => errorStore.open(err as Error),
    });

  return {
    volunteerStore,
    getAllQuery,
    insertMutation,
    bulkInsertMutation,
    deleteMutation,
    updateMutation,
    registerMutation,
    withdrawMutation,
    uploadBulkVolunteerOrg,
  };
};
