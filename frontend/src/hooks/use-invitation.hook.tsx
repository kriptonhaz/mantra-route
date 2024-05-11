import {
  acceptDeclineEventInvitation,
  checkinEvent,
  checkinRegularEvent,
  getEvent,
  getEventDetail,
  getProgramme,
  getProgrammebyParticipant,
  registerWithdrawProgramme,
} from '@/api/invitation.api';
import {
  EventRequestType,
  InvitationEventRequestType,
  ProgrammeRequestType,
} from '@/interface/invitation.interface';
import {queryClient} from '@/service/QueryClient';
import useErrorStore from '@/store/use-error.store';
import {useMutation, useQuery} from '@tanstack/react-query';
import {AxiosError} from 'axios';
import {useParams} from 'react-router-dom';

export const useInvitationHook = () => {
  const errorStore = useErrorStore((state) => state);
  const {idParticipant} = useParams();

  const programmeInvitation = (props: InvitationEventRequestType) =>
    useQuery({
      queryKey: ['programmeInvitation', props],
      queryFn: () => getProgrammebyParticipant(props),
    });

  const programmeQuery = (programmeId: string) =>
    useQuery({
      queryKey: ['programme', 'attendance', {programmeId}],
      queryFn: () => getProgramme(programmeId),
    });

  const eventDetail = (props: ProgrammeRequestType) =>
    useQuery({
      queryKey: ['orientationEventDetail', props],
      queryFn: () => getEventDetail(props),
    });

  const event = (props: EventRequestType) =>
    useQuery({
      queryKey: ['invitationEvent', props],
      queryFn: () => getEvent(props),
    });

  const onCheckin = useMutation({
    mutationFn: checkinEvent,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['programmeInvitation', {idParticipant}],
      });
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        return err;
      } else if (err instanceof Error) {
        errorStore.open(err);
      }
    },
    cacheTime: 500,
  });

  const onCheckinEvent = useMutation({
    mutationFn: checkinRegularEvent,
    onError: (err) => {
      if (err instanceof AxiosError) {
        return err;
      } else if (err instanceof Error) {
        errorStore.open(err);
      }
    },
    cacheTime: 500,
  });

  const onRegisterWithdrawProgramme = useMutation({
    mutationFn: registerWithdrawProgramme,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['programmeInvitation'],
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

  const eventAcceptDecline = useMutation({
    mutationFn: acceptDeclineEventInvitation,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['invitationEvent'],
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

  return {
    event,
    programmeInvitation,
    eventDetail,
    programmeQuery,
    eventAcceptDecline,
    onCheckin,
    onCheckinEvent,
    onRegisterWithdrawProgramme,
  };
};
