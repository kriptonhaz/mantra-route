import {IVolunteerYourDetailResponse, IYourDetailsForm} from '@/interface/volunteer.interface';
import FfthAPI from './base';
import {IGetYourDetailsDataResponse} from '@/interface/volunteer-form.interface';

export const getYourDetailsDataData = async (
  contactId: string,
): Promise<IGetYourDetailsDataResponse> => {
  const {data} = await FfthAPI().request<IGetYourDetailsDataResponse>({
    url: `/contacts/${contactId}`,
    method: 'GET',
  });

  return data;
};

export const submitVolunteerYourDetailsForm = async (
  payload: IYourDetailsForm,
): Promise<IVolunteerYourDetailResponse> => {
  const {data} = await FfthAPI().request<IVolunteerYourDetailResponse>({
    url: `/contacts/${payload.query || ''}`,
    method: 'POST',
    data: payload,
  });

  return data;
};
