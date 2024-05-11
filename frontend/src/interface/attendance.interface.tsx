export interface ListAttendanceRequestType {
  limit: number;
  page: number;
}

export interface Attendance {
  attributes: Attributes;
  Id: string;
  OwnerId: string;
  IsDeleted: boolean;
  Name: string;
  CreatedDate: string;
  CreatedById: string;
  LastModifiedDate: string;
  LastModifiedById: string;
  SystemModstamp: string;
  Assigned_Volunteer__c: string;
  Checked_In__c: string;
  Checked_Out__c: string;
  End_Date__c: Date | null;
  End_Time__c: null;
  Start_Date__c: Date;
  Start_Time__c: null;
  Volunteer_Request__c: string;
  Contact__c: string;
  Contact__r: ContactR;
  General_Remarks__c: null;
  Generate_by_Scheduler__c: boolean;
  Volunteer_Session__c: null;
  Checked_IN_OUT_Status__c: string;
  Volunteer_Request__r: VolunteerRequestR;
  Volunteer_Session__r: VolunteerSessionR;
}

export interface ContactR {
  Id: string;
  Name: string;
  attributes: {
    type: string;
    url: string;
  };
}

export interface VolunteerRequestR {
  attributes: Attributes;
  Id: string;
  Name: string;
  Volunteer_Type__c: string;
  RecordType: RecordType;
}
export interface VolunteerSessionR {
  attributes: Attributes;
  Id: string;
  Name: string;
  Session_Title__c: string;
  RecordType: RecordType;
}

export interface RecordType {
  attributes: Attributes;
  Name: string;
}

export interface Attributes {
  type: string;
  url: string;
}

export interface MetaData {
  totalRecords: number;
  totalPages: number;
  currentPage: number;
}

export interface ListAttendanceResponseType {
  attendances: Attendance[];
  metaData: MetaData;
}

export interface TotalAttendanceType {
  attendances: number;
}
