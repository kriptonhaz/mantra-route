import ModalConfirm, {
  IModalConfirmProps,
} from '@/features/dashboard/activities/detail/ui/ModalConfirm';
import {useInvitationHook} from '@/hooks/use-invitation.hook';
import {
  EParticipantStatus,
  RegisterWithdrawInvitationRequestType,
} from '@/interface/invitation.interface';
import {neutral} from '@/themes/ts/colors';
import {
  Box,
  Button,
  Card,
  Chip,
  CircularProgress,
  Paper,
  Stack,
  SxProps,
  Typography,
} from '@mui/material';
import dayjs from 'dayjs';
import {useState} from 'react';
import {useForm} from 'react-hook-form';
import {useParams} from 'react-router-dom';
import {DataItem} from '../Orientation/Components/DataItem';
import {HeaderOrientation} from '../Orientation/Components/HeaderOrientetion';
import {OrientationLayoutPage} from '../Orientation/Components/LayoutPage';
import {invitationStyles} from '../Orientation/Invitation';
import classes from '../Orientation/orientation.style.module.scss';
import Render from '@/components/Render';

const styles: {paper: SxProps; loading: SxProps} = {
  paper: {
    paddingY: 3,
    marginTop: 2,
    textAlign: 'center',
    backgroundColor: neutral[50],
  },
  loading: {display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 2},
};

export const ProgrammeInvitationPage = () => {
  const {idParticipant} = useParams();
  const {programmeInvitation, onRegisterWithdrawProgramme} = useInvitationHook();
  const {data: dataInvitation, isLoading: isLoadingInvitation} = programmeInvitation({
    idParticipant: idParticipant ?? '',
  });

  const [modalConfirm, setModalConfirm] = useState<IModalConfirmProps>({
    show: false,
    title: '',
    description: '',
    color: 'info',
    onClose: () => setHideModalConfirm(),
    onConfirm: () => null,
  });

  const setHideModalConfirm = () => {
    setModalConfirm({
      ...modalConfirm,
      show: false,
    });
  };

  const onWithdraw = () => {
    setModalConfirm({
      ...modalConfirm,
      show: true,
      color: 'error',
      title: 'Withdraw from programme',
      description:
        'Are you sure you want to withdraw from this programme? This action cannot be undone.',
      onConfirm: () => {
        onRegisterWithdraw(EParticipantStatus.WITHDRAW);
        setHideModalConfirm();
      },
    });
  };

  const {
    handleSubmit,
    setValue,
    formState: {errors},
  } = useForm<RegisterWithdrawInvitationRequestType>();

  const onRegisterWithdraw = (status: EParticipantStatus) => {
    onRegisterWithdrawProgramme.reset();
    onRegisterWithdrawProgramme.mutate({
      status: status,
      programmeEventID: dataInvitation?.Programme_Event__r.Id ?? '',
      participantID: idParticipant ?? '',
    });
  };

  const submitInvitation = (status: EParticipantStatus) => {
    setValue('status', status);
    const payload = {
      participantID: idParticipant || '',
      programmeEventID: dataInvitation?.Programme_Event__r.Id || '',
      status: status,
    };
    onRegisterWithdrawProgramme.mutate(payload);
  };

  return (
    <OrientationLayoutPage>
      {isLoadingInvitation ? (
        <CircularProgress color='primary' />
      ) : (
        <Box className={classes.Container}>
          <Card
            className={[classes.Card, classes.Orientation].join(' ')}
            sx={invitationStyles.card}
          >
            <HeaderOrientation title='Invitation Programme' />
            <Box className={classes.Body}>
              <DataItem label='Programme Name'>
                <Typography className={classes.Value}>
                  {dataInvitation?.Programme_Event__r.Name}
                </Typography>
              </DataItem>
              <DataItem label='Start Date'>
                <Typography className={classes.Value}>
                  {dayjs(dataInvitation?.Programme_Event__r.Start_Date_Time__c).format(
                    'DD/MM/YYYY',
                  )}
                </Typography>
              </DataItem>
              <DataItem label='End Date'>
                <Typography className={classes.Value}>
                  {dayjs(dataInvitation?.Programme_Event__r.End_Date_Time__c).format('DD/MM/YYYY')}
                </Typography>
              </DataItem>
              <DataItem label='Venue'>
                <Typography className={classes.Value}>
                  {dataInvitation?.Programme_Event__r.Venue_of_Event_or_Mobilisation__c}
                </Typography>
              </DataItem>
              <DataItem label='Programme Description'>
                <Typography className={classes.Value}>
                  {dataInvitation?.Programme_Event__r.Programme_Description__c}
                </Typography>
              </DataItem>
              <DataItem label='Status'>
                <Chip
                  label={dataInvitation?.Programme_Event__r.Programme_Stage__c}
                  color={
                    dataInvitation?.Programme_Event__r.Programme_Stage__c === 'Ended'
                      ? 'error'
                      : 'info'
                  }
                />
              </DataItem>
              <DataItem label='Participant Status'>
                <Chip
                  label={dataInvitation?.Status__c}
                  color={dataInvitation?.Status__c === 'Withdraw' ? 'error' : 'success'}
                />
              </DataItem>
              {onRegisterWithdrawProgramme.isLoading ? (
                <Box sx={styles.loading}>
                  <CircularProgress color='primary' />
                </Box>
              ) : (
                <>
                  <Render
                    in={
                      dataInvitation?.Status__c === EParticipantStatus.INVITATION_SENT &&
                      dataInvitation?.Programme_Event__r.Programme_Stage__c !== 'Ended'
                    }
                  >
                    <Box className={classes.Navigation} sx={invitationStyles.action}>
                      <Stack direction='row' spacing={4} sx={{width: '100%'}}>
                        <Button
                          variant='outlined'
                          fullWidth
                          color='inherit'
                          onClick={() => submitInvitation(EParticipantStatus.DECLINED)}
                        >
                          Decline
                        </Button>
                        <Button
                          variant='contained'
                          fullWidth
                          onClick={() => submitInvitation(EParticipantStatus.ACCEPTED)}
                        >
                          Accept
                        </Button>
                      </Stack>
                    </Box>
                  </Render>
                  {dataInvitation?.Status__c === EParticipantStatus.ACCEPTED ? (
                    <form onSubmit={handleSubmit(() => onWithdraw())}>
                      <Box className={classes.Navigation} sx={invitationStyles.action}>
                        <Button type='submit' variant='contained' color='error' fullWidth>
                          Withdraw
                        </Button>
                      </Box>
                    </form>
                  ) : (
                    ''
                  )}
                </>
              )}
              {dataInvitation?.Programme_Event__r.Programme_Stage__c === 'Ended' ? (
                <Paper sx={styles.paper}>
                  <Typography>This programme has ended</Typography>
                </Paper>
              ) : (
                ''
              )}
            </Box>
          </Card>
        </Box>
      )}
      <ModalConfirm
        show={modalConfirm.show}
        onClose={modalConfirm.onClose}
        title={modalConfirm.title}
        description={modalConfirm.description}
        color={modalConfirm.color}
        onConfirm={modalConfirm.onConfirm}
      />
    </OrientationLayoutPage>
  );
};
