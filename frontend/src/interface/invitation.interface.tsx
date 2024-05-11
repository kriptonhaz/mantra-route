import {StageType} from './programmeEvents.interface';

export type EventStatusType =
  | 'Selected'
  | 'Invitation Sent'
  | 'Registered'
  | 'Accepted'
  | 'Declined'
  | 'Completed'
  | 'Absent'
  | 'Cancel'
  | 'Withdraw';
export enum EParticipantStatus {
  UPCOMING = 'Upcoming',
  SELECTED = 'Selected',
  INVITATION_SENT = 'Invitation Sent',
  ASSIGNED = 'Assigned',
  REGISTERED = 'Registered',
  ATTENDED = 'Attended',
  ACCEPTED = 'Accepted',
  CANCEL = 'Cancel',
  ABSENT = 'Absent',
  DECLINED = 'Declined',
  WITHDRAW = 'Withdraw',
}
export interface InvitationEventRequestType {
  idParticipant: string;
}

export interface IProgrammeResponse {
  Name: string;
  Start_Date_Time__c: string;
  End_Date_Time__c: string;
  Frequency__c: null;
  Programme_Stage__c: string;
}

export interface EventRequestType {
  idEvent: string;
}

export interface ProgrammeRequestType {
  idProgramme: string;
}

export interface CheckinInput {
  email: string | '';
}

export interface InvitationEventResponseType {
  Id: string;
  Name: string;
  Status__c: EParticipantStatus;
  Participant_Name__r: {
    Id: string;
    Name: string;
  };
  Programme_Event__r: {
    Id: string;
    Name: string;
    Start_Date_Time__c: string;
    End_Date_Time__c: string;
    Venue_of_Event_or_Mobilisation__c: string;
    Programme_Stage__c: StageType | null;
    Programme_Description__c: string;
  };
}
export interface EventResponseType {
  attributes: {
    type: string;
    url: string;
  };
  WhoId: string;
  Who: {
    attributes: {
      type: string;
      url: string;
    };
    Name: string;
  };
  Subject: string;
  EndDateTime: string;
  StartDateTime: string;
  Location: string;
  Event_Status__c: EventStatusType | null;
}

export interface RegisterWithdrawInvitationRequestType {
  programmeEventID: string;
  participantID: string;
  status: EParticipantStatus;
}

export interface AcceptDeclineEventRequestType {
  eventID: string;
  status: 'Accepted' | 'Declined';
}

export interface AcceptDeclineEventResponseType {
  message: string;
  submit: GeneralResponseType;
}

export interface GeneralResponseType {
  id: string;
  success: string;
  errors: [];
}

export interface CheckinRequestType {
  email: string;
  programmeEventID: string;
}

export interface CheckinRegularRequestType {
  email: string;
  eventID: string;
}
export interface CheckinRegularInputType {
  email: string;
}

export interface CheckinResponseType {
  message: string;
  checkIn: GeneralResponseType;
}
