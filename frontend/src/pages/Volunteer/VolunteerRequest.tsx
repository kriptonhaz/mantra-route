import FeatherIcon from '@/components/FeatherIcon/FeatherIcon';
import InputFloating from '@/components/InputFloating';
import {
  Box,
  Button,
  Card,
  Chip,
  Collapse,
  Typography,
  CircularProgress,
  Alert,
} from '@mui/material';
import {useEffect, useMemo, useState} from 'react';
import {DataItem} from '../Orientation/Components/DataItem';
import {HeaderOrientation} from '../Orientation/Components/HeaderOrientetion';
import {OrientationLayoutPage} from '../Orientation/Components/LayoutPage';
import classes from '../Orientation/orientation.style.module.scss';
import {useVolunteerRequestHook} from '@/hooks/use-volunteerRequest.hooks';
import {useParams} from 'react-router-dom';
import {useForm} from 'react-hook-form';
import Render from '@/components/Render';
import dayjs from 'dayjs';
import {
  IAttendance,
  IVrAttendanceCheckinStatusPayload,
} from '@/interface/volunteerRequest.interface';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import {AxiosError} from 'axios';
import {invitationStyles} from '../Orientation/Invitation';

const schema = yup.object().shape({
  email: yup.string().email().required(),
});

enum FORM_STATUS {
  INIT,
  CHECKIN,
  CHECKOUT,
  ENDED,
}

