import FeatherIcon from '@/components/FeatherIcon/FeatherIcon';
import Render from '@/components/Render';
import {EAssginedVolunteerStatus, EAssigneeStatus} from '@/interface/volunteerRequest.interface';
import {neutral} from '@/themes/ts/colors';
import {Box, Button, Chip, Stack, SxProps, Typography} from '@mui/material';
import React from 'react';

const badgeColor: {
  [key in EAssginedVolunteerStatus]: 'error' | 'info' | 'success' | 'warning';
} = {
  Selected: 'info',
  Contacted: 'info',
  Registered: 'info',
  Accepted: 'success',
  Rejected: 'error',
  Declined: 'error',
  Cancelled: 'error',
  Withdrawn: 'error',
  Suspended: 'warning',
};

const styles: {root: SxProps; info: SxProps} = {
  root: {
    p: 4,
    display: 'flex',
    flexDirection: {xs: 'column', md: 'row'},
    justifyContent: 'space-between',
    alignItems: 'center',
    border: `1px solid ${neutral[200]}`,
    borderRadius: '8px',
  },
  info: {
    display: 'flex',
    gap: 2,
    color: neutral[500],
    '& svg': {
      transform: 'scale(.8) translate(0px,-2px)',
      color: neutral[400],
    },
    '& p': {
      ml: -1,
    },
  },
};

export interface ICardSessionItemProps {
  title: string;
  date: string;
  startTime: string;
  endTime: string;
  required: number;
  signedUp: number;
  openModal: () => void;
  isRegister: boolean;
  status: EAssginedVolunteerStatus | null;
}
const CardSessionItem: React.FC<ICardSessionItemProps> = ({
  title,
  date,
  startTime,
  endTime,
  required,
  signedUp,
  openModal,
  isRegister = false,
  status,
}) => {
  return (
    <Box sx={styles.root}>
      <Box mb={{xs: 4, md: 0}}>
        <Typography fontWeight={'medium'} mb={2}>
          {title}
        </Typography>
        <Stack direction={{xs: 'column', md: 'row'}} spacing={{xs: 1, md: 3}}>
          <Box sx={styles.info}>
            <FeatherIcon icon='calendar' />
            <Typography variant='body2'>{date}</Typography>
          </Box>
          <Box sx={styles.info}>
            <FeatherIcon icon='clock' />
            <Typography variant='body2'>
              {startTime.substring(0, 5) + ' - ' + endTime.substring(0, 5)}
            </Typography>
          </Box>
          <Box sx={styles.info}>
            <FeatherIcon icon='user' />
            <Typography variant='body2'>{required} Required Volunteers</Typography>
          </Box>
          <Box sx={styles.info}>
            <FeatherIcon icon='log-in' />
            <Typography variant='body2'>{signedUp} Signed Up</Typography>
          </Box>
          <Render in={!!status}>
            <Chip label={status} color={badgeColor[status || EAssigneeStatus.SELECTED]} />
          </Render>
        </Stack>
      </Box>
      <Box>
        <Button onClick={openModal}>Detail</Button>
      </Box>
    </Box>
  );
};

export default CardSessionItem;
