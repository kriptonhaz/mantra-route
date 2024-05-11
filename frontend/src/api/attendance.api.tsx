import {
  ListAttendanceRequestType,
  ListAttendanceResponseType,
  TotalAttendanceType,
} from '@/interface/attendance.interface';
import FfthAPI from './base';

export const getListAttendances = async (
  props: ListAttendanceRequestType,
): Promise<ListAttendanceResponseType> => {
  const {data} = await FfthAPI().request<ListAttendanceResponseType>({
    url: `/attendances`,
    method: 'GET',
    data: null,
    params: props,
  });

  return data;
};

export const getTotalAttendance = async (): Promise<TotalAttendanceType> => {
  const {data} = await FfthAPI().request<TotalAttendanceType>({
    url: '/attendances/total-attendance',
    method: 'GET',
  });

  return data;
};
