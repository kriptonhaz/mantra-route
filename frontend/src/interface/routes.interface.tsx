export type RouteScheduleType = 'Scheduled' | 'Ad hoc';
export type RouteStatusType = 'Pending' | 'Active' | 'Stop' | 'Ad-Hoc';
export type AssignedVolunteerStatusType =
  | 'Selected'
  | 'Contacted'
  | 'Registered'
  | 'Accepted'
  | 'Rejected'
  | 'Cancelled'
  | 'Withdrawn'
  | 'Suspended';
export type RouteZoneType = 'North' | 'South' | 'West' | 'East' | 'Central';

export interface RouteType {
  id: string;
  routeNo: string;
  routeType: RouteScheduleType;
  routeName: string;
  routeDay: string;
  routeStatus: RouteStatusType;
  description?: string | null;
  remarks?: string | null;
}

export interface RouteItemRecords {
  attributes: {
    type: string;
    url: string;
  };
  Id: string;
  Name: string;
  Collection_Point__r: {
    attributes: {
      type: string;
      url: string;
    };
    Name: string;
  };
}
export interface RouteItem {
  status: string;
  value: RecordMyRoute;
}

export type GetRoutePropsType = {
  sort?: string;
  bakeryName?: string;
  status?: string;
  area?: Array<RouteZoneType>;
};

export interface GetRouteResponseType {
  myRoute: {
    currentPage: number;
    totalPage: number;
    totalRecords: number;
    filteredResult: RouteItem[];
  };
}

export interface RecordMyRoute {
  Id: string;
  Name: string;
  Day_of_Week__c: string;
  Route_Type__c: RouteScheduleType;
  Collection_Points__r: {
    totalSize: number;
    done: boolean;
    records: RouteItemRecords[];
  };
}
export interface GetMyRouteResponseType {
  route: {
    currentPage: number;
    totalPages: number;
    totalRecords: number;
    routes: RecordMyRoute[];
  };
}

export interface RecordDetailCpType {
  attributes: {
    type: string;
    url: string;
  };
  Id: string;
  Name: string;
  Special_Instruction__c: string | null;
  Collection_Time_End__c: string;
  Collection_Time_Start__c: string;
  Mobile_Phone__c: string | null;
  Collection_Point__r: {
    attributes: {
      type: string;
      url: string;
    };
    Id: string;
    Name: string;
    Latitude_Location__c: string;
    Longitude_Location__c: string;
    Phone__c: string | null;
    DayOfWeek__c: string | null;
  };
  Contact_Person__r: {
    attributes: {
      type: string;
      url: string;
    };
    Name: string;
  };
}

export interface RecordDetailDpType {
  attributes: {
    type: string;
    url: string;
  };
  Id: string;
  Name: string;
  Start_Date__c: string | null;
  End_Date__c: string | null;
  Mobile_Phone__c: string | null;
  Special_Instruction__c: string | null;
  Delivery_Point__r: {
    attributes: {
      type: string;
      url: string;
    };
    Id: string;
    Name: string;
    Latitude_Location__c: string;
    Longitude_Location__c: string;
    BillingAddress: {
      city: string | null;
      country: string | null;
      geocodeAccuracy: string | null;
      latitude: string | null;
      longitude: string | null;
      postalCode: string | null;
      state: string | null;
      street: string | null;
    };
  };
  Contact_Person__r: {
    attributes: {
      type: string;
      url: string;
    };
    Name: string;
  };
}

export interface RecordDetailAssignedVolunteerType {
  attributes: {
    type: string;
    url: string;
  };
  Id: string;
  Name: string;
  Assignee_Status__c: AssignedVolunteerStatusType;
  Volunteer_Name__c: string;
  Volunteer_Name__r: {
    attributes: {
      type: string;
      url: string;
    };
    Name: string;
  };
}
export interface GetRouteDetailResponseType {
  detail: {
    routeData: {
      attributes: {
        type: string;
        url: string;
      };
      Id: string;
      Name: string;
      Campaign__c: string | null;
      Start_Date__c: string;
      End_Date__c: string;
      Route_Status__c: RouteStatusType;
      Day_of_Week__c: string;
      Collection_Day__c: string | null;
      Collection_Time__c: string | null;
      Route_Type__c: RouteScheduleType;
      Collection_Points__r: {
        totalSize: number;
        done: boolean;
        records: RecordDetailCpType[];
      };
      Delivery_Point__r: {
        totalSize: 1;
        done: true;
        records: RecordDetailDpType[];
      };
      Assigned_Volunteers__r: {
        totalSize: 1;
        done: true;
        records: RecordDetailAssignedVolunteerType[];
      } | null;
    };
  };
}

export interface GetAvailableRouteDayResponse {
  availableDay: string;
}

export interface ApplyRouteProps {
  routeId: string;
  dayOfWeek: string[];
}
