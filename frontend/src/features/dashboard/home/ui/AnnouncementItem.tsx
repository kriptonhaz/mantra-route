import React from 'react';
import {Card, Stack, Box, Typography, Link} from '@mui/material';
import IconCircle from '@/components/IconCircle';
import {MessageSegmentType} from '@/interface/feed.interface';
import dayjs from 'dayjs';

export interface IAnnouncementItem {
  createdDate: string;
  description: MessageSegmentType[];
}
const AnnouncementItem: React.FC<IAnnouncementItem> = ({createdDate, description}) => {
  return (
    <Card>
      <Stack direction='row' spacing={3}>
        <Box sx={{width: '44px'}}>
          <IconCircle icon='info' color='info' />
        </Box>
        <Box sx={{flex: 1}}>
          <Typography fontWeight={'medium'} mb={2}>
            {dayjs(createdDate).format('DD MMMM YYYY')}
          </Typography>
          <Typography fontWeight={'light'} variant='body2' color='text.secondary'>
            {description.map((detail) => {
              let label: string | React.ReactElement = '';
              if (detail.type === 'Text') {
                label = detail.text;
              } else if (detail.type === 'Link') {
                label = (
                  <Link href={detail.url} target='_blank' rel='noopener'>
                    {detail.text}
                  </Link>
                );
              }
              return label;
            })}
          </Typography>
        </Box>
      </Stack>
    </Card>
  );
};

export default AnnouncementItem;
