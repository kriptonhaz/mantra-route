import React from 'react';
import {Card, Divider, Stack, Button, Box, Typography, Chip} from '@mui/material';
import IconCircle from '@/components/IconCircle';
import FeatherIcon from '@/components/FeatherIcon/FeatherIcon';
import {FeatherIconNames} from 'feather-icons';

export interface ICardDashboardProps {
  title: string;
  subtitle: string;
  value: string | number;
  progress?: number;
  icon: FeatherIconNames;
  btnProps: {
    text: string;
  };
  onClick?: () => void;
}
const CardDashboard: React.FC<ICardDashboardProps> = ({
  title,
  subtitle,
  value,
  progress,
  icon,
  btnProps,
  onClick,
}) => {
  return (
    <Card sx={{p: 0, flex: 1}}>
      <Stack sx={{py: 4, px: 6}} direction='row' spacing={3}>
        <Box>
          <IconCircle icon={icon} color='success' />
        </Box>
        <Box sx={{width: '100%'}}>
          <Typography variant='body2' color='text.secondary' fontWeight={'medium'}>
            {title}
          </Typography>
          <Typography
            variant='caption'
            color='text.secondary'
            sx={{display: {xs: 'none', md: 'block'}}}
          >
            {subtitle}
          </Typography>
          <Stack
            direction='row'
            justifyContent={'space-between'}
            alignItems={'center'}
            sx={{mt: 2}}
          >
            <Typography variant='h4' fontWeight={'bold'}>
              {value}
            </Typography>
            {/* TODO: might be used in the future */}
            {/* <Chip
              color='success'
              sx={{pl: 4}}
              label={
                <>
                  <FeatherIcon
                    sx={{'& svg': {transform: 'scale(.8) translateX(-30px)', position: 'absolute'}}}
                    icon='arrow-up'
                  />
                  {progress}%
                </>
              }
            /> */}
          </Stack>
        </Box>
      </Stack>
      <Divider />
      <Stack sx={{py: 4, px: 6}} direction='row' justifyContent={'flex-end'}>
        <Button onClick={onClick}>{btnProps.text}</Button>
      </Stack>
    </Card>
  );
};

export default CardDashboard;
