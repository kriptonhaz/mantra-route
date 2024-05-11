import {MetaPaginationType, PaginationRequestType} from './base.interface';
export enum ESorting {
  ASC = 'ASC',
  DESC = 'DESC',
}
export type VolunteerType = 'Organisation' | 'Individual';
export type VrStatusType = 'Planned' | 'Open' | 'Closed' | 'Cancelled';
export enum EAssginedVolunteerStatus {
  SELECTED = 'Selected',
  CONTACTED = 'Contacted',
  REGISTERED = 'Registered',
  ACCEPTED = 'Accepted',
  REJECTED = 'Rejected',
  DECLINED = 'Declined',
  CANCELLED = 'Cancelled',
  WITHDRAWN = 'Withdrawn',
  SUSPENDED = 'Suspended',
}
export type VolunteerRequestItemType = {
  attributes: {
    type: string;
    url: string;
  };
  Id: string;
  OwnerId: string;
  IsDeleted: boolean;
  Name: string;
  RecordTypeId: string;
  CreatedDate: string;
  CreatedById: string;
  LastModifiedDate: string;
  LastModifiedById: string;
  SystemModstamp: string;
  LastActivityDate: null;
  LastViewedDate: string;
  LastReferencedDate: string;
  Assignment_Status__c: null;
  Cancel_Sent__c: boolean;
  Cancel_VR__c: boolean;
  Client_Satisfaction__c: null;
  End_Date__c: string;
  End_Time__c: null | string;
  Frequency_Type__c: null | string;
  Key_Objective__c: null;
  Location_Address__c: null;
  Location_Postal_Code__c: null;
  Minimum_Volunteer_Required__c: null;
  Number_of_Volunteers_Required__c: null | number;
  Outcome__c: null;
  Outcome_Remarks__c: null;
  Outcome_status__c: null;
  Participant_s_Role__c: null;
  Programme_Event__c: null;
  Programme_Stage__c: null;
  Programme_Title__c: null;
  URL__c: string;
  QR_Code__c: string;
  Reasons_to_Cancel__c: null;
  Reasons_to_Terminate__c: null;
  Request_Date__c: string;
  Request_status__c: null;
  Request_Title__c: null;
  Start_Date__c: string;
  Start_Time__c: null | string;
  Type_of_Request__c: null;
  Urgent_Request__c: boolean;
  Volunteer_Request_No__c: string;
  Volunteer_Satisfaction__c: null;
  Volunteering_Location__c: null;
  Volunteering_Role__c: null;
  VR_Record_Id__c: string;
  Total_Volunteers_Required__c: number;
  Year__c: string;
  Month__c: string;
  Volunteer_Type__c: VolunteerType;
  Description__c: string | null;
  Scheduled_Published_Date__c: string;
  Unpublished__c: boolean;
  VR_Status__c: VrStatusType | null;
  Introduction__c: null;
  Session_Picture__c: null;
  Available_Session__c: number;
  Other_Location__c: null;
  Stakeholder__c: null;
  Withdraw_Reason__c: null;
  RecordType: {
    attributes: {
      type: string;
      url: string;
    };
    Name: string;
  };
};

export type VolunteerRequestListType = {
  metaData: MetaPaginationType;
  volunteerRequests: VolunteerRequestItemType[];
};

export interface VrRequestType extends PaginationRequestType {
  search?: string;
  status?: string;
  name?: ESorting | '';
  date?: ESorting | '';
  startDate?: string;
  endDate?: string;
}

export interface VrDetailRequestType {
  idVr: string;
}

export interface VolunteerSessionDetailRequestType {
  sessionId: string;
}

export interface VrDetailResponseType {
  assignedVolunteer: [];
  isRegistred: boolean;
  volunteerRequest: VolunteerRequestItemType[];
}

export interface VrItemCalendar {
  Id: string;
  Name: string;
  Session_Title__c: string;
  Session_Date__c: string;
  Start_Time__c: string;
  Stakeholder__c: string;
}

export interface VrSessionCalendarResponseType {
  registred: VrItemCalendar[];
  unregistred: VrItemCalendar[];
}

