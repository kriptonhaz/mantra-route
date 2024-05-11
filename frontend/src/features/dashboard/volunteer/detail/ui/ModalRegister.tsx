import React from 'react';
import {Modal} from '@/components/Modal';
import {Box, Button, CircularProgress, Grid, Stack, SxProps, Typography} from '@mui/material';
import FeatherIcon from '@/components/FeatherIcon/FeatherIcon';
import {neutral, primary} from '@/themes/ts/colors';
import {VrSessionItemType} from '@/interface/volunteerRequest.interface';
import dayjs from 'dayjs';
import {useVolunteerRequestHook} from '@/hooks/use-volunteerRequest.hooks';
import Render from '@/components/Render';

const styles: {
  banner: {
    root: SxProps;
    subtitle: SxProps;
    status: SxProps;
  };
} = {
  banner: {
    root: {
      py: 3,
      px: 4,
      border: `1px solid ${primary[500]}`,
      borderRadius: '8px',
      mb: 4,
    },
    subtitle: {
      mt: 2,
      display: 'flex',
      gap: '8px',
      '& svg': {
        color: neutral[400],
        transform: `scale(0.8)`,
      },
    },
    status: {
      display: 'flex',
      gap: '8px',
      color: primary[700],
    },
  },
};

const DataItem: React.FC<{label: string; value: string | undefined | null}> = ({label, value}) => {
  return (
    <Grid item md={6}>
      <Typography color='text.secondary' mb={1}>
        {label}
      </Typography>
      <Typography>{value ? value : '-'}</Typography>
    </Grid>
  );
};

export interface IModalRegisterProps {
  show: boolean;
  dataSession: VrSessionItemType | null;
  onClose: () => void;
}

const ModalRegister: React.FC<IModalRegisterProps> = ({show, onClose, dataSession}) => {
  const {volunteerRequestSessionRegister} = useVolunteerRequestHook();
  const mutation = volunteerRequestSessionRegister({
    onSuccess: onClose,
  });
  const onRegister = () => {
    mutation.mutate({idSession: dataSession?.Id || ''});
  };

  return (
    <Modal open={show} onClose={onClose} containerProps={{sx: {maxWidth: '728px !important'}}}>
      <Modal.Header
        title='Ready to get involved?'
        subtitle="You're one step away from registering!"
        divider
      />
      <Modal.Body>
        <Stack
          direction='row'
          justifyContent={'space-between'}
          alignItems='center'
          sx={styles.banner.root}
        >
          <Box>
            <Typography>{dataSession?.Session_Title__c}</Typography>
            <Box sx={styles.banner.subtitle}>
              <FeatherIcon icon='calendar' />
              <Typography color='text.secondary' variant='body2'>
                {dayjs(dataSession?.Session_Date__c).format('DD/MM/YYYY')}
              </Typography>
            </Box>
          </Box>
          <Box sx={styles.banner.status}>
            <FeatherIcon icon='check-circle' />
            <Typography fontWeight={'medium'}>Session Selected</Typography>
          </Box>
        </Stack>
        <Grid container spacing={4}>
          <DataItem label='My Status' value='-' />
          <DataItem label='Date' value={dayjs(dataSession?.Session_Date__c).format('DD/MM/YYYY')} />
          <DataItem label='Start Time' value={dataSession?.Start_Time__c?.substring(0, 5)} />
          <DataItem label='End Time' value={dataSession?.End_Time__c?.substring(0, 5)} />
          <DataItem
            label='Number of Signup'
            value={dataSession?.Number_of_Sign_ups__c?.toString()}
          />
          <DataItem
            label='Max Number of Volunteer Required'
            value={dataSession?.Max_Num_of_Volunteer__c?.toString()}
          />
          <DataItem label='Description' value={dataSession?.Description__c} />
        </Grid>
      </Modal.Body>
      <Modal.Footer justifyContent={'flex-end'} spacing={4} divider onCancel={onClose}>
        <Button onClick={onRegister} disabled={mutation.isLoading}>
          Register
          <Render in={mutation.isLoading}>
            <CircularProgress sx={{ml: 2}} />
          </Render>
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalRegister;
