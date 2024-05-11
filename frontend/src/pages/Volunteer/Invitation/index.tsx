import {DataItem} from '@/pages/Orientation/Components/DataItem';
import {HeaderOrientation} from '@/pages/Orientation/Components/HeaderOrientetion';
import {OrientationLayoutPage} from '@/pages/Orientation/Components/LayoutPage';
import {
  Box,
  Button,
  Card,
  Chip,
  Collapse,
  Stack,
  Typography,
  CircularProgress,
} from '@mui/material';
import {useState} from 'react';
import classes from '../../Orientation/orientation.style.module.scss';
import {invitationStyles} from '../../Orientation/Invitation';
import {useVolunteerRequestHook} from '@/hooks/use-volunteerRequest.hooks';
import {useParams} from 'react-router-dom';
import Render from '@/components/Render';
import dayjs from 'dayjs';
import {EAssigneeStatus} from '@/interface/volunteerRequest.interface';
import ModalConfirm, {
  IModalConfirmProps,
} from '@/features/dashboard/activities/detail/ui/ModalConfirm';

const chipColor: {[key in EAssigneeStatus]: 'info' | 'success' | 'error'} = {
  Selected: 'info',
  Contacted: 'info',
  Registered: 'info',
  Accepted: 'success',
  Rejected: 'error',
  Declined: 'error',
  Cancelled: 'error',
  Withdrawn: 'error',
  Suspended: 'error',
};

export const VolunteerRequestInvitation = () => {
  const [isRegistered, setIsRegistered] = useState(false);
  const {assignedId} = useParams();
  const {getAssignedVolunteerQuery, invitationVRMutation} = useVolunteerRequestHook();
  const {data: dataVR, isLoading} = getAssignedVolunteerQuery({assignedId: assignedId || ''});
  const formatTime = (time: string) => {
    return dayjs(time.split('.')[0], 'HH:mm:ss').format('hh:mm A');
  };
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
      title: 'Withdraw from event',
      description:
        'Are you sure you want to withdraw from this event? This action cannot be undone.',
      onConfirm: () => {
        invitationVRMutation.mutate({
          assignedId: assignedId || '',
          status: EAssigneeStatus.WITHDRAWN,
        });
        setHideModalConfirm();
      },
    });
  };

  const onSubmit = (status: EAssigneeStatus) => {
    invitationVRMutation.mutate({
      status: status,
      assignedId: assignedId || '',
    });
  };

  return (
    <OrientationLayoutPage>
      <Box className={classes.Container}>
        <Card className={[classes.Card, classes.Orientation].join(' ')} sx={invitationStyles.card}>
          <HeaderOrientation title='Invitation Volunteer Request' />
          <Render in={isLoading}>
            <CircularProgress />
          </Render>
          <Render in={!!dataVR}>
            <Box className={classes.Body} sx={{paddingX: 2}}>
              <DataItem label='Volunteer Requsest Name'>
                <Typography className={classes.Value}>
                  {dataVR?.Volunteer_Request_Name__r.Name}
                </Typography>
              </DataItem>
              <DataItem label='Start Date'>
                <Typography className={classes.Value}>
                  {dayjs(dataVR?.Start_Date__c).format('DD/MM/YYYY')},{' '}
                  {formatTime(dataVR?.Start_Time__c || '')}
                </Typography>
              </DataItem>
              <DataItem label='End Date'>
                <Typography className={classes.Value}>
                  {dayjs(dataVR?.End_Date__c).format('DD/MM/YYYY')},{' '}
                  {formatTime(dataVR?.End_Time__c || '')}
                </Typography>
              </DataItem>
              <DataItem label='Frequency Type'>
                <Typography className={classes.Value}>{dataVR?.Frequency__c}</Typography>
              </DataItem>

              <DataItem label='Assigned Volunteer Status'>
                <Chip
                  label={dataVR?.Assignee_Status__c}
                  color={chipColor[dataVR?.Assignee_Status__c || EAssigneeStatus.CONTACTED]}
                />
              </DataItem>
              <Collapse in={dataVR?.Assignee_Status__c === EAssigneeStatus.CONTACTED}>
                <Box className={classes.Navigation} mt={4}>
                  <Stack direction='row' spacing={4} sx={{width: '100%'}}>
                    <Button
                      disabled={invitationVRMutation.isLoading}
                      variant='outlined'
                      fullWidth
                      color='inherit'
                      onClick={() => onSubmit(EAssigneeStatus.DECLINED)}
                    >
                      Decline
                    </Button>
                    <Button
                      disabled={invitationVRMutation.isLoading}
                      fullWidth
                      variant='contained'
                      type='submit'
                      sx={{minWidth: 200}}
                      onClick={() => onSubmit(EAssigneeStatus.ACCEPTED)}
                    >
                      Accept
                    </Button>
                  </Stack>
                </Box>
              </Collapse>
              <Collapse in={dataVR?.Assignee_Status__c === EAssigneeStatus.ACCEPTED}>
                <Box className={classes.Navigation}>
                  <Button
                    fullWidth
                    color='error'
                    variant='contained'
                    type='submit'
                    sx={{minWidth: 200}}
                    onClick={onWithdraw}
                    disabled={invitationVRMutation.isLoading}
                  >
                    Withdraw
                  </Button>
                </Box>
              </Collapse>
            </Box>
          </Render>
        </Card>
      </Box>

      <ModalConfirm {...modalConfirm} />
    </OrientationLayoutPage>
  );
};
