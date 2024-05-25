import {Control} from 'react-hook-form';
import {
  ForgetPasswordInput,
  ILoginInput,
  LoginInputType,
  ResetPasswordInput,
} from './auth.interface';
import {ProfileInfoInput, ProfileInfoInputType} from './profileInfo.interface';

export type ControlInput = Control<ILoginInput>;
export type ControlForgetInput = Control<ForgetPasswordInput>;
export type ControlResetInput = Control<ResetPasswordInput>;
export type ControlEditableInput = Control<ProfileInfoInput>;
export type ValueInput = LoginInputType;
export type ValueEditableInput = ProfileInfoInputType;
