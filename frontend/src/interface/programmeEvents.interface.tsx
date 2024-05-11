import {MetaPaginationType, PaginationRequestType} from './base.interface';

export type AttireType = 'Casual' | 'Smart Casual' | 'Other';
export type FrequencyType = 'Ad-hoc' | 'Weekly' | 'Fortnightly' | 'Monthly';
export type StageType = 'Planned' | 'Started' | 'Ended' | 'Completed' | 'Cancelled';
export enum ESorting {
  ASC = 'ASC',
  DESC = 'DESC',
}
export type ParticipantStatusType =
  | 'Selected'
  | 'Invitation Sent'
  | 'Registered'
  | 'Accepted'
  | 'Declined'
  | 'Attended'
  | 'Absent'
  | 'Cancel'
  | 'Withdraw';
export type ProgrammeEventsItemType = {
  End_Date_Time__c: string;
  Engagement_Type__c: null;
  Event_Attire__c: AttireType | null;
  Frequency__c: FrequencyType | null;
  Id: string;
  Name: string;
  Photo_Url__c: string | null;
  Programme_Description__c: string;
  Programme_Event_No__c: string;
  Programme_Stage__c: StageType | null;
  Programme_Title__c: string | null;
  Reasons_to_Cancel__c: string | null;
  Scheduled_Publish_Date__c: string | null;
  Start_Date_Time__c: string;
  Venue_of_Event_or_Mobilisation__c: string;
  Volunteer_Reporting_Venue__c: string | null;
};

export type ProgrammeEventListType = {
  programmeDatas: ProgrammeEventsItemType[];
  metaData: MetaPaginationType;
};

export interface ProgrammeEventRequestType extends PaginationRequestType {
  search?: string;
  status?: string[];
  name?: ESorting | '';
  date?: ESorting | '';
  startDate?: string;
  endDate?: string;
}

export interface ProgrammeEventDetailRequestType {
  idProgramme: string;
}

export interface ParticipantType {
  attributes: {
    type: string;
    url: string;
  };
  Id: string;
  Participant_Name__r: {
    Name: string;
  };
  Status__c: ParticipantStatusType | null;
  Withdraw_date__c: string | null;
  Cancellation_Date__c: string | null;
  Programme_Event__c: string;
  CreatedDate: string | null;
  LastModifiedDate: string | null;
}

export interface ProgrammeEventDetailResponseType {
  programmeEvent: {
    attributes: {
      type: string;
      url: string;
    };
    Id: string;
    Name: string;
    Engagement_Type__c: string | null;
    Frequency__c: FrequencyType | null;
    Programme_Description__c: string | null;
    Event_Attire__c: AttireType | null;
    Event_Attire_Other__c: string;
    Venue_of_Event_or_Mobilisation__c: string | null;
    Volunteer_Reporting_Venue__c: string | null;
    Scheduled_Publish_Date__c: string | null;
    Programme_Title__c: string | null;
    Reasons_to_Cancel__c: string | null;
    Programme_Stage__c: StageType | null;
    Start_Date_Time__c: string;
    End_Date_Time__c: string;
    Programme_Event_No__c: string;
    Introduction__c: string | null;
  };
  participantData: ParticipantType | null;
}

export interface ProgrammeEventRegisterResponseType {
  message: string;
  regis: {
    id: string;
    success: boolean;
    errors: [];
  };
}

export interface ProgrammeEventCancelWithdrawRequestType {
  programmeEventID: string;
  participantId: string;
  status: 'cancel' | 'withdraw';
}

export interface ProgrammeEventCancelWithdrawResponseType {
  message: string;
  update: {
    id: string;
    success: boolean;
    errors: [];
  };
}

export interface ProgrammeEventUpcomingResponseType {
  programmeEvents: ProgrammeEvent[];
}

export interface ProgrammeEventVrUpcomingResponseType {
  requestAndEventDatas: Array<PeUpcomingItem | VrRegularItem | VrSessionItem>;
}

export type UpcomingType =
  | 'Programme_Events__c'
  | 'Volunteer_Request__c'
  | 'VolSessions__c'
  | 'Participants__c';

export interface PeUpcomingItem {
  attributes: {
    type: UpcomingType;
    url: string;
  };
  Id: string;
  Name: string;
  Programme_Description__c: string;
  Scheduled_Publish_Date__c: string;
  Programme_Title__c: null | string;
  Programme_Stage__c: string;
  Start_Date__c: string;
  Start_Date_Time__c: string;
  End_Date_Time__c: string;
}

export interface VrRegularItem {
  attributes: {
    type: UpcomingType;
    url: string;
  };
  Id: string;
  Name: string;
  Start_Date__c: string;
  Minimum_Volunteer_Required__c: null | number;
  Number_of_Volunteers_Required__c: null | number;
  Total_Volunteers_Required__c: number;
  Stakeholder__c: null | string;
}

export interface VrSessionItem {
  attributes: {
    type: UpcomingType;
    url: string;
  };
  Id: string;
  Name: string;
  Session_Title__c: string;
  Session_Date__c: string;
  Start_Time__c: string;
  Stakeholder__c: null | string;
  Sign_up__c: string;
  Start_Date__c: string;
}

export interface ProgrammeEvent {
  attributes: Attributes;
  Id: string;
  Name: string;
  Start_Date_Time__c: string;
  Programme_Event__r: ProgrammeEventR;
  Programme_Events__c: string;
}

export interface ProgrammeEventR {
  Name: string;
  Start_Date_Time__c: string;
}

export interface Attributes {
  type: string;
  url: string;
}

export interface ICheckEmailPEPayload {
  programmeId: string;
  email: string;
}
export interface ICheckEmailPEResponse {
  Id: string;
  Programme_Event__c: string;
  Status__c: ParticipantStatusType;
  Participant_Name__r: IParticipantNameR;
}

export interface IParticipantNameR {
  attributes: Attributes;
  Id: string;
  Name: string;
  Email: string;
}

export interface ICheckinAttendancePEPayload {
  participantId: string;
}

export interface ICheckinAttendancePEResponse {
  message: string;
  checkIn: {
    id: string;
    success: boolean;
    errors: any[];
  };
}

export interface IGetAllParticipantsParams extends PaginationRequestType {
  status: ParticipantStatusType[];
}

export interface IGetAllParticipantsResponse {
  participants: IParticipant[];
  metadata: {
    page: string;
    totalPage: number;
    totalData: number;
  };
}

export interface IParticipant {
  attributes: Attributes;
  Id: string;
  Start_Date_time__c: string;
  End_Date_time__c: null;
  End_Date_Time_Formula__c: string;
  Status__c: string;
  Participant_Name__r: {
    attributes: Attributes;
    Id: string;
    LastName: string;
    Name: string;
  };
  Programme_Event__r: {
    attributes: Attributes;
    Id: string;
    Name: string;
  } | null;
}
