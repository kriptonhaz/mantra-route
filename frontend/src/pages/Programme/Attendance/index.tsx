import {useInvitationHook} from '@/hooks/use-invitation.hook';
import {DataItem} from '@/pages/Orientation/Components/DataItem';
import {HeaderOrientation} from '@/pages/Orientation/Components/HeaderOrientetion';
import {OrientationLayoutPage} from '@/pages/Orientation/Components/LayoutPage';
import {invitationStyles} from '@/pages/Orientation/Invitation';
import {Alert, Box, Card, Chip, CircularProgress, Typography} from '@mui/material';
import dayjs from 'dayjs';
import {useParams} from 'react-router-dom';
import classes from '../../Orientation/orientation.style.module.scss';
import {AttendanceForm} from './Components/Attendanceform';
import Render from '@/components/Render';
import FeatherIcon from '@/components/FeatherIcon/FeatherIcon';
import {useMemo} from 'react';

export const ProgrammeEventAttendance = () => {
  const {programmeId} = useParams();
  const {programmeQuery} = useInvitationHook();
  const {data: dataInvitation, isLoading: isLoadingInvitation} = programmeQuery(programmeId || '');
  const isPlanned = useMemo(() => {
    return dayjs().isBefore(dayjs(dataInvitation?.Start_Date_Time__c).format('YYYY-MM-DD'), 'd');
  }, [dataInvitation?.Start_Date_Time__c]);

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
            <HeaderOrientation title='Programme Event Attendance' />
            <Box className={classes.Body} sx={{paddingX: 2}}>
              <DataItem label='Programme Event Name'>
                <Typography className={classes.Value}>{dataInvitation?.Name}</Typography>
              </DataItem>
              <DataItem label='Start Date'>
                {dayjs(dataInvitation?.Start_Date_Time__c).format('DD MMMM YYYY, hh:mm A')}
              </DataItem>
              <DataItem label='End Date'>
                {dayjs(dataInvitation?.End_Date_Time__c).format('DD MMMM YYYY, hh:mm A')}
              </DataItem>
              <DataItem label='Frequency Type'>
                <Typography className={classes.Value}>
                  {dataInvitation?.Frequency__c || '-'}
                </Typography>
              </DataItem>
              <DataItem label='Status'>
                <Chip
                  label={dataInvitation?.Programme_Stage__c}
                  color={dataInvitation?.Programme_Stage__c === 'Ended' ? 'error' : 'info'}
                />
              </DataItem>
              <Render in={!isPlanned}>
                <AttendanceForm idProgramme={programmeId} />
              </Render>
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
            </Box>
          </Card>
        </Box>
      )}
    </OrientationLayoutPage>
  );
};
