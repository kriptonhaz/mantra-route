import {apiPostalCode} from '@/api/postalCodeRepo';
import {getYourDetailsDataData, submitVolunteerYourDetailsForm} from '@/api/volunteer-form.api';
import {IYourDetailsForm} from '@/interface/volunteer.interface';
// import {volunteerYourDetailsFormValidationSchema} from '@/validation/volunteer.validation';
import {yupResolver} from '@hookform/resolvers/yup';
import {useMutation, useQuery} from '@tanstack/react-query';
import {useEffect} from 'react';
import {useForm} from 'react-hook-form';
import {useLocation, useNavigate} from 'react-router-dom';
import {usePostalCode} from './use-postal-code.hook';
import queryString from 'query-string';
import {AxiosError} from 'axios';
import useErrorStore from '@/store/use-error.store';

export const useVolunteerFormYourDetailHook = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const errorStore = useErrorStore((state) => state);
  const {address, getAddress, getFormattedAddress} = usePostalCode();
  const {contactId} = queryString.parse(location.search);
  const rhf = useForm<IYourDetailsForm>({
    mode: 'onChange',
    // @ts-ignore
    // resolver: yupResolver(volunteerYourDetailsFormValidationSchema),
    defaultValues: {
      volunteerType: 'individual',
      eventType: [],
    },
  });

  const contactQuery = useQuery({
    queryKey: ['volunteer', 'your-detail', {contactId}],
    queryFn: () => getYourDetailsDataData((contactId as string) || ''),
    enabled: !!contactId,
    select: (data) => data.contact[0],
  });

  useEffect(() => {
    const data = contactQuery.data;
    rhf.setValue('title', data?.Title || '');
    rhf.setValue('fullname', data?.Full_Name__c || '');
    rhf.setValue('surname', data?.Surname__c || '');
    rhf.setValue('email', data?.Email || '');
    rhf.setValue('gender', data?.Gender__c || '');
    rhf.setValue('birthdate', data?.Birthdate || '');
    rhf.setValue('phone', data?.Phone || '');
    rhf.setValue('postalcode', data?.MailingPostalCode || '');
    rhf.setValue('address', data?.MailingAddress || '');
    rhf.setValue('designation', data?.Designation__c || '');
  }, [contactQuery.data]);

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
    const postalCode = rhf.watch('postalcode');
    if (postalCode?.length === 6) getAddress(postalCode);
  }, [rhf.watch('postalcode')]);

  useEffect(() => {
    rhf.setValue('address', getFormattedAddress().trim());
  }, [address]);

  const postalCodeQuery = useQuery(
    ['postal-code', {postalCode: rhf.watch('postalcode')}],
    () => apiPostalCode({postalCode: rhf.watch('postalcode')}),
    {
      enabled: !!rhf.watch('postalcode'),
      select: (data) => {
        return data.postalcodes;
      },
    },
  );

  const mutation = useMutation({
    mutationFn: submitVolunteerYourDetailsForm,
    mutationKey: ['volunteer', 'form', 'your-details'],
    onError: (err: Error | AxiosError) => {
      if (err instanceof AxiosError) {
        let newError: Error = {
          name: 'Registration Failed',
          message: 'Email is already registered as a Volunteer',
        };
        errorStore.open(newError);
      } else {
        errorStore.open(err);
      }
    },
    onSuccess: () => {
      navigate('/submission-success');
    },
  });

  const onSubmit = rhf.handleSubmit((data) => {
    mutation.mutate({...data, query: location.search});
  });

  return {rhf, onSubmit, mutation, postalCodeQuery};
};
