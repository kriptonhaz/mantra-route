import {useInvitationHook} from '@/hooks/use-invitation.hook';
import {AcceptDeclineEventRequestType} from '@/interface/invitation.interface';
import {
  Box,
  Button,
  Card,
  Chip,
  CircularProgress,
  Collapse,
  SxProps,
  Typography,
} from '@mui/material';
import dayjs from 'dayjs';
import {useForm} from 'react-hook-form';
import {useParams} from 'react-router-dom';
import {DataItem} from '../Components/DataItem';
import {HeaderOrientation} from '../Components/HeaderOrientetion';
import {OrientationLayoutPage} from '../Components/LayoutPage';
import classes from '../orientation.style.module.scss';
import {combineClasses} from '@/utils/styles';

export const invitationStyles: {
  card: SxProps;
  action: SxProps;
  actionButton: SxProps;
} = {
  card: {width: {xs: '100%', md: 600}, paddingX: 0},
  action: {display: 'flex', justifyContent: 'space-around', marginTop: 6, marginBottom: 2},
  actionButton: {minWidth: {xs: 150, md: 250}},
};

export const OrientationInvitPage = () => {
  const {idEvent} = useParams();
  const {event, eventAcceptDecline} = useInvitationHook();
  const {data: dataInvitation, isLoading: isLoadingInvitation} = event({
    idEvent: idEvent ?? '',
  });

  const {
    handleSubmit,
    formState: {errors},
  } = useForm<AcceptDeclineEventRequestType>();

  const onAcceptDecline = (status: 'Accepted' | 'Declined') => {
    eventAcceptDecline.reset();
    eventAcceptDecline.mutate({
      eventID: idEvent || '',
      status: status,
    });
  };

  return (
    <OrientationLayoutPage>
      {isLoadingInvitation ? (
        <CircularProgress color='primary' />
      ) : (
        <Box className={combineClasses([classes.Container])}>
          <Card
            className={[classes.Card, classes.Orientation].join(' ')}
            sx={invitationStyles.card}
          >
            <HeaderOrientation title='Invitaiton Event' />
            <Box className={classes.Body}>
              <DataItem label='Volunteer Name'>
                <Typography className={classes.Value}>{dataInvitation?.Who.Name}</Typography>
              </DataItem>
              <DataItem label='Subject'>
                <Typography className={classes.Value}>{dataInvitation?.Subject}</Typography>
              </DataItem>
              <DataItem label='Start Date'>
                <Typography className={classes.Value}>
                  {dayjs(dataInvitation?.StartDateTime).format('DD/MM/YYYY')}
                </Typography>
              </DataItem>
              <DataItem label='End Date'>
                <Typography className={classes.Value}>
                  {dayjs(dataInvitation?.EndDateTime).format('DD/MM/YYYY')}
                </Typography>
              </DataItem>
              <DataItem label='Volunteer Location'>
                <Typography className={classes.Value}>{dataInvitation?.Location}</Typography>
              </DataItem>
              {dataInvitation?.Event_Status__c === 'Invitation Sent' ? (
                <Box className={classes.Navigation} sx={invitationStyles.action}>
                  {eventAcceptDecline.isLoading ? (
                    <CircularProgress color='primary' />
                  ) : (
                    <>
                      <form onSubmit={handleSubmit(() => onAcceptDecline('Declined'))}>
                        <Button type='submit' variant='outlined' sx={invitationStyles.actionButton}>
                          Decline
                        </Button>
                      </form>
                      <form onSubmit={handleSubmit(() => onAcceptDecline('Accepted'))}>
                        <Button
                          type='submit'
                          variant='contained'
                          sx={invitationStyles.actionButton}
                        >
                          Accept
                        </Button>
                      </form>
                    </>
                  )}
                </Box>
              ) : (
                <>
                  <Collapse in={dataInvitation?.Event_Status__c === 'Accepted'}>
                    <DataItem label='Status'>
                      <Chip label='Accepted' color='success' />
                    </DataItem>
                  </Collapse>
                  <Collapse in={dataInvitation?.Event_Status__c === 'Declined'}>
                    <DataItem label='Status'>
                      <Chip label='Declined' color='error' />
                    </DataItem>
                  </Collapse>
                  <Collapse in={dataInvitation?.Event_Status__c === 'Completed'}>
                    <DataItem label='Status'>
                      <Chip label='Completed' color='success' />
                    </DataItem>
                  </Collapse>
                </>
              )}
            </Box>
          </Card>
        </Box>
      )}
    </OrientationLayoutPage>
  );
};