export const VolunteerRequestPage = () => {
  const {sessionId} = useParams();
  const [checkInTime, setCheckInTime] = useState('');
  const [checkOutTime, setCheckOutTime] = useState('');
  const [attendance, setAttendance] = useState<IAttendance | null>(null);
  const [isSubmited, setIsSubmited] = useState(false);
  const [formStatus, setformStatus] = useState<FORM_STATUS>(FORM_STATUS.INIT);
  const {
    vrAttendanceQuery,
    getStatusVRAttendanceMutation,
    checkinVRAttendanceMutation,
    checkoutVRAttendanceMutation,
  } = useVolunteerRequestHook();
  const {data: dataVR, isLoading} = vrAttendanceQuery(sessionId || '');
  const dateTimeData = useMemo(() => {
    if (dataVR) {
      let startDateTime =
        dayjs(dataVR?.volunteerSession.Session_Date__c).format('DD MMMM YYYY') +
        ', ' +
        dayjs(dataVR.volunteerSession.Start_Time__c.split('.')[0], 'HH:mm:ss').format('hh:mm A');
      let endDateTime =
        dayjs(dataVR?.volunteerSession.Session_Date__c).format('DD MMMM YYYY') +
        ', ' +
        dayjs(dataVR.volunteerSession.End_Time__c.split('.')[0], 'HH:mm:ss').format('hh:mm A');
      return {startDateTime, endDateTime};
    }
    return {
      startDateTime: '',
      endDateTime: '',
    };
  }, [dataVR]);

  const isPlanned = useMemo(() => {
    return dayjs().isBefore(dataVR?.volunteerSession.Session_Date__c, 'd');
  }, [dataVR?.volunteerSession.Session_Date__c]);

  const {
    handleSubmit,
    watch,
    register,
    formState: {errors},
    setError,
  } = useForm<IVrAttendanceCheckinStatusPayload>({
    mode: 'onChange',
    // @ts-ignore
    resolver: yupResolver(schema),
    defaultValues: {
      sessionId: sessionId,
      email: '',
    },
  });

  const checkEmailMutation = getStatusVRAttendanceMutation({
    onSuccess(data) {
      setIsSubmited(true);
      setformStatus(FORM_STATUS.CHECKIN);
      if (data.attendances?.length > 0) {
        const lastAttendance = data.attendances[data.attendances.length - 1];
        setAttendance(lastAttendance);
        setCheckInTime(lastAttendance.Checked_In__c || '');
        setCheckOutTime(lastAttendance.Checked_Out__c || '');
        if (!!lastAttendance.Checked_In__c) setformStatus(FORM_STATUS.CHECKOUT);
        if (!!lastAttendance.Checked_Out__c) setformStatus(FORM_STATUS.ENDED);
      }
    },
    onError(error) {
      if (error instanceof AxiosError) {
        const statusCode = error.response?.status || 0;
        if (400 <= statusCode && statusCode < 500) {
          setError('email', error.response?.data);
        }
      }
    },
  });

  const checkinMutation = checkinVRAttendanceMutation({
    onSuccess(data) {
      setformStatus(FORM_STATUS.CHECKOUT);
      setCheckInTime(data.attendance.Checked_In__c);
    },
  });

  const checkoutMutation = checkoutVRAttendanceMutation({
    onSuccess(data) {
      setformStatus(FORM_STATUS.ENDED);
      setCheckOutTime(data.attendance.Checked_Out__c);
    },
  });

  const onSubmitEmail = handleSubmit((data) => {
    checkEmailMutation.mutate(data);
  });

  const onCheckin = () => {
    checkinMutation.mutate({
      email: watch('email'),
      sessionId: watch('sessionId'),
    });
  };

  const onCheckout = () => {
    checkoutMutation.mutate({
      email: watch('email'),
      sessionId: watch('sessionId'),
    });
  };

  return (
    <OrientationLayoutPage>
      <Render in={isLoading}>
        <CircularProgress />
      </Render>
      <Render in={!isLoading}>
        <Box className={classes.Container}>
          <Card
            className={[classes.Card, classes.Orientation].join(' ')}
            sx={invitationStyles.card}
          >
            <HeaderOrientation title='Volunteer Request Attendance' />
            <Box className={classes.Body} sx={{paddingX: 2}}>
              <DataItem label='Volunteer Request Name'>
                <Typography className={classes.Value}>
                  {dataVR?.volunteerSession.Volunteer_Request__r.Name || '-'}
                </Typography>
              </DataItem>
              <DataItem label='Start Date'>
                <Typography className={classes.Value}>{dateTimeData.startDateTime}</Typography>
              </DataItem>
              <DataItem label='End Date'>
                <Typography className={classes.Value}>{dateTimeData.endDateTime}</Typography>
              </DataItem>
              <DataItem label='Frequency Type'>
                <Typography className={classes.Value}>
                  {dataVR?.volunteerSession.Session_Type__c || '-'}
                </Typography>
              </DataItem>
              <DataItem label='Status'>
                <Chip label={dataVR?.volunteerSession.Session_Status__c} color='info' />
              </DataItem>
              <Render in={formStatus !== FORM_STATUS.INIT}>
                <DataItem label='Email'>
                  <Typography className={classes.Value}>{watch('email')}</Typography>
                </DataItem>
              </Render>
              <Render in={!!checkInTime}>
                <DataItem label='Check-in Time'>
                  <Typography className={classes.Value}>
                    {dayjs(checkInTime).format('DD MMMM YYYY, hh:mm A')}
                  </Typography>
                </DataItem>
              </Render>
              <Render in={!!checkOutTime}>
                <DataItem label='Check-out Time'>
                  <Typography className={classes.Value}>
                    {dayjs(checkOutTime).format('DD MMMM YYYY, hh:mm A')}
                  </Typography>
                </DataItem>
              </Render>

              <Render in={!isPlanned}>
                <Collapse in={!isSubmited}>
                  <form onSubmit={onSubmitEmail}>
                    <InputFloating
                      fullwidth
                      label='Email'
                      type='email'
                      {...register('email')}
                      error={!!errors?.email?.message}
                      helperText={errors?.email?.message}
                      startIcon={<FeatherIcon icon='mail' />}
                    />
                    <Box className={classes.Navigation} sx={{mt: 2}}>
                      <Button
                        disabled={checkEmailMutation.isLoading}
                        fullWidth
                        variant='contained'
                        type='submit'
                        sx={{minWidth: 200}}
                      >
                        Submit
                      </Button>
                    </Box>
                  </form>
                </Collapse>
                <Collapse in={formStatus === FORM_STATUS.CHECKIN}>
                  <Box className={classes.Navigation} sx={{mt: 2}}>
                    <Button
                      fullWidth
                      variant='contained'
                      type='submit'
                      sx={{minWidth: 200}}
                      onClick={onCheckin}
                      disabled={checkinMutation.isLoading}
                    >
                      Check-in
                    </Button>
                  </Box>
                </Collapse>
                <Collapse in={formStatus === FORM_STATUS.CHECKOUT}>
                  <Box mt={3}>
                    <Alert
                      severity='success'
                      sx={{display: 'flex', justifyContent: 'center'}}
                      icon={<FeatherIcon icon='check-circle' />}
                    >
                      Checked In successfully!
                    </Alert>
                  </Box>
                  <Box className={classes.Navigation} sx={{mt: 2}}>
                    <Button
                      fullWidth
                      variant='contained'
                      type='submit'
                      sx={{minWidth: 200}}
                      onClick={onCheckout}
                      disabled={checkoutMutation.isLoading}
                    >
                      Check-out
                    </Button>
                  </Box>
                </Collapse>
                <Collapse in={formStatus === FORM_STATUS.ENDED}>
                  <Alert
                    severity='success'
                    sx={{display: 'flex', justifyContent: 'center', mt: 2}}
                    icon={<FeatherIcon icon='check-circle' />}
                  >
                    Checked Out successfully!
                  </Alert>
                </Collapse>
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
      </Render>
    </OrientationLayoutPage>
  );
};
