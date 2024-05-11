import {RouteZoneType} from './routes.interface';

export type sortType = 'asc' | 'desc';

export type DeliveryOrderStatusType =
  | 'Assigned'
  | 'Not Assigned'
  | 'Collected'
  | 'No Collection'
  | 'Delivered'
  | 'Cancelled'
  | 'Missed';

export type DeliveryOrderType = 'Scheduled' | 'Ad Hoc';

export interface CollectionPointType {
  id: string;
  name: string;
  address: string;
  lattitude: string;
  longitude: string;
  phone: string;
}

export interface DeliveryPointType {
  id: string;
  name: string;
  address: string;
  lattitude: string;
  longitude: string;
  phone: string;
  remarks?: string;
}

export interface UserDeliveryType {
  id: string;
  bakeryName: string;
  doNumber: string;
  date: string;
  time: string;
  collectionPoint: CollectionPointType[];
  deliveryPoint: DeliveryPointType[];
  deliveryOrderStatus: DeliveryOrderStatusType;
  isUrgent: boolean;
}

export type StatusDeliveryOrder =
  | 'Assigned'
  | 'Not Assigned'
  | 'Collected'
  | 'Partial Collected'
  | 'No Collection'
  | 'Delivered'
  | 'Cancelled'
  | 'Missed';

export type TypeDeliveryOrder = 'Scheduled' | 'Ad Hoc';
export type TypeStatusRoute = 'Pending' | 'Active' | 'Stop';

export type GetDeliveryOrderProps = {
  limit?: number;
  page?: number;
  isUrgent?: boolean;
  status?: Array<StatusDeliveryOrder>;
  startDate?: string;
  endDate?: string;
  sort?: sortType;
  bakeryName?: string;
  area?: Array<RouteZoneType>;
};

export type DeliveryOrderRecord = {
  attributes: {
    type: string;
    url: string;
  };
  Id: string;
  Name: string;
  Bakery_Name__c: string;
  Urgent__c: boolean;
  Delivery_Order_Status__c: StatusDeliveryOrder | null;
  Delivery_Order_Date__c: null;
  Delivery_Order_Type__c: TypeDeliveryOrder | null;
  Collection_Time_Start__c: string | null;
  Route_No__r: {
    attributes: {
      type: string;
      url: string;
    };
    Number_of_CP__c: number;
    Number_of_DP__c: number;
  };
  Volunteer_Name__c: string | null;
  DO_Items__r: {
    totalSize: number;
    done: boolean;
    records: DeliveryOrderItemRecord[];
  } | null;
};

export type DeliveryOrderItemRecord = {
  attributes: {
    type: string;
    url: string;
  };
  Collection_Point__r: {
    attributes: {
      type: string;
      url: string;
    };
    Name: string;
  };
};

export type GetDeliveryResponseType = {
  doData: {
    totalSize: number;
    done: boolean;
    records: DeliveryOrderRecord[];
  };
  metadata: {
    totalData: number;
    totalPage: number;
    currentPage: number;
  };
};

export type BillingAddressType = {
  city: string | null;
  country: string | null;
  geocodeAccuracy: string | null;
  latitude: string | null;
  longitude: string | null;
  postalCode: string | null;
  state: string | null;
  street: string | null;
};

export type DeliveryOrderItemDetailRecord = {
  Id: string;
  Collection_Point__c: string;
  Collection_Point__r: {
    Name: string;
    Phone__c: string;
    Image_Url__c: string | null;
    Zone__c: string;
    Unit_Number__c: string | null;
    BillingAddress: BillingAddressType | null;
    Latitude_Location__c: string | null;
    Longitude_Location__c: string | null;
    Instruction_to_Volunteer__c: string | null;
  };
  Delivery_Point__c: string;
  Delivery_Point__r: {
    Id: string;
    Name: string;
    Phone__c: string | null;
    Image_Url__c: string | null;
    Zone__c: string;
    Unit_Number__c: string | null;
    BillingAddress: BillingAddressType | null;
    Latitude_Location__c: string | null;
    Longitude_Location__c: string | null;
    Instruction_to_Volunteer__c: string | null;
  };
};

