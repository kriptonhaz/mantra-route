import {MetaPaginationResponseType} from './base.interface';

export interface IOutlets {
  company: string;
  create_date: string;
  cycle: number;
  delete_date: string;
  frontliner_external_id: string;
  generated_counter: number;
  id: string;
  interval: number;
  is_active: number;
  latitude: number;
  longitude: number;
  must_visit_day: string;
  name: string;
  next_available_at: string;
  off_day: string;
  outlet_id: string;
  update_date: string;
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
  data: IOutlets[];
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
