import {IRegisterRegularVRResponse} from '@/interface/volunteerSession.interface';
import {
  IAssignedVolunteerParams,
  IAssignedVolunteerResponse,
  IVRAttendanceInfoResponse,
  IVolunteerInvitationForm,
  IVolunteerInvitationResponse,
  IVrAttendanceCheckInPayload,
  IVrAttendanceCheckInResponse,
  IVrAttendanceCheckOutPayload,
  IVrAttendanceCheckOutResponse,
  IVrAttendanceCheckinStatusPayload,
  IVrAttendanceCheckinStatusResponse,
  VolunteerRequestListType,
  VolunteerSessionDetailRequestType,
  VrDetailRequestType,
  VrDetailResponseType,
  VrRequestType,
  VrSessionCalendarResponseType,
  VrSessionDetailResponse,
  VrSessionListResponseType,
  VrSessionRegisterRequestType,
} from '../interface/volunteerRequest.interface';

import FfthAPI from './base';

export const getListVolunteerRequest = async (
  props?: VrRequestType,
): Promise<VolunteerRequestListType> => {
  const {data} = await FfthAPI().request<VolunteerRequestListType>({
    url: '/volunteerRequests',
    method: 'GET',
    params: props,
  });

  return data;
};

export const getCalendarSessionVr = async (
  props?: VrRequestType,
): Promise<VrSessionCalendarResponseType> => {
  const {data} = await FfthAPI().request<VrSessionCalendarResponseType>({
    url: '/volunteerSessions',
    method: 'GET',
    params: props,
  });

  return data;
};

export const getVolunteerRequestDetail = async (
  props?: VrDetailRequestType,
): Promise<VrDetailResponseType> => {
  const {data} = await FfthAPI().request<VrDetailResponseType>({
    url: `/volunteerRequests/${props?.idVr}`,
    method: 'GET',
  });

  return data;
};

export const getVolunteerSession = async (
  props?: VrDetailRequestType,
): Promise<VrSessionListResponseType> => {
  const {data} = await FfthAPI().request<VrSessionListResponseType>({
    url: `/volunteerRequests/${props?.idVr}/sessions`,
    method: 'GET',
  });

  return data;
};
export const getVolunteerSessionDetail = async (
  props?: VolunteerSessionDetailRequestType,
): Promise<VrSessionDetailResponse> => {
  const {data} = await FfthAPI().request<VrSessionDetailResponse>({
    url: `/volunteerSessions/${props?.sessionId}`,
    method: 'GET',
  });

  return data;
};

export const registerRegularVR = async (vrId: string): Promise<IRegisterRegularVRResponse> => {
  const {data} = await FfthAPI().request<IRegisterRegularVRResponse>({
    url: `/volunteerRequests/${vrId}/register`,
    method: 'POST',
  });

  return data;
};

export const withdrawnRegularVR = async (props: {
  vrId: string;
  reason: string;
}): Promise<IRegisterRegularVRResponse> => {
  const {data} = await FfthAPI().request<IRegisterRegularVRResponse>({
    url: `/volunteerRequests/${props.vrId}/withdraw`,
    method: 'PATCH',
    data: props,
  });

  return data;
};

export const registerVolunteerRequestSession = async (
  props?: VrSessionRegisterRequestType,
): Promise<any> => {
  const {data} = await FfthAPI().request<any>({
    url: `/volunteerSessions/${props?.idSession}/register`,
    method: 'POST',
  });

  return data;
};

export const getAssignedVolunteer = async (
  params: IAssignedVolunteerParams,
): Promise<IAssignedVolunteerResponse> => {
  const {data} = await FfthAPI().request<IAssignedVolunteerResponse>({
    url: `/volunteerRequests/assignedVolunteer/${params.assignedId}`,
    method: 'GET',
  });

  return data;
};

export const submitVolunteerInvitationForm = async (
  payload: IVolunteerInvitationForm,
): Promise<IVolunteerInvitationResponse> => {
  const {data} = await FfthAPI().request<IVolunteerInvitationResponse>({
    url: `/volunteerRequests/${payload.assignedId}/invitation`,
    method: 'POST',
    data: payload,
  });

  return data;
};

export const getVrAttendance = async (vrId: string): Promise<IVRAttendanceInfoResponse> => {
  const {data} = await FfthAPI().request<IVRAttendanceInfoResponse>({
    url: `/timesheets/${vrId}`,
    method: 'GET',
  });

  return data;
};

export const getCheckinStatusVrAttendance = async (
  payload: IVrAttendanceCheckinStatusPayload,
): Promise<IVrAttendanceCheckinStatusResponse> => {
  const {data} = await FfthAPI().request<IVrAttendanceCheckinStatusResponse>({
    url: `/timesheets/${payload.sessionId}/checkinStatus`,
    method: 'POST',
    data: payload,
  });

  return data;
};

export const checkinVRAttendance = async (
  payload: IVrAttendanceCheckInPayload,
): Promise<IVrAttendanceCheckInResponse> => {
  const {data} = await FfthAPI().request<IVrAttendanceCheckInResponse>({
    url: `/timesheets/${payload.sessionId}/checkin`,
    method: 'PATCH',
    data: payload,
  });
  return data;
};

export const checkOutVRAttendance = async (
  payload: IVrAttendanceCheckOutPayload,
): Promise<IVrAttendanceCheckOutResponse> => {
  const {data} = await FfthAPI().request<IVrAttendanceCheckOutResponse>({
    url: `/timesheets/${payload.sessionId}/checkout`,
    method: 'PATCH',
    data: payload,
  });

  return data;
};
