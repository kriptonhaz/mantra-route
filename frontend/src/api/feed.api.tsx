import {FeedResponseType} from '../interface/feed.interface';
import FfthAPI from './base';

export const getAnnouncements = async (): Promise<FeedResponseType> => {
  const {data} = await FfthAPI().request<FeedResponseType>({
    url: '/feed',
    method: 'GET',
  });

  return data;
};
