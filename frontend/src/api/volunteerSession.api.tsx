import {
  IBulkInsertAssignedVolunteerPayload,
  IBulkInsertAssignedVolunteerResponse,
  IDeleteVolunteerSessionPayload,
  IDeleteVolunteerSessionResponse,
  IInsertVolunteerSessionPayload,
  IInsertVolunteerSessionResponse,
  IListVolunteerSessionResponse,
  IRegisterSessionVR,
  ISubmitScheduleForm,
  IUpdateVolunteerSessionPayload,
  IUpdateVolunteerSessionResponse,
  IUploadVolunteersOrgForm,
  IUploadVolunteersOrgResponse,
  IWithdrawRegularVRPayload,
  IWithdrawRegularVRResponse,
  VolunteerSession,
} from '@/interface/volunteerSession.interface';
import FfthAPI from './base';

export const submitGenerateSession = async (
  payload: ISubmitScheduleForm,
): Promise<IListVolunteerSessionResponse> => {
  const {data} = await FfthAPI().request<IListVolunteerSessionResponse>({
    url: `/volunteerSessions/bulkInsert`,
    method: 'POST',
    data: payload,
  });

  return data;
};

export const getAllVolunteerRequestSessionAdmin = async (props: {
  year?: number;
  month?: number;
}): Promise<{volunteerSessions: VolunteerSession[]}> => {
  const {data} = await FfthAPI().request<{volunteerSessions: VolunteerSession[]}>({
    url: `/volunteerSessions/admin`,
    method: 'GET',
    params: props,
  });

  return data;
};

export const getAllVolunteerOnSessions = async (
  sessionId: string,
): Promise<IListVolunteerSessionResponse> => {
  const {data} = await FfthAPI().request<IListVolunteerSessionResponse>({
    url: `/volunteerSessions/${sessionId}`,
    method: 'GET',
  });

  return data;
};

export const submitAddVolunteerSessionForm = async (
  payload: IInsertVolunteerSessionPayload,
): Promise<IInsertVolunteerSessionResponse> => {
  const {data} = await FfthAPI().request<IInsertVolunteerSessionResponse>({
    url: `/volunteerSessions/${payload.sessionId}/volunteers`,
    method: 'POST',
    data: payload,
  });

  return data;
};
export const insertAVolunteerSessionForm = async (
  payload: IInsertVolunteerSessionPayload,
): Promise<IInsertVolunteerSessionResponse> => {
  const {data} = await FfthAPI().request<IInsertVolunteerSessionResponse>({
    url: `/volunteerSessions/${payload.sessionId}/volunteer`,
    method: 'POST',
    data: payload,
  });

  return data;
};

export const bulkInsertAssignedVolunteerForm = async (
  payload: IBulkInsertAssignedVolunteerPayload,
): Promise<IBulkInsertAssignedVolunteerResponse> => {
  const {data} = await FfthAPI().request<IBulkInsertAssignedVolunteerResponse>({
    url: `/volunteerSessions/${payload.sessionId}/volunteers`,
    method: 'POST',
    data: payload,
  });
  return data;
};

export const deleteVolunteerSession = async (
  payload: IDeleteVolunteerSessionPayload,
): Promise<IDeleteVolunteerSessionResponse> => {
  const {data} = await FfthAPI().request<IDeleteVolunteerSessionResponse>({
    url: `/volunteerSessions/volunteer`,
    method: 'DELETE',
    data: payload,
  });

  return data;
};

export const updateVolunteerSession = async (
  payload: IUpdateVolunteerSessionPayload,
): Promise<IUpdateVolunteerSessionResponse> => {
  const {data} = await FfthAPI().request<IUpdateVolunteerSessionResponse>({
    url: `/volunteerSessions/volunteer/${payload.assignedId}`,
    method: 'PATCH',
    data: payload,
  });

  return data;
};

export const registerSessionVR = async (sessionId: string): Promise<IRegisterSessionVR> => {
  const {data} = await FfthAPI().request<IRegisterSessionVR>({
    url: `/volunteerSessions/${sessionId}/register`,
    method: 'POST',
  });

  return data;
};

export const withdrawRegularVR = async (
  payload: IWithdrawRegularVRPayload,
): Promise<IWithdrawRegularVRResponse> => {
  const {data} = await FfthAPI().request<IWithdrawRegularVRResponse>({
    url: `/volunteerSessions/${payload.sessionId}/withdrawn`,
    method: 'PATCH',
    data: payload,
  });

  return data;
};

export const uploadVolunteersOrg = async (
  payload: IUploadVolunteersOrgForm,
): Promise<IUploadVolunteersOrgResponse> => {
  const {data} = await FfthAPI().request<IUploadVolunteersOrgResponse>({
    url: `/volunteerRequests/${payload.vrId}/upload`,
    method: 'POST',
    data: payload,
  });

  return data;
};
