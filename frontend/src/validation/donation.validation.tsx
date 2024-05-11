import {TDonor, TIDType} from '@/interface/donation.inteface';
import dayjs from 'dayjs';
import * as Yup from 'yup';

export const donationValidationSchema = Yup.object().shape({
  donorType: Yup.string(),
  frequency: Yup.string(),
  amount: Yup.number().required(),
  title: Yup.string().required('Field is required'),
  orgName: Yup.string().when(['donorType'], {
    is: (val: TDonor) => val === 'Organisation',
    then: Yup.string().required('Field is required'),
  }),
  fullname: Yup.string()
    .required('Field is required')
    .matches(/^[aA-zZ\s]+$/, 'Only alphabets are allowed for this field'),
  surname: Yup.string()
    .required('Field is required')
    .when('fullname', {
      is: (val: string) => val !== '',
      then: Yup.string()
        .required('Field is required')
        .test('surname', '', function (val) {
          const fullname = this.parent.fullname;
          if (fullname.toLowerCase().includes(val?.toLowerCase())) {
            return true;
          } else {
            return new Yup.ValidationError('Surname did not match with Full Name', null, 'surname');
          }
        }),
    }),
  idType: Yup.string().when('isTax', {
    is: true,
    then: Yup.string().required('Please select ID type'),
  }),
  idNumber: Yup.string().when('isTax', {
    is: true,
    then: Yup.string()
      .required('This field is required')
      .when(['idType'], {
        is: (idType: TIDType) => idType === 'nric',
        then: Yup.string()
          .nric()
          .uppercase('Value must be uppercase')
          .matches(/(S|T)\w+/, 'Please provide a valid id number'),
      })
      .when(['idType'], {
        is: (idType: TIDType) => idType === 'fin',
        then: Yup.string()
          .nric()
          .uppercase('Value must be uppercase')
          .matches(/(M|F|G)\w+/, 'Please provide a valid id number'),
      })
      .when(['idType'], {
        is: (idType: TIDType) => idType === 'uen',
        then: Yup.string()
          .uen()
          .uppercase('Value must be uppercase')
          .matches(
            /^(?:[A]+\d{7}[A-Z]+|\d{8}[A-Z]+|\d{9}[A-Z]+|[TS]\d{2}[A-Z]{2}\d{4}[A-Z])$/,
            'Please provide a valid uen number',
          ),
      }),
  }),
  gender: Yup.string(),
  email: Yup.string().email().required('Please provide a valid email address.'),
  birthdate: Yup.string().when('donationType', {
    is: 'ind',
    then: Yup.string()
      .nullable()
      .test('dob', '', (val) => {
        if (val === null || val === '') {
          return true;
        } else if (dayjs(val) < dayjs()) {
          return true;
        } else {
          return new Yup.ValidationError("Birthdate can't be in the future", null, 'dob');
        }
      }),
  }),
  isTax: Yup.boolean(),
  mobile: Yup.string().when(['country'], {
    is: 'Singapore',
    then: Yup.string().mobileNumber(),
  }),
  country: Yup.string(),
  postal: Yup.string().postalCode(),
  buildingNumber: Yup.string(),
  street: Yup.string(),
  unitNumber: Yup.string().unitNumber(),
  city: Yup.string(),
  officePhone: Yup.string().when('donorType', {
    is: 'Organisation',
    then: Yup.string().when('country', {
      is: 'Singapore',
      then: Yup.string()
        .matches(/^[36]\d{7}$/, 'Please provide a valid phone number')
        .required('Field is required'),
    }),
  }),
  knowAboutUs: Yup.string().required(),
  remarks: Yup.string(),
});

export const donationPaymentValidationSchema = Yup.object().shape({
  paymentMethod: Yup.string().required(),
});
