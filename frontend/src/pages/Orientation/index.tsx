import {useInvitationHook} from '@/hooks/use-invitation.hook';
import {Alert, Box, Card, CircularProgress, Typography} from '@mui/material';
import dayjs from 'dayjs';
import {useParams} from 'react-router-dom';
import {CheckinForm} from './Components/CheckinForm';
import {DataItem} from './Components/DataItem';
import {HeaderOrientation} from './Components/HeaderOrientetion';
import {OrientationLayoutPage} from './Components/LayoutPage';
import {invitationStyles} from './Invitation';
import classes from './orientation.style.module.scss';
import {useMemo} from 'react';
import Render from '@/components/Render';
import FeatherIcon from '@/components/FeatherIcon/FeatherIcon';

export const OrientationPage = () => {
  const {idEvent} = useParams();
  const {event} = useInvitationHook();
  const {data: dataInvitation, isLoading: isLoadingInvitation} = event({
    idEvent: idEvent ?? '',
  });
  const isPlanned = useMemo(() => {
    return dayjs().isBefore(dayjs(dataInvitation?.StartDateTime));
  }, [dataInvitation?.StartDateTime]);

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
            <HeaderOrientation title='Orientation Event' />
            <Box className={classes.Body} sx={{paddingX: 2}}>
              <DataItem label='Subject'>
                <Typography className={classes.Value}>{dataInvitation?.Subject}</Typography>
              </DataItem>
              <DataItem label='Start Date'>
                <Typography className={classes.Value}>
                  {dayjs(dataInvitation?.StartDateTime).format('DD/MM/YYYY')}
                </Typography>
              </DataItem>
              <DataItem label='Volunteer Location'>
                <Typography className={classes.Value}>{dataInvitation?.Location}</Typography>
              </DataItem>
              <Render in={isPlanned}>
                <Alert
                  severity='info'
                  sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 2}}
                  icon={<FeatherIcon icon='info' />}
                  className='alert-neutral'
                >
                  This event has not started yet, please come back to this link once the event has
                  started!
                </Alert>
              </Render>
              <Render in={!isPlanned}>
                <CheckinForm idEvent={idEvent} />
              </Render>
            </Box>
          </Card>
        </Box>
      )}
    </OrientationLayoutPage>
  );
};
