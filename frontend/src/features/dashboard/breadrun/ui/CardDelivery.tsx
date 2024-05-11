import React from 'react';
import {Box, Button, Card, Stack, Typography} from '@mui/material';
import {FeatherIconNames} from 'feather-icons';
import {TColorVariant} from '@/themes/ts/colors';
import IconCircle from '@/components/IconCircle';

export interface ICardDelivery {
  icon: FeatherIconNames;
  color: TColorVariant;
  bakery: string;
  name: string;
  time: string;
  date: string;
  onDetail?: () => void;
}
const CardDelivery: React.FC<ICardDelivery> = ({
  icon,
  color,
  bakery,
  name,
  time,
  date,
  onDetail,
}) => {
  return (
    <Card sx={{width: '100%', py: 4, px: 6}}>
      <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'} spacing={3}>
        <Box sx={{alignSelf: 'flex-start'}}>
          <IconCircle icon={icon} color={color} />
        </Box>
        <Box sx={{flex: 1}}>
          <Typography fontWeight={'medium'} sx={{marginBottom: '2px'}}>
            {bakery}
          </Typography>
          <Typography mb={1} fontWeight={'medium'} variant='caption' color='text.secondary'>
            {name}
          </Typography>
          <Typography variant='body2' fontWeight={'light'} color='text.secondary'>
            {date} | {time?.substring(0, 5)}
          </Typography>
        </Box>
        <Box>
          <Button variant='outlined' color='inherit' onClick={onDetail}>
            Detail
          </Button>
        </Box>
      </Stack>
    </Card>
  );
};

export default CardDelivery;
