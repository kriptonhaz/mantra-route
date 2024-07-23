import {MetaPaginationResponseType} from './base.interface';

export enum ModeAddEnum {
  'single',
  'bulk',
}
export type TypeModeAdd = keyof typeof ModeAddEnum;

export interface IOutlets {
  outlet_id: string;
  name: string;
  must_visit_day: string | '';
  cycle: number;
  interval: number;
  frontliner_external_id: string;
  off_day: string | '';
  latitude: number;
  longitude: number;
  company: string;
}

export interface IFormAddOutlet extends IOutlets {
  modeAdd: TypeModeAdd;
  csvFile: File;
}

export interface IOutletsResponseData extends IOutlets {
  create_date: string;
  delete_date: string;
  generated_counter: number;
  id: string;
  is_active: number;
  must_visit_day: string;
  next_available_at: string;
}

export interface IOutletsCsv {
  'Outlet ID': string;
  Outlet: string;
  'must visit day': string;
  cycle: string;
  'Interval(jeda kunjungan)': string;
  'ID Frontliner': string;
  'toko tutup': string;
  Latitude: string;
  Longitude: string;
}

export type IOutletRequestType = {
  companyId: string;
  page?: number;
  per_page?: number;
};

export type IOutletResponseType = {
  code: number;
  data: IOutletsResponseData[];
  message: string;
  meta: MetaPaginationResponseType;
  status: number;
};

export type IOutletAddResponseType = {
  code: number;
  data: IOutlets[];
  message: string;
  meta: number;
  status: number;
};

export interface IOutletDeleteResponseType {
  code: number;
  data: null;
  message: string;
  meta: number;
  status: number;
}
