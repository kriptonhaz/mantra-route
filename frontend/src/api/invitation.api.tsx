import FfthAPI from './base';
import {
  GeneralResponseType,
  RegisterWithdrawInvitationRequestType,
  InvitationEventRequestType,
  InvitationEventResponseType,
  CheckinRequestType,
  CheckinResponseType,
  EventRequestType,
  EventResponseType,
  ProgrammeRequestType,
  AcceptDeclineEventRequestType,
  AcceptDeclineEventResponseType,
  CheckinRegularRequestType,
  IProgrammeResponse,
} from '@/interface/invitation.interface';

export const getProgrammebyParticipant = async (
  props: InvitationEventRequestType,
): Promise<InvitationEventResponseType> => {
  const {data} = await FfthAPI().request<InvitationEventResponseType>({
    url: `/programmeEvents/participant/${props.idParticipant}`,
    method: 'GET',
  });

  return data;
};

export const getProgramme = async (programmeId: string): Promise<IProgrammeResponse> => {
  const {data} = await FfthAPI().request<IProgrammeResponse>({
    url: `/programmeEvents/${programmeId}/attendance`,
    method: 'GET',
  });
  return data;
};

export const getEvent = async (props: EventRequestType): Promise<EventResponseType> => {
  const {data} = await FfthAPI().request<EventResponseType>({
    url: `/events/${props.idEvent}`,
    method: 'GET',
  });

  return data;
};

export const getEventDetail = async (
  props: ProgrammeRequestType,
): Promise<InvitationEventResponseType> => {
  const {data} = await FfthAPI().request<InvitationEventResponseType>({
    url: `/programmeEvents/${props.idProgramme}`,
    method: 'GET',
  });

  return data;
};

export const registerWithdrawProgramme = async (
  props: RegisterWithdrawInvitationRequestType,
): Promise<GeneralResponseType> => {
  const {data} = await FfthAPI().request<GeneralResponseType>({
    url: `/programmeEvents/${props.programmeEventID}/register-invitation`,
    method: 'POST',
    data: {
      participantID: props.participantID,
      status: props.status,
    },
  });
  return data;
};
export const checkinRegularEvent = async (
  props: CheckinRegularRequestType,
): Promise<GeneralResponseType> => {
  const {data} = await FfthAPI().request<GeneralResponseType>({
    url: `/events/${props.eventID}/attendance-reguler`,
    method: 'POST',
    data: {
      email: props.email,
    },
  });
  return data;
};

export const acceptDeclineEventInvitation = async (
  props: AcceptDeclineEventRequestType,
): Promise<AcceptDeclineEventResponseType> => {
  const {data} = await FfthAPI().request<AcceptDeclineEventResponseType>({
    url: `/events/${props.eventID}/invitation`,
    method: 'POST',
    data: {
      status: props.status,
    },
  });
  return data;
};

export const checkinEvent = async (props: CheckinRequestType): Promise<CheckinResponseType> => {
  const {data} = await FfthAPI().request<CheckinResponseType>({
    url: `/programmeEvents/${props.programmeEventID}/check-in`,
    method: 'POST',
    data: {
      email: props.email,
    },
  });
  return data;
};