export type SessionShiftType = 'Morning' | 'Afternoon';
export type SessionVrType = 'Regular' | 'Ad hoc';
export type SessionStatusType = 'Planned' | 'Opened' | 'Closed';
export type SessionLocationType = 'PR' | 'MP' | 'Other';
export type SessionVolunteerType = 'Individual' | 'Organisation';
export type SessionSignupStatusType =
  | 'Planned'
  | 'Opened'
  | 'Partially Filled'
  | 'Fully Filled'
  | 'Blocked'
  | 'Closed'
  | 'Cancelled';
export interface VrSessionItemType {
  attributes: {
    type: string;
    url: string;
  };
  Id: string;
  IsDeleted: boolean;
  Name: string;
  CreatedDate: string;
  CreatedById: string;
  LastModifiedDate: string;
  LastModifiedById: string;
  SystemModstamp: string;
  LastActivityDate: string | null;
  Session_Title__c: string;
  Blocked_Date__c: string | null;
  Session_Shift__c: SessionShiftType | null;
  Start_Time__c: string;
  End_Time__c: string;
  Session_Type__c: SessionVrType | null;
  Contact__c: string | null;
  Email__c: string | null;
  Phone__c: string | null;
  Session_Date__c: string;
  Session_Status__c: SessionStatusType | null;
  Sign_up_Volunteers__c: boolean;
  PlannedCapacity__c: boolean;
  Volunteer_Location__c: SessionLocationType | null;
  Cancelled_Date__c: string | null;
  Volunteer_Type__c: SessionVolunteerType | null;
  Sign_up__c: SessionSignupStatusType | null;
  Other_Location__c: string | null;
  Session_Picture__c: string | null;
  Volunteer_Request__c: string;
  Description__c: string | null;
  Contact_Person__c: string | null;
  Email_Contact_person__c: string | null;
  Phone_Contact_Person__c: string | null;
  Max_Num_of_Volunteer__c: number;
  Number_of_Sign_ups__c: number;
  Introduction__c: string | null;
  Stakeholder__c: string | null;
  Withdraw_Reason__c: string | null;
  URL__c: string;
  QR_Code__c: string;
  assignedVolunteerId: string | null;
  assigneeStatus: EAssginedVolunteerStatus | null;
}

export interface VrSessionListResponseType {
  volunteerRequest: string;
  volunteerSessions: VrSessionItemType[];
}

export interface VrSessionRegisterRequestType {
  idSession: string;
}
export interface VrSessionDetailResponse {
  isRegistred: boolean;
  volunteerSession: VolunteerSession;
  assignedVolunteers: any[];
  volunteerRequest: VolunteerRequest[];
}

export interface VolunteerRequest {
  attributes: Attributes;
  Id: string;
  OwnerId: string;
  IsDeleted: boolean;
  Name: string;
  RecordTypeId: string;
  CreatedDate: string;
  CreatedById: string;
  LastModifiedDate: string;
  LastModifiedById: string;
  SystemModstamp: string;
  LastActivityDate: null;
  LastViewedDate: null;
  LastReferencedDate: null;
  Assignment_Status__c: null;
  Cancel_Sent__c: boolean;
  Cancel_VR__c: boolean;
  Client_Satisfaction__c: null;
  End_Date__c: Date;
  End_Time__c: null;
  Frequency_Type__c: null;
  Key_Objective__c: null;
  Location_Address__c: null;
  Location_Postal_Code__c: null;
  Minimum_Volunteer_Required__c: null;
  Number_of_Volunteers_Required__c: null;
  Outcome__c: null;
  Outcome_Remarks__c: null;
  Outcome_status__c: null;
  Participant_s_Role__c: null;
  Programme_Event__c: null;
  Programme_Stage__c: null;
  Programme_Title__c: null;
  URL__c: string;
  QR_Code__c: string;
  Reasons_to_Cancel__c: null;
  Reasons_to_Terminate__c: null;
  Request_Date__c: Date;
  Request_status__c: null;
  Request_Title__c: null;
  Start_Date__c: Date;
  Start_Time__c: null;
  Type_of_Request__c: null;
  Urgent_Request__c: boolean;
  Volunteer_Request_No__c: string;
  Volunteer_Satisfaction__c: null;
  Volunteering_Location__c: null;
  Volunteering_Role__c: null;
  VR_Record_Id__c: string;
  Total_Volunteers_Required__c: number;
  Year__c: string;
  Month__c: string;
  Volunteer_Type__c: string;
  Description__c: null;
  Scheduled_Published_Date__c: Date;
  Unpublished__c: boolean;
  VR_Status__c: string;
  Introduction__c: null;
  Session_Picture__c: null;
  Available_Session__c: number;
  Other_Location__c: null;
  Stakeholder__c: null;
  Withdraw_Reason__c: null;
}

