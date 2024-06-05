import {MetaPaginationResponseType} from './base.interface';

export interface IOutlets {
  outlet_id: string;
  outlet: string;
  must_visit_day: string;
  cycle: number;
  interval: number;
  frontliner_external_id: string;
  off_day: string;
  latitude: number;
  longitude: number;
  company: string;
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

export type OutletRequestType = {
  companyId: string;
  page?: number;
  per_page?: number;
};

export type OutletResponseType = {
  code: number;
  data: IOutlets[];
  message: string;
  meta: MetaPaginationResponseType;
  status: number;
};

export type OutletAddResponseType = {
  code: number;
  data: IOutlets[];
  message: string;
  meta: number;
  status: number;
};
