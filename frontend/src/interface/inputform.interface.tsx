import {Control} from 'react-hook-form';
import {
  ForgetPasswordInput,
  LoginInput,
  LoginInputType,
  ResetPasswordInput,
} from './auth.interface';
import {ProfileInfoInput, ProfileInfoInputType} from './profileInfo.interface';

export type ControlInput = Control<LoginInput>;
export type ControlForgetInput = Control<ForgetPasswordInput>;
export type ControlResetInput = Control<ResetPasswordInput>;
export type ControlEditableInput = Control<ProfileInfoInput>;
export type ValueInput = LoginInputType;
export type ValueEditableInput = ProfileInfoInputType;
