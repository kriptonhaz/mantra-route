import * as yup from 'yup';

export const loginSchema = yup.object().shape({
  username: yup.string().required(),
  password: yup.string().required(),
});

export const resetPasswordSchema = yup.object().shape({
  newPassword: yup.string().min(8).max(32).required(),
  confirmPassword: yup.string().test('passwords-match', 'Passwords must match', function (value) {
    return this.parent.newPassword === value;
  }),
  token: yup.string().required(),
});

export const forgetPasswordSchema = yup.object().shape({
  email: yup.string().email().required(),
});

export const updateProfileInfoValidationSchema = yup.object({
  email: yup.string().email().required(),
  name: yup.string().required(),
  phoneNumber: yup
    .string()
    .matches(/^([689]|\+65[89])\d{7}$/, 'Please provide a valid phone number')
    .required('Field is required'),
  file: yup.mixed(),
});

export const updatePasswordValidationSchema = yup.object().shape({
  oldPassword: yup.string().required(),
  newPassword: yup.string().min(8).max(32).required(),
  verifyPassword: yup
    .string()
    .required()
    .oneOf([yup.ref('newPassword'), ''], 'Passwords must match'),
});