export type DeliveryOrderDetailResponseType = {
  detailOrder: {
    Id: string;
    Name: string;
    Urgent__c: boolean;
    Day_of_Collection__c: string;
    Delivery_Order_Status__c: StatusDeliveryOrder;
    Delivery_Order_Date__c: string;
    Delivery_Order_Type__c: TypeDeliveryOrder | null;
    Collection_Time_Start__c: string | null;
    Collection_Time_End__c: string | null;
    Route_No__c: string;
    Collection_Time__c: string | null;
    Route_No__r: {
      Id: string;
      Name: string;
      Route_Name__c: string;
      Route_Type__c: TypeDeliveryOrder;
      Route_Status__c: TypeStatusRoute;
      End_Date__c: string | null;
      Start_Date__c: string | null;
      Day_of_Week__c: string;
    };
    Volunteer_Name__c: null;
    Volunteer_Name__r: null | {
      Name: string;
    };
    DO_Items__r: {
      totalSize: number;
      done: boolean;
      records: DeliveryOrderItemDetailRecord[];
    };
  };
};

export type DoItemStatusType = 'Pending' | 'Not Collected' | 'Collected' | 'Delivered';
export type DoItemProgressType = {
  attributes: {
    type: string;
    url: string;
  };
  Id: string;
  DO_Item_Status__c: DoItemStatusType;
  Photo_Url_Buns__c: string | null;
  Photo_Url_Receiver__c: string | null;
  Receiver_s_Signature_Url__c: string | null;
  Delivery_Note__c: string | null;
  Collection_Note__c: string | null;
  No_Collection__c: boolean;
  No_of_Loaves__c: number | null;
  Loaves_Unit_Weight_kg__c: number | null;
  No_of_Buns__c: number | null;
  BunUnitWeight_kg__c: number | null;
  Delivered_Datetime__c: string | null;
  Collected_Datetime__c: string | null;
  Collection_Point__c: string;
  Collection_Point__r: {
    attributes: {
      type: string;
      url: string;
    };
    Id: string;
    Name: string;
    BillingAddress: BillingAddressType;
    Latitude_Location__c: string | null;
    Longitude_Location__c: string | null;
  };
  Delivery_Point__c: string;
  Delivery_Point__r: {
    attributes: {
      type: string;
      url: string;
    };
    Id: string;
    Name: string;
    BillingAddress: BillingAddressType;
    Latitude_Location__c: string;
    Longitude_Location__c: string;
  };
};
export type DeliveryOrderProgressResponseType = {
  attributes: {
    type: string;
    url: string;
  };
  Id: string;
  Name: string;
  Delivery_Order_Status__c: StatusDeliveryOrder | null;
  Delivery_Order_Type__c: TypeDeliveryOrder | null;
  Actual_Time_Collected__c: string | null;
  Actual_Time_Delivered__c: string | null;
  Assigned_Date__c: string | null;
  DO_Items__r: {
    totalSize: number;
    done: boolean;
    records: DoItemProgressType[];
  };
  Route_No__r: {
    Number_of_CP__c: number;
    Number_of_DP__c: number;
    attributes: {
      type: string;
      url: string;
    };
  };
};

export type UpdateStatusCollectionResponseType = {
  message: string;
  dataUpdate: {
    id: string;
    success: boolean;
    errors: [];
  };
};

export type UpdateStatusDeliveryResponseType = {
  message: string;
  dataUpdate: {
    id: string;
    success: boolean;
    errors: [];
  };
};

export type RouteStatusFilter = 'All Status' | 'Suspended' | 'Planned' | 'Active';

export type DayRangeFilter = 'Today' | 'This week' | 'This year' | 'Last week' | 'Last month';

export type ApplyFilterRoute = {
  sort: sortType;
  routeZone: Array<RouteZoneType>;
};

export type ApplyFilterDeliveries = {
  sort: sortType;
  dayRange: DayRangeFilter;
};
