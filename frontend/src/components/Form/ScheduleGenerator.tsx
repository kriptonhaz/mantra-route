import {neutral} from '@/themes/ts/colors';
import {
  Box,
  CircularProgress,
  Collapse,
  Divider,
  Grid,
  Paper,
  SxProps,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from '@mui/material';
import {useEffect, useState} from 'react';
import {Button} from '../Button/ThemedButton';
import FeatherIcon from '../FeatherIcon/FeatherIcon';
import InputFloating from '../InputFloating/InputFloating';
import InputFloatingDate from '../InputFloating/InputFloatingDate';
import InputFloatingTime from '../InputFloating/InputFloatingTime';
import dayjs, {Dayjs} from 'dayjs';
import {useForm, Controller, SubmitHandler} from 'react-hook-form';
import {ICalendarGeneratorEvent} from '../Calendar';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';

const styles: {
  root: SxProps;
  header: SxProps;
  chevron: SxProps;
  divider: SxProps;
  action: SxProps;
  button: SxProps;
  group: SxProps;
  toggletwo: SxProps;
  togglefour: SxProps;
  time: SxProps;
  collapse: SxProps;
} = {
  root: {
    borderColor: neutral[200],
    borderWidth: 1,
    borderStyle: 'solid',
    padding: 4,
    marginBottom: 4,
  },
  header: {display: 'flex', justifyContent: 'space-between'},
  chevron: {color: neutral[700]},
  divider: {marginY: 4},
  action: {display: {xs: 'none', md: 'flex'}, justifyContent: 'flex-end'},
  button: {marginX: 2},
  group: {width: '100%'},
  toggletwo: {width: '50%'},
  togglefour: {width: '25%'},
  time: {display: 'flex', justifyContent: {xs: 'flex-start', md: 'center'}, alignItems: 'center'},
  collapse: {padding: 3},
};

export interface ScheduleGeneratorProps {
  listEvent: ICalendarGeneratorEvent[];
  setListEvent: (list: ICalendarGeneratorEvent[]) => void;
  onClearEvent: () => void;
  onSubmitEvent: () => void;
  isLoading?: boolean;
}

export type volunteerType = 'individual' | 'organisation';
export type scheduleType = 'regular' | 'adhoc';
export type sessionType = 'morning' | 'afternoon';
export type locationType = 'PR' | 'MP' | 'OTHER';
export interface scheduleGeneratorInput {
  startDate: string;
  endDate: string;
  volunteerType: volunteerType;
  maxVolunteer: number;
  scheduleType: scheduleType;
  sessionType: sessionType;
  startTime: Dayjs;
  endTime: Dayjs;
  location: locationType;
  postalCode?: string;
  unitNumber?: string;
}

export const scheduleGeneratorSchema = yup.object().shape({
  startDate: yup.string().required(),
  endDate: yup.string().required(),
  volunteerType: yup.mixed<volunteerType>().required(),
  maxVolunteer: yup
    .number()
    .typeError('value must be a number')
    .required('Field is required')
    .min(1, "Volunteer number can't 0"),
  scheduleType: yup.mixed<scheduleType>().required(),
  sessionType: yup.mixed<sessionType>().required(),
  startTime: yup.string().required(),
  endTime: yup.string().required(),
  location: yup.mixed<locationType>().required(),
  postalCode: yup.string(),
  unitNumber: yup.string(),
});

export const ScheduleGenerator = (props: ScheduleGeneratorProps) => {
  const {listEvent, isLoading = false, setListEvent, onClearEvent, onSubmitEvent} = props;
  const {
    register,
    control,
    watch,
    setValue,
    handleSubmit,
    formState: {errors},
  } = useForm<scheduleGeneratorInput>({
    // @ts-ignore
    resolver: yupResolver(scheduleGeneratorSchema),
    defaultValues: {
      startDate: undefined,
      endDate: undefined,
      volunteerType: 'individual',
      maxVolunteer: undefined,
      scheduleType: 'regular',
      sessionType: 'morning',
      startTime: dayjs().set('hour', 9).set('minute', 30),
      endTime: dayjs().set('hour', 12).set('minute', 0),
      location: 'MP',
      postalCode: '',
      unitNumber: '',
    },
  });
  const [isScheduling, setIsScheduling] = useState(true);

  useEffect(() => {
    if (watch('sessionType') === 'morning') {
      setValue('startTime', dayjs().set('hour', 9).set('minute', 30));
      setValue('endTime', dayjs().set('hour', 12).set('minute', 0));
    } else if (watch('sessionType') === 'afternoon') {
      setValue('startTime', dayjs().set('hour', 14).set('minute', 30));
      setValue('endTime', dayjs().set('hour', 17).set('minute', 0));
    }
  }, [watch('sessionType')]);

  const onCreateEvent: SubmitHandler<scheduleGeneratorInput> = (data) => {
    let _startDate = dayjs(data.startDate);
    let _endDate = dayjs(data.endDate);
    let i = 1;
    let tmpStartDate = _startDate;
    let event = [...listEvent];

    const checkSessionExist = ({
      currentDate,
      session,
      volunteerType,
    }: {
      currentDate: string;
      session: sessionType;
      volunteerType: volunteerType;
    }) => {
      let currentDateEvent = [...listEvent].filter(
        (ar) =>
          ar.startDate === currentDate &&
          ar.sessionType === session &&
          ar.volunteerType === volunteerType,
      );
      return currentDateEvent.length + 1;
    };

    while (tmpStartDate.isSameOrBefore(_endDate)) {
      if (tmpStartDate.day() !== 0 && tmpStartDate.day() !== 6) {
        let tmpEvent: ICalendarGeneratorEvent = {
          id: Math.floor(Math.random() * 100) + 1 + dayjs().valueOf() + i.toString(),
          title: `FP Session ${data.sessionType === 'morning' ? 'M' : 'A'}${checkSessionExist({
            currentDate: tmpStartDate.format('YYYY-MM-DD'),
            session: data.sessionType,
            volunteerType: data.volunteerType,
          })} - 0/${data.maxVolunteer} ${data.scheduleType === 'regular' ? 'R' : 'A'}`,
          start: tmpStartDate.format('YYYY-MM-DD'),
          end: tmpStartDate.format('YYYY-MM-DD'),
          className: data.volunteerType === 'individual' ? 'info' : 'success',
          startDate: tmpStartDate.format('YYYY-MM-DD'),
          endDate: tmpStartDate.format('YYYY-MM-DD'),
          assignedVolunteer: 0,
          volunteerType: data.volunteerType,
          maxVolunteer: data.maxVolunteer,
          scheduleType: data.scheduleType,
          sessionType: data.sessionType,
          numberSession: data.sessionType === 'morning' ? 0 : 1,
          timeStart: watch('startTime'),
          timeEnd: watch('endTime'),
          location: data.location,
          postalCode: data.postalCode,
          unitNumber: data.unitNumber,
        };
        event.push(tmpEvent);
      }
      tmpStartDate = _startDate.add(i, 'day');
      i++;
    }
    setListEvent(event);
  };

  return (
    <Paper sx={styles.root}>
      <Box sx={styles.header}>
        <Typography>Food Package Scheduling</Typography>
        <Button
          variant='outlined'
          sx={styles.chevron}
          onClick={() => setIsScheduling(!isScheduling)}
        >
          {isScheduling ? <FeatherIcon icon='chevron-up' /> : <FeatherIcon icon='chevron-down' />}
        </Button>
      </Box>
      <Divider sx={styles.divider} />
      <Collapse in={isScheduling}>
        <form onSubmit={handleSubmit(onCreateEvent)}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={2}>
              <Typography>Time and date</Typography>
            </Grid>
            <Grid item xs={6} md={4}>
              <Controller
                name='startDate'
                control={control}
                render={({field: {onChange}}) => (
                  <InputFloatingDate
                    label='Start Date'
                    minDate={dayjs().format('YYYY-MM-DD')}
                    onChange={(val) => onChange(val)}
                  />
                )}
              />
            </Grid>
            <Grid item xs={6} md={4}>
              <Controller
                name='endDate'
                control={control}
                render={({field: {onChange}}) => (
                  <InputFloatingDate
                    label='End Date'
                    minDate={
                      watch('startDate') === null
                        ? dayjs().format('YYYY-MM-DD')
                        : (watch('startDate') as string)
                    }
                    maxDate={
                      watch('startDate') === null
                        ? dayjs().endOf('month').format('YYYY-MM-DD')
                        : dayjs(watch('startDate')).endOf('month').format('YYYY-MM-DD')
                    }
                    onChange={(val) => onChange(val)}
                  />
                )}
              />
            </Grid>
            <Grid item xs={6} md={2}></Grid>
            <Grid item xs={12} md={2}>
              <Typography>Type</Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Controller
                name='volunteerType'
                control={control}
                render={({field: {onChange, value}}) => (
                  <ToggleButtonGroup
                    color='primary'
                    value={value}
                    exclusive
                    onChange={(event: React.MouseEvent<HTMLElement>, newType: volunteerType) =>
                      onChange(newType)
                    }
                    aria-label='type'
                    sx={styles.group}
                  >
                    <ToggleButton sx={styles.toggletwo} value='individual'>
                      Individual
                    </ToggleButton>
                    <ToggleButton sx={styles.toggletwo} value='organisation'>
                      Organisation
                    </ToggleButton>
                  </ToggleButtonGroup>
                )}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <InputFloating
                label={'Max Volunteer'}
                {...register('maxVolunteer')}
                type='number'
                error={!!errors?.maxVolunteer?.message}
                helperText={errors?.maxVolunteer?.message}
              />
            </Grid>
            <Grid item xs={6} md={3}></Grid>
            <Grid item xs={12} md={2}>
              <Typography>Schedule Type</Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Controller
                name='scheduleType'
                control={control}
                render={({field: {onChange, value}}) => (
                  <ToggleButtonGroup
                    color='primary'
                    value={value}
                    exclusive
                    onChange={(event: React.MouseEvent<HTMLElement>, newType: scheduleType) =>
                      onChange(newType)
                    }
                    aria-label='scheduleType'
                    sx={styles.group}
                  >
                    <ToggleButton sx={styles.toggletwo} value='regular'>
                      Regular
                    </ToggleButton>
                    <ToggleButton sx={styles.toggletwo} value='adhoc'>
                      Ad-Hoc
                    </ToggleButton>
                  </ToggleButtonGroup>
                )}
              />
            </Grid>
            <Grid item xs={6} md={6}></Grid>
            <Grid item xs={12} md={2}>
              <Typography>Session</Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Controller
                name='sessionType'
                control={control}
                render={({field: {onChange, value}}) => (
                  <ToggleButtonGroup
                    color='primary'
                    value={value}
                    exclusive
                    onChange={(event: React.MouseEvent<HTMLElement>, newType: sessionType) =>
                      onChange(newType)
                    }
                    aria-label='session'
                    sx={styles.group}
                  >
                    <ToggleButton sx={styles.toggletwo} value='morning'>
                      Morning
                    </ToggleButton>
                    <ToggleButton sx={styles.toggletwo} value='afternoon'>
                      Afternoon
                    </ToggleButton>
                  </ToggleButtonGroup>
                )}
              />
            </Grid>
            <Grid item xs={6} md={3}>
              <Controller
                name='startTime'
                control={control}
                render={({field: {onChange, value}}) => (
                  <InputFloatingTime
                    label='Start Time'
                    value={value}
                    onChange={(val) => onChange(dayjs(val))}
                  />
                )}
              />
            </Grid>
            <Grid item xs={6} md={3}>
              <Controller
                name='endTime'
                control={control}
                render={({field: {onChange, value}}) => (
                  <InputFloatingTime
                    label='End Time'
                    value={value}
                    onChange={(val) => onChange(dayjs(val))}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} md={2}>
              <Typography>Location</Typography>
            </Grid>
            <Grid item xs={12} md={7}>
              <Controller
                name='location'
                control={control}
                render={({field: {onChange, value}}) => (
                  <ToggleButtonGroup
                    color='primary'
                    value={value}
                    exclusive
                    onChange={(event: React.MouseEvent<HTMLElement>, newType: locationType) =>
                      onChange(newType)
                    }
                    aria-label='location'
                    sx={styles.group}
                  >
                    <ToggleButton sx={styles.togglefour} value='PR'>
                      PR
                    </ToggleButton>
                    <ToggleButton sx={styles.togglefour} value='MP'>
                      MP
                    </ToggleButton>
                    <ToggleButton sx={styles.togglefour} value='OTHER'>
                      Other
                    </ToggleButton>
                  </ToggleButtonGroup>
                )}
              />
            </Grid>
            <Grid item xs={0} md={3}></Grid>
            <Grid item xs={0} md={2}></Grid>
            <Collapse in={watch('location') === 'OTHER'} sx={styles.collapse}>
              <Grid container spacing={3}>
                <Grid item xs={6}>
                  <Controller
                    name='postalCode'
                    control={control}
                    render={({field: {onChange, value}}) => (
                      <InputFloating label={'Postal Code'} onChange={onChange} value={value} />
                    )}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Controller
                    name='unitNumber'
                    control={control}
                    render={({field: {onChange, value}}) => (
                      <InputFloating label={'Unit Number'} onChange={onChange} value={value} />
                    )}
                  />
                </Grid>
              </Grid>
            </Collapse>
          </Grid>
          <Divider sx={styles.divider} />

          <Box sx={styles.action}>
            <Button sx={styles.button} variant='outlined' onClick={onClearEvent}>
              Clear
            </Button>
            <Button type='submit' sx={styles.button} color='primary' disabled={isLoading}>
              Create Event
            </Button>
            <Button sx={styles.button} color='success' onClick={onSubmitEvent} disabled={isLoading}>
              {isLoading && <CircularProgress color='primary' sx={{margin: 4}} />}
              Submit Event
            </Button>
          </Box>
          <Grid container spacing={2} sx={{display: {xs: 'flex', md: 'none'}}}>
            <Grid item xs={6}>
              <Button fullWidth color='inherit' variant='outlined'>
                Clear
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button fullWidth type='submit' color='primary' disabled={isLoading}>
                Create Event
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Button fullWidth color='success' onClick={onSubmitEvent} disabled={isLoading}>
                {isLoading && <CircularProgress color='primary' sx={{margin: 4}} />}
                Submit Event
              </Button>
            </Grid>
          </Grid>
        </form>
      </Collapse>
    </Paper>
  );
};
