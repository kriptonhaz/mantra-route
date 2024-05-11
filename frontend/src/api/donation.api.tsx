import {
  IChangePaymentMethodDonationForm,
  IChangePaymentMethodDonationFormResponse,
  IDonationForm,
  IDonationFormResponse,
  IUpdateDonationStatusForm,
  IUpdateDonationStatusResponse,
} from '@/interface/donation.inteface';
import FfthDonationsAPI from './donation.base';

export const submitDonationForm = async (
  payload: IDonationForm,
): Promise<IDonationFormResponse> => {
  if (!payload.donationID) {
    const {data} = await FfthDonationsAPI().request<IDonationFormResponse>({
      url: '/donations',
      method: 'POST',
      data: payload,
    });
    return data;
  } else {
    const {data} = await FfthDonationsAPI().request<IDonationFormResponse>({
      url: `/donations/${payload.donationID}`,
      method: 'PUT',
      data: payload,
    });
    return data;
  }
};

export const submitChangePaymentMethodDonation = async (
  payload: IChangePaymentMethodDonationForm,
): Promise<IChangePaymentMethodDonationFormResponse> => {
  const {data} = await FfthDonationsAPI().request<IChangePaymentMethodDonationFormResponse>({
    url: `/donations/payment-method/${payload.donationId}`,
    method: 'PATCH',
    data: payload,
  });

  return data;
};

export const apiUpdateDonationStatus = async (
  payload: IUpdateDonationStatusForm,
): Promise<IUpdateDonationStatusResponse> => {
  const {data} = await FfthDonationsAPI().request<IUpdateDonationStatusResponse>({
    url: `/donations/${payload.donationID}`,
    method: 'PATCH',
    data: payload,
  });

  return data;
};
