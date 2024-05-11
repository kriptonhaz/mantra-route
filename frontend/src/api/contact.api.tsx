import {VolunteerActivityType} from '../interface/volunteer.interface';

import FfthAPI from './base';

export const getUserActivity = async (): Promise<VolunteerActivityType> => {
  const {data} = await FfthAPI().request<VolunteerActivityType>({
    url: '/contacts/myActivity',
    method: 'GET',
  });

  return data;
};
