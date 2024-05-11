import {FeedResponseType} from '@/interface/feed.interface';
import {Box, Divider, Stack, Typography} from '@mui/material';
import {UseQueryResult} from '@tanstack/react-query';
import React from 'react';
import AnnouncementItem from './AnnouncementItem';
import {EmptyStateBox} from '@/components/EmptyState/EmptyState';

export interface IListAnnouncements {
  listAnnouncements: UseQueryResult<FeedResponseType, unknown>;
}
const ListAnnouncements: React.FC<IListAnnouncements> = ({listAnnouncements}) => {
  return (
    <Box>
      <Box sx={{margin: '2.5rem 0 0 0'}}>
        <Typography variant='h5' component='h3' fontWeight={'medium'}>
          Announcements
        </Typography>
        <Typography color='text.secondary'>Keeping you up to date with FFTH</Typography>
      </Box>
      <Divider sx={{my: 5}} />
      <Stack direction={'column'} spacing={4}>
        {listAnnouncements.data?.feeds.map((item) => {
          if (item.body.messageSegments.filter((ar) => ar.tag === 'announcement')) {
            return (
              <AnnouncementItem
                createdDate={item.createdDate}
                description={item.body?.messageSegments}
              />
            );
          } else {
            return (
              <EmptyStateBox
                title='There are no announcement at the moment!'
                message='Announcements will be shown here'
              />
            );
          }
        })}
      </Stack>
    </Box>
  );
};

export default ListAnnouncements;
