import {
  apiUpdateDonationStatus,
  submitChangePaymentMethodDonation,
  submitDonationForm,
} from '@/api/donation.api';
import {apiPostalCode} from '@/api/postalCodeRepo';
import {
  IChangePaymentMethodDonationForm,
  IDonationForm,
  IDonationFormResponse,
} from '@/interface/donation.inteface';
import useDonationStore from '@/store/use-donation.store';
// import {
//   donationPaymentValidationSchema,
//   donationValidationSchema,
// } from '@/validation/donation.validation';
import {yupResolver} from '@hookform/resolvers/yup';
import {useMutation, useQuery} from '@tanstack/react-query';
import dayjs from 'dayjs';
import {useEffect} from 'react';
import {useForm} from 'react-hook-form';
import {useNavigate} from 'react-router-dom';
import {usePostalCode} from './use-postal-code.hook';

export const useDonationHook = () => {
  const navigate = useNavigate();
  const {address, getAddress} = usePostalCode();
  const donationStore = useDonationStore((state) => state);
  const rhf = useForm<IDonationForm>({
    mode: 'onChange',
    // @ts-ignore
    // resolver: yupResolver(donationValidationSchema),
    defaultValues: {
      programmeId: '',
      donationID: '',
      donationNo: '',
      donorType: 'Individual',
      title: '',
      fullname: '',
      surname: '',
      idType: 'nric',
      idNumber: '',
      gender: '',
      birthdate: '',
      email: '',
      mobile: '',
      country: 'Singapore',
      postal: '',
      buildingNumber: '',
      street: '',
      unitNumber: '',
      city: '',
      knowAboutUs: '',
      remarks: '',
      receiveMonthlyNewsletter: false,
      isTax: true,
    },
  });

  const paymentMethodRhf = useForm<IChangePaymentMethodDonationForm>({
    mode: 'onChange',
    // @ts-ignore
    // resolver: yupResolver(donationPaymentValidationSchema),
    defaultValues: {
      donationId: '',
    },
  });

  useEffect(() => {
    const dataForm: IDonationForm = JSON.parse(
      localStorage.getItem('FFTH-donation-form') || 'null',
    );

    if (dataForm) {
      const limitExpired = 1000 * 60 * 15; // 15 minutes
      const expiryTime = localStorage.getItem('FFTH-donation-time');
      const isDataExpired = dayjs().diff(dayjs(expiryTime)) > limitExpired;
      if (isDataExpired) {
        localStorage.removeItem('FFTH-donation-form');
        localStorage.removeItem('FFTH-donation-res');
        localStorage.removeItem('FFTH-donation-time');
      } else {
        rhf.setValue('donationID', dataForm.donationID);
        rhf.setValue('donationNo', dataForm.donationNo);
        rhf.setValue('programmeId', dataForm.programmeId);
        rhf.setValue('frequency', dataForm.frequency);
        rhf.setValue('amount', dataForm.amount);
        rhf.setValue('donorType', dataForm.donorType);
        rhf.setValue('title', dataForm.title);
        rhf.setValue('orgName', dataForm.orgName);
        rhf.setValue('fullname', dataForm.fullname);
        rhf.setValue('surname', dataForm.surname);
        rhf.setValue('idType', dataForm.idType);
        rhf.setValue('idNumber', dataForm.idNumber);
        rhf.setValue('gender', dataForm.gender);
        rhf.setValue('birthdate', dataForm.birthdate);
        rhf.setValue('email', dataForm.email);
        rhf.setValue('designation', dataForm.designation);
        rhf.setValue('mobile', dataForm.mobile);
        rhf.setValue('country', dataForm.country);
        rhf.setValue('postal', dataForm.postal);
        rhf.setValue('buildingNumber', dataForm.buildingNumber);
        rhf.setValue('street', dataForm.street);
        rhf.setValue('unitNumber', dataForm.unitNumber);
        rhf.setValue('city', dataForm.city);
        rhf.setValue('officePhone', dataForm.officePhone);
        rhf.setValue('knowAboutUs', dataForm.knowAboutUs);
        rhf.setValue('remarks', dataForm.remarks);
        rhf.setValue('receiveMonthlyNewsletter', dataForm.receiveMonthlyNewsletter);
        rhf.setValue('isTax', dataForm.isTax);
      }
    }
  }, []);

  useEffect(() => {
    const maleTitles = ['Mr'];
    const femaleTitles = ['Ms', 'Mdm'];
    const titleSelected = rhf.watch('title');
    if (maleTitles.includes(titleSelected)) {
      rhf.setValue('gender', 'Male');
    } else if (femaleTitles.includes(titleSelected)) {
      rhf.setValue('gender', 'Female');
    }
  }, [rhf.watch('title')]);

  useEffect(() => {
    if (rhf.watch('idType') !== '' && rhf.watch('idNumber') !== '') {
      rhf.trigger('idNumber');
    }
  }, [rhf.watch('idType'), rhf.watch('idNumber')]);

  useEffect(() => {
    const postalCode = rhf.watch('postal');
    if (postalCode.length === 6) getAddress(postalCode);
  }, [rhf.watch('postal')]);
  useEffect(() => {
    if (address.length !== 0) {
      const dataAddress = address[0];
      rhf.setValue(
        'buildingNumber',
        (dataAddress.BLDGNAME || '') + ' ' + (dataAddress.BLDGNO || '').trim(),
      );
      rhf.setValue('street', dataAddress.STREETNAME);
      rhf.setValue('city', 'Singapore');
    }
  }, [address]);

  const postalCodeQuery = useQuery(
    ['postal-code', {postalCode: rhf.watch('postal')}],
    () => apiPostalCode({postalCode: rhf.watch('postal')}),
    {
      enabled: !!rhf.watch('postal'),
      select: (data) => {
        return data.postalcodes;
      },
    },
  );

  const donationFormMutation = useMutation({
    mutationKey: ['donation-form'],
    mutationFn: submitDonationForm,
    onError: (err: Error) => {
      console.log(err);
    },
    onSuccess: (data) => {
      rhf.setValue('donationID', data.data.donation.id);
      rhf.setValue('donationNo', data.data.donation.Name);
      localStorage.setItem('FFTH-donation-res', JSON.stringify(data));
      localStorage.setItem('FFTH-donation-form', JSON.stringify(rhf.watch()));
      localStorage.setItem('FFTH-donation-time', dayjs().toISOString());
      navigate('/donate-review');
    },
  });

  const changePaymentMutation = useMutation({
    mutationKey: ['donation', 'change-payment'],
    mutationFn: submitChangePaymentMethodDonation,
    onError: (err: Error) => {
      console.log(err);
    },
    onSuccess: (_, variable) => {
      donationStore.resetData();
      const paymentMethod = variable.paymentMethod;
      const donationResponse: IDonationFormResponse = JSON.parse(
        localStorage.getItem('FFTH-donation-res') || 'null',
      );

      if (paymentMethod === 'Credit Card') {
        // @ts-ignore
        window.Checkout.configure({
          session: {
            id: donationResponse?.data?.checkoutToken?.session?.id,
          },
          merchant: donationResponse?.data?.checkoutToken?.merchant,
        });
        // @ts-ignore
        window.Checkout.showPaymentPage();
      } else if (paymentMethod === 'PayNow') {
        navigate('/donate-paynow');
      }
    },
  });

  const updateStatusMutation = useMutation({
    mutationKey: ['donation', 'update-status'],
    mutationFn: apiUpdateDonationStatus,
    onError: (err: Error) => console.log(err),
    onSuccess: () => {
      localStorage.removeItem('FFTH-donation-res');
      localStorage.removeItem('FFTH-donation-form');
      localStorage.removeItem('FFTH-donation-time');
    },
  });

  const onSubmitForm = rhf.handleSubmit((data) => {
    donationFormMutation.mutate(data);
  });

  const onSubmitChangePayment = paymentMethodRhf.handleSubmit((data) => {
    const dataForm: IDonationForm = JSON.parse(
      localStorage.getItem('FFTH-donation-form') || 'null',
    );
    changePaymentMutation.mutate({...data, donationId: dataForm?.donationID});
  });

  return {
    rhf,
    paymentMethodRhf,
    postalCodeQuery,
    donationFormMutation,
    changePaymentMutation,
    updateStatusMutation,
    onSubmitForm,
    onSubmitChangePayment,
  };
};
