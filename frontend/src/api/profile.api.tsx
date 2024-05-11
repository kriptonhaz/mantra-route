import {
  PasswordFormInput,
  PasswordFormResponse,
  ProfileDataResponseType,
  ProfileInfoInput,
} from '../interface/profileInfo.interface';

import FfthAPI from './base';

export const getProfileInfo = async (): Promise<ProfileDataResponseType> => {
  const {data} = await FfthAPI().request<ProfileDataResponseType>({
    url: '/FSMAContacts/profile',
    method: 'GET',
  });

  return data;
};

export const changeProfileInfo = async (
  dataProfile: ProfileInfoInput,
): Promise<ProfileInfoInput> => {
  const formData = new FormData();
  for (const key of Object.keys(dataProfile))
    formData.append(key, dataProfile[key as keyof ProfileInfoInput]);
  const {data} = await FfthAPI().request<ProfileInfoInput>({
    url: '/FSMAContacts/profile',
    method: 'PATCH',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: formData,
  });

  return data;
};

export const changeUserPassword = async (
  payload: PasswordFormInput,
): Promise<PasswordFormResponse> => {
  const {data} = await FfthAPI().request<PasswordFormResponse>({
    url: '/contacts/password',
    method: 'PATCH',
    data: payload,
  });
  return data;
};
