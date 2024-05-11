import {PaginationRequestType} from './base.interface';

export interface NotificationType {
  id: string;
  title: string;
  datetime: string;
  isRead: boolean;
}

export interface GetListNotifProps extends PaginationRequestType {
  search?: string;
  status?: string;
}

export type NotifDataType = {
  Id: string;
  OwnerId: string;
  IsDeleted: boolean;
  Name: string;
  CreatedDate: string;
  CreatedById: string;
  LastModifiedDate: string;
  LastModifiedById: string;
  SystemModstamp: string;
  LastActivityDate: null;
  Delivery_Order__c: string | null;
  Route__c: string | null;
  Assigned_Volunteer__c: null;
  Contact__c: string;
  Title__c: string;
  Subtitle__c: string | null;
  Body__c: string;
  isReadNotification__c: boolean;
};

export type ListNotificationResponseType = {
  metaData: {
    totalData: number;
    totalPage: number;
    currentPage: number;
  };
  notifData: NotifDataType[];
};

export type MarkReadNotifProps = {
  notifId: string;
};

export type UnreadNotifResponseType = {
  unreadMessage: number;
};