export interface Attributes {
  type: string;
  url: string;
}

export interface VolunteerSession {
  Id: string;
  Name: string;
  Volunteer_Request__r: VolunteerRequestR;
  Session_Title__c: string;
  Volunteer_Type__c: string;
  Session_Type__c: string;
  Volunteer_Location__c: string;
  Other_Location__c: null;
  Blocked_Date__c: null;
  Cancelled_Date__c: null;
  Stakeholder__r: null;
  Withdraw_Reason__c: null;
  Session_Date__c: Date;
  Session_Status__c: string;
  Sign_up__c: string;
  Session_Shift__c: string;
  Start_Time__c: string;
  End_Time__c: string;
  Max_Num_of_Volunteer__c: number;
  Number_of_Sign_ups__c: null;
  Introduction__c: null;
  Session_Picture__c: null;
  Description__c: null;
}

export interface VolunteerRequestR {
  attributes: Attributes;
  Id: string;
  Name: string;
}

export interface IAssignedVolunteerParams {
  assignedId: string;
}
export enum EAssigneeStatus {
  SELECTED = 'Selected',
  CONTACTED = 'Contacted',
  REGISTERED = 'Registered',
  ACCEPTED = 'Accepted',
  REJECTED = 'Rejected',
  DECLINED = 'Declined',
  CANCELLED = 'Cancelled',
  WITHDRAWN = 'Withdrawn',
  SUSPENDED = 'Suspended',
}
export interface IAssignedVolunteerResponse {
  Id: string;
  Name: string;
  Start_Date__c: Date;
  Start_Time__c: string;
  End_Date__c: Date;
  End_Time__c: string;
  Frequency__c: string;
  Assignee_Status__c: EAssigneeStatus;
  Volunteer_Request_Name__r: VolunteerRequestName;
  Volunteer_Sessions__r: VolunteerSessions;
}

export interface VolunteerRequestName {
  Name: string;
}

export interface VolunteerSessions {
  Volunteer_Location__c: string;
}

export interface IVolunteerInvitationForm {
  assignedId: string;
  status: EAssigneeStatus;
}
export interface IVolunteerInvitationResponse {
  message: string;
  submittedInvitation: SubmittedInvitation;
}

export interface SubmittedInvitation {
  id: string;
  success: boolean;
  errors: any[];
}

export interface IVRAttendanceInfoResponse {
  timesheetType: string;
  volunteerSession: VolunteerSession;
}

export interface VolunteerSession {
  attributes: Attributes;
  Id: string;
  Name: string;
  Volunteer_Request__r: VolunteerRequestR;
  Session_Title__c: string;
  Volunteer_Type__c: string;
  Session_Type__c: string;
  Volunteer_Location__c: string;
  Other_Location__c: null;
  Session_Date__c: Date;
  Start_Time__c: string;
  End_Time__c: string;
  Session_Shift__c: string;
  Session_Status__c: string;
  Sign_up__c: string;
}

export interface VolunteerRequestR {
  attributes: Attributes;
  Id: string;
  Name: string;
}

export interface Attributes {
  type: string;
  url: string;
}

export interface IVrAttendanceCheckinStatusPayload {
  sessionId: string;
  email: string;
}

export interface IVrAttendanceCheckinStatusResponse {
  canCheckIn: boolean;
  attendances: IAttendance[];
}

export interface IAttendance {
  attributes: Attributes;
  Id: string;
  Assigned_Volunteer__c: string;
  Checked_In__c: string;
  Checked_Out__c: string;
  End_Date__c: Date;
  End_Time__c: string;
  Start_Time__c: string;
  Start_Date__c: Date;
  Volunteer_Request__c: string;
  Volunteer_Session__c: string;
  Checked_IN_OUT_Status__c: string;
}

export interface Attributes {
  type: string;
  url: string;
}

export interface IVrAttendanceCheckInPayload {
  sessionId: string;
  email: string;
}
export interface IVrAttendanceCheckInResponse {
  message: string;
  attendance: IAttendance;
}

export interface IVrAttendanceCheckOutPayload {
  sessionId: string;
  email: string;
}
export interface IVrAttendanceCheckOutResponse {
  message: string;
  attendance: IAttendance;
}
