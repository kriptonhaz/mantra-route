import {
  ICheckEmailPEPayload,
  ICheckEmailPEResponse,
  ICheckinAttendancePEPayload,
  ICheckinAttendancePEResponse,
  IGetAllParticipantsParams,
  IGetAllParticipantsResponse,
  ProgrammeEventCancelWithdrawRequestType,
  ProgrammeEventCancelWithdrawResponseType,
  ProgrammeEventDetailRequestType,
  ProgrammeEventDetailResponseType,
  ProgrammeEventListType,
  ProgrammeEventRegisterResponseType,
  ProgrammeEventRequestType,
  ProgrammeEventUpcomingResponseType,
  ProgrammeEventVrUpcomingResponseType,
} from '../interface/programmeEvents.interface';

import FfthAPI from './base';

export const getListProgrammeEvents = async (
  props?: ProgrammeEventRequestType,
): Promise<ProgrammeEventListType> => {
  const finalParams = {...props, status: props?.status ? JSON.stringify(props?.status) : []};
  const {data} = await FfthAPI().request<ProgrammeEventListType>({
    url: '/programmeEvents',
    method: 'GET',
    params: finalParams,
  });

  return data;
};

export const getDetailProgrammeEvents = async (
  props: ProgrammeEventDetailRequestType,
): Promise<ProgrammeEventDetailResponseType> => {
  const {data} = await FfthAPI().request<ProgrammeEventDetailResponseType>({
    url: `/programmeEvents/${props.idProgramme}`,
    method: 'GET',
  });

  return data;
};

export const registerProgrammeEvents = async (props: {
  programmeEventID: string;
}): Promise<ProgrammeEventRegisterResponseType> => {
  const {data} = await FfthAPI().request<ProgrammeEventRegisterResponseType>({
    url: `/programmeEvents/${props.programmeEventID}/register`,
    method: 'POST',
  });

  return data;
};

export const cancelWithdrawProgrammeEvents = async (
  props: ProgrammeEventCancelWithdrawRequestType,
): Promise<ProgrammeEventCancelWithdrawResponseType> => {
  const {data} = await FfthAPI().request<ProgrammeEventCancelWithdrawResponseType>({
    url: `/programmeEvents/${props.programmeEventID}/cancel`,
    method: 'POST',
    data: {
      participantId: props.participantId,
      status: props.status,
    },
  });

  return data;
};

export const getUpcomingProgrammeEvents = async (): Promise<ProgrammeEventUpcomingResponseType> => {
  const {data} = await FfthAPI().request<ProgrammeEventUpcomingResponseType>({
    url: `/programmeEvents/upcoming`,
    method: 'GET',
  });

  return data;
};

export const getUpcomingPeVr = async (props?: {
  type: string;
}): Promise<ProgrammeEventVrUpcomingResponseType> => {
  const {data} = await FfthAPI().request<ProgrammeEventVrUpcomingResponseType>({
    url: `/programmeEvents/volunteerRequests`,
    method: 'GET',
    params: props,
  });

  return data;
};

export const checkEmailProgrammeEvent = async (
  payload: ICheckEmailPEPayload,
): Promise<ICheckEmailPEResponse> => {
  const {data} = await FfthAPI().request<ICheckEmailPEResponse>({
    url: `/programmeEvents/${payload.programmeId}/email`,
    method: 'POST',
    data: payload,
  });
  return data;
};

export const checkinProgrammeEvent = async (
  payload: ICheckinAttendancePEPayload,
): Promise<ICheckinAttendancePEResponse> => {
  const {data} = await FfthAPI().request<ICheckinAttendancePEResponse>({
    url: `/programmeEvents/check-in`,
    method: 'POST',
    data: payload,
  });
  return data;
};

export const getAllParticipants = async (
  params: IGetAllParticipantsParams,
): Promise<IGetAllParticipantsResponse> => {
  const finalParams = {...params, status: JSON.stringify(params.status)};
  const {data} = await FfthAPI().request<IGetAllParticipantsResponse>({
    url: '/participants',
    method: 'GET',
    params: finalParams,
  });

  return data;
};
