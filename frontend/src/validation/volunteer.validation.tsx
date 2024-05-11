import {TVolunteer} from '@/interface/volunteer.interface';
import dayjs from 'dayjs';
import * as Yup from 'yup';

export const volunteerYourDetailsFormValidationSchema = Yup.object().shape({
  volunteerType: Yup.string(),
  title: Yup.string().required('Field is required'),
  orgName: Yup.string().when(['volunteerType'], {
    is: (val: TVolunteer) => val === 'organisation',
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
  designation: Yup.string(),
  gender: Yup.string(),
  email: Yup.string().email().required('Please provide a valid email address.'),
  birthdate: Yup.string().when('volunteerType', {
    is: 'individual',
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
  phone: Yup.string().when(['country'], {
    is: 'Singapore',
    then: Yup.string().mobileNumber(),
  }),
  postalCode: Yup.string().postalCode(),
  address: Yup.string().address(),
  knowAboutUs: Yup.string().required(),
  remarks: Yup.string(),
  receiveMonthlyNewsletter: Yup.bool(),
  agreeVolunteerCoC: Yup.bool().test('agreeVolunteerCoC', 'Please agree before continue', (val) =>
    val ? val : false,
  ),
  agreeVolunteerTC: Yup.bool().test('agreeVolunteerTC', 'Please agree before continue', (val) =>
    val ? val : false,
  ),
  eventType: Yup.array().test('eventType', 'This field is required', (val) => {
    return !!val?.length;
  }),
  isBreadRun: Yup.bool(),
  isFoodPacking: Yup.bool(),
});
