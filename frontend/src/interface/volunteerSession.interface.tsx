export interface ISubmitGeneratedEvent {
  activityType: string;
  assignedVolunteer: number;
  backgroundColor: string;
  date: string;
  end_time: string;
  id: number;
  numberSession: string;
  numberVolunteer: string;
  schedule_type: string;
  session: string;
  start_time: string;
  textColor: string;
  title: string;
  volunteer_loc: string;
  volunteer_type: string;
}

export interface ISubmitScheduleForm {
  sessions: ISubmitGeneratedEvent[];
}

export interface IListVolunteerSessionResponse {
  isRegistred: boolean;
  volunteerSession: VolunteerSession;
  assignedVolunteers: IAssignedVolunteer[];
  volunteerRequest: VolunteerRequest[];
}

export interface IAssignedVolunteer {
  attributes: Attributes;
  Id: string;
  Volunteer_Name__r: VolunteerNameR;
  Assignee_Status__c: string;
}

export interface VolunteerNameR {
  attributes: Attributes;
  Id: string;
  Name: string;
  Email: string;
  MobilePhone: string;
}

export interface Attributes {
  type: string;
  url: string;
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
  Number_of_Sign_ups__c: number;
  Introduction__c: null;
  Session_Picture__c: null;
  Description__c: null;
  Company_Name__c: null | string;
  Name_Booked_by__c: null | string;
}

export interface VolunteerRequestR {
  attributes: Attributes;
  Id: string;
  Name: string;
}

export interface IInsertVolunteerSessionPayload {
  email: string;
  sessionId: string;
  name: string;
  mobileNo: string;
}
export interface IInsertVolunteerSessionResponse {
  message: string;
  newVolunteer: NewVolunteer;
}

export interface NewVolunteer {
  id: string;
  success: boolean;
  errors: any[];
}

export interface IAssignedVolunteerCSVFormat {
  Fullname: string;
  Email: string;
  Mobile: string;
}
export interface IBulkInsertAssignedVolunteerPayload {
  sessionId: string;
  upload: IAssignedVolunteerCSVFormat[];
  update: IAssignedVolunteerCSVFormat[];
}

export interface IBulkInsertAssignedVolunteerResponse {
  message: string;
  newVolunteer: {id: string; success: boolean; errors: any[]}[];
}

export interface IDeleteVolunteerSessionPayload {
  assignedId: string;
}

export interface IDeleteVolunteerSessionResponse {
  message: string;
  deletedVolunteer: DeletedVolunteer;
}

export interface DeletedVolunteer {
  id: string;
  success: boolean;
  errors: any[];
}

export interface IUpdateVolunteerSessionPayload {
  assignedId: string;
  email: string;
  name: string;
  mobileNo: string;
}

export interface IUpdateVolunteerSessionResponse {
  message: string;
  updateVolunteer: Update;
  updateContact: Update;
}

export interface Update {
  id: string;
  success: boolean;
  errors: any[];
}

export interface IRegisterRegularVRResponse {}
export interface IRegisterSessionVR {
  message: string;
}

export interface IWithdrawRegularVRPayload {
  vrId: string;
  sessionId: string;
  reason: string;
}

export interface IWithdrawRegularVRResponse {
  message: string;
  volunteerRequest: string;
  reason: string;
}

interface IVolunteerItem {
  Fullname: string;
  Email: string;
  Mobile: string;
}
export interface IUploadVolunteersOrgForm {
  vrId: string;
  upload: IVolunteerItem[];
  update: string[];
}
export interface IUploadVolunteersOrgResponse {}
