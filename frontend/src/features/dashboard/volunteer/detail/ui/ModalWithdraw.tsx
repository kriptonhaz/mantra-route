import React, {useEffect} from 'react';
import {Modal} from '@/components/Modal';
import {Box, Button, CircularProgress, Grid, Stack, SxProps, Typography} from '@mui/material';
import FeatherIcon from '@/components/FeatherIcon/FeatherIcon';
import {neutral, success} from '@/themes/ts/colors';
import {VrSessionItemType} from '@/interface/volunteerRequest.interface';
import dayjs from 'dayjs';
import InputFloating from '@/components/InputFloating';
import {useVolunteerSessionHook} from '@/hooks/use-volunteerSession.hooks';
import {useForm} from 'react-hook-form';
import {IWithdrawRegularVRPayload} from '@/interface/volunteerSession.interface';
import * as Yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import ErrorMessage from '@/components/ErrorMessage';
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
      border: `1px solid ${success[500]}`,
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
      color: success[700],
    },
  },
};

const validationSchema = Yup.object().shape({
  reason: Yup.string().required(),
});

const DataItem: React.FC<{label: string; value: string}> = ({label, value}) => {
  return (
    <Grid item md={6}>
      <Typography color='text.secondary' mb={1}>
        {label}
      </Typography>
      <Typography>{value}</Typography>
    </Grid>
  );
};

export interface IModalWithdrawProps {
  show: boolean;
  dataSession: VrSessionItemType | null;
  onClose: () => void;
}

const ModalWithdraw: React.FC<IModalWithdrawProps> = ({show, dataSession, onClose}) => {
  const {withdrawMutation} = useVolunteerSessionHook();
  const {
    handleSubmit,
    register,
    reset,
    setValue,
    formState: {errors},
  } = useForm<IWithdrawRegularVRPayload>({
    mode: 'onChange',
    // @ts-ignore
    resolver: yupResolver(validationSchema),
    defaultValues: {
      reason: '',
      sessionId: '',
      vrId: '',
    },
  });

  useEffect(() => {
    setValue('sessionId', dataSession?.Id || '');
    setValue('vrId', dataSession?.Volunteer_Request__c || '');
  }, [dataSession]);

  const mutation = withdrawMutation({
    onSuccess: () => {
      onClose();
      reset();
    },
  });

  const onSubmit = handleSubmit((data) => {
    mutation.mutate(data);
  });

  return (
    <Modal open={show} onClose={onClose} containerProps={{sx: {maxWidth: '728px !important'}}}>
      <form onSubmit={onSubmit}>
        <Modal.Header
          title='Session Registration Status'
          subtitle='Applied in 03/11/2022, 00:00 PM'
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
              <Typography fontWeight={'medium'}>Registered</Typography>
            </Box>
          </Stack>
          <Grid container spacing={4}>
            <DataItem label='My Status' value={dataSession?.assigneeStatus || ''} />
            <DataItem
              label='Date'
              value={dayjs(dataSession?.Session_Date__c).format('DD/MM/YYYY')}
            />
            <DataItem
              label='Start Time'
              value={dataSession?.Start_Time__c?.substring(0, 5) || '-'}
            />
            <DataItem label='End Time' value={dataSession?.End_Time__c?.substring(0, 5) || '-'} />
            <DataItem
              label='Number of Signup'
              value={dataSession?.Number_of_Sign_ups__c?.toString() || '-'}
            />
            <DataItem
              label='Max Number of Volunteer Required'
              value={dataSession?.Max_Num_of_Volunteer__c?.toString() || '-'}
            />
            <DataItem label='Description' value={dataSession?.Description__c || '-'} />
          </Grid>
          <Box mt={4}>
            <InputFloating
              label='Reason'
              {...register('reason')}
              error={!!errors?.reason?.message}
            />
            <ErrorMessage message={errors?.reason?.message} />
          </Box>
        </Modal.Body>
        <Modal.Footer justifyContent={'flex-end'} spacing={4} divider onCancel={onClose}>
          <Button color='error' type='submit' disabled={mutation.isLoading}>
            Withdraw
            <Render in={mutation.isLoading}>
              <CircularProgress sx={{ml: 2}} />
            </Render>
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
  );
};

export default ModalWithdraw;
