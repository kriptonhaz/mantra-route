import {neutral} from '@/themes/ts/colors';
import {Box, Button, Card, Chip, Stack, SxProps, Typography} from '@mui/material';
import React from 'react';
import dayjs from 'dayjs';
import FeatherIcon from '@/components/FeatherIcon/FeatherIcon';
import {Link} from 'react-router-dom';
import {VolunteerType} from '@/interface/volunteerRequest.interface';

const styles: {dateTime: SxProps; icon: SxProps} = {
  dateTime: {
    color: neutral[500],
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: '4px',
  },
  icon: {
    '& svg': {transform: 'scale(.8) translateY(5px)', color: neutral[400]},
  },
};

export interface IVolunteerItemProps {
  id: string;
  title: string;
  startDate: string;
  endDate: string;
  session: number;
  status: string;
  volunteerType: VolunteerType;
}
const VolunteerItem: React.FC<IVolunteerItemProps> = ({
  id,
  title,
  startDate,
  endDate,
  session,
  status,
  volunteerType,
}) => {
  return (
    <Card>
      <Box sx={{display: {xs: 'block', md: 'none'}}}>
        <Chip label={status} color='success' />
        <Typography fontWeight={'medium'} mb={2} ml={1}>
          {title}
        </Typography>
        <Box sx={styles.dateTime}>
          <FeatherIcon sx={styles.icon} icon='calendar' />
          <Typography color='text.secondary' variant='body2'>
            {dayjs(startDate).format('DD/MM/YYYY')} - {dayjs(endDate).format('DD/MM/YYYY')}
          </Typography>
        </Box>
        <Box sx={styles.dateTime} mb={4}>
          <FeatherIcon sx={styles.icon} icon='briefcase' />
          <Typography color='text.secondary' variant='body2'>
            {session} Available Session
          </Typography>
        </Box>
        <Link to={`/dashboard/volunteer/${id}`}>
          <Button fullWidth>Open Details</Button>
        </Link>
      </Box>
      <Stack
        direction='row'
        justifyContent={'space-between'}
        sx={{display: {xs: 'none', md: 'flex'}}}
      >
        <Box sx={{flex: 1}}>
          <Typography fontWeight={'medium'} mb={2}>
            {title}
          </Typography>
          <Stack direction='row' mb={7} spacing={4}>
            <Box sx={styles.dateTime}>
              <FeatherIcon sx={styles.icon} icon='calendar' />
              <Typography color='text.secondary' variant='body2'>
                {dayjs(startDate).format('DD/MM/YYYY')} - {dayjs(endDate).format('DD/MM/YYYY')}
              </Typography>
            </Box>
            {status.toUpperCase() === 'FOOD PACKING' && (
              <Box sx={styles.dateTime}>
                <FeatherIcon sx={styles.icon} icon='briefcase' />
                <Typography color='text.secondary' variant='body2'>
                  {session} Available Session
                </Typography>
              </Box>
            )}
          </Stack>
          <Link to={`/dashboard/volunteer/${id}`}>
            <Button>Open Details</Button>
          </Link>
        </Box>
        <Box>
          <Chip label={status} color='success' />
        </Box>
      </Stack>
    </Card>
  );
};

export default VolunteerItem;
