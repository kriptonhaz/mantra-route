import {MetaPaginationResponseType} from './base.interface';

export enum ModeAddEnum {
  'single',
  'bulk',
}
export type TypeModeAdd = keyof typeof ModeAddEnum;

export interface IFormSingleAddFrontliner {
  frontliner_id: string;
  name: string;
  company: string;
  position: string;
  id_project: string;
  latitude: number;
  longitude: number;
  max_visit_per_day: number;
  off_day: string;
  channel_outlet: string;
  max_travel_time: number;
  max_duration_visit: number;
}
export interface IFormAddFrontliner extends IFormSingleAddFrontliner {
  modeAdd: TypeModeAdd;
  csvFile: File;
}
export interface IFrontliner {
  frontliner_id: string;
  name: string;
  // company: string;
  position: string;
  id_project: string;
  latitude: number;
  longitude: number;
  max_visit_per_day: number;
  off_day: string;
  // channel_outlet: string;
  max_travel_time: number;
  max_duration_visit: number;
}

export interface IFrontlinerCsv {
  'Frontliner ID': string;
  Name: string;
  Position: string;
  'ID Project': string;
  Latitude: string;
  Longitude: string;
  'Max Visit Per Day': string;
  'Off Day': string;
  'Channel Outlet': string;
  'Max Travel Time': string;
  'Max Duration Visit': string;
}

export type FrontlineRequestType = {
  companyId: string;
  page?: number;
  per_page?: number;
};

export interface IFrontlinerResponseData extends IFrontliner {
  id: string;
  create_date: string;
  delete_date: string;
  is_active: number;
  update_date: string;
}

export type FrontlinerResponseType = {
  code: number;
  data: IFrontlinerResponseData[];
  message: string;
  meta: MetaPaginationResponseType;
  status: number;
};

export interface IAddSingleFrontlineResponse {
  code: number;
  data: IFormSingleAddFrontliner & {
    create_date: string;
    delete_date: string;
    is_active: number;
    update_date: string;
  };
  message: string;
  meta: number;
  status: number;
}

export type FrontlinerAddResponseType = {
  code: number;
  data: IFrontliner[];
  message: string;
  meta: number;
  status: number;
};

export type AddBulkFrontlinePayloadType = IFrontliner[];

export interface IFrontlinerDeleteResponse {
  code: number;
  data: null;
  message: string;
  meta: number;
  status: number;
}
