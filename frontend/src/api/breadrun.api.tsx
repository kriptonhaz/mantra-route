import {GetDeliveryOrderProps, GetDeliveryResponseType} from '../interface/delivery.interface';
import FfthAPI from './base';

export const getDeliveryOrder = async (
  props?: GetDeliveryOrderProps,
): Promise<GetDeliveryResponseType> => {
  const {data} = await FfthAPI().request<GetDeliveryResponseType>({
    url: '/delivery-order',
    method: 'GET',
    params: {
      limit: props?.limit,
      page: props?.page,
      isUrgent: props?.isUrgent,
      status: JSON.stringify(props?.status),
      startDate: props?.startDate,
      endDate: props?.endDate,
      sort: props?.sort,
      bakeryName: props?.bakeryName,
      area: JSON.stringify(props?.area),
    },
  });

  return data;
};
