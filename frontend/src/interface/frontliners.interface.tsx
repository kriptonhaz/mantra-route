import {MetaPaginationResponseType} from './base.interface';

export interface IFrontliner {
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

export type FrontlinerResponseType = {
  code: number;
  data: IFrontliner[];
  message: string;
  meta: MetaPaginationResponseType;
  status: number;
};

export type FrontlinerAddResponseType = {
  code: number;
  data: IFrontliner[];
  message: string;
  meta: number;
  status: number;
};
