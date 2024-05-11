import salesForceLogo from '@/assets/img/salesforce.png';
import InputFloating from '@/components/InputFloating/InputFloating';
import {neutral} from '@/themes/ts/colors';
import {Box, Button, Grid, SxProps} from '@mui/material';
import {Footer} from './Components/SessionFooter';
import {SessionModalHeader} from './Components/SessionHeader';
import {InfoItem} from './Components/SessionInfo';
import {Body, Modal} from './Components/SessionModal';
import {ICalendarGeneratorEvent} from '@/components/Calendar';
import {
  locationType,
  scheduleGeneratorInput,
  scheduleGeneratorSchema,
  scheduleType,
  sessionType,
  volunteerType,
} from '@/components/Form/ScheduleGenerator';
import dayjs, {Dayjs} from 'dayjs';
import {toTitleCase} from '@/utils/string';
import Select from '@/components/Select';
import {useForm, Controller, SubmitHandler} from 'react-hook-form';
import Render from '@/components/Render';
import InputFloatingTime from '@/components/InputFloating/InputFloatingTime';
import {useEffect, useState} from 'react';
import {yupResolver} from '@hookform/resolvers/yup';

export interface ISessionEditForm {
  volunteerType: string;
  scheduleType: string;
  session: string;
  startTime: Dayjs;
  endTime: Dayjs;
  location: string;
  maxVolunteer: number;
}

export interface ISessionModalProps {
  show: boolean;
  isEdit: boolean;
  event: null | ICalendarGeneratorEvent;
  onClose: () => void;
  onConfirm?: () => void;
  onDelete?: () => void;
  onSave?: (item: ICalendarGeneratorEvent) => void;
  listEvent?: ICalendarGeneratorEvent[];
}

const sessionStyles: {footer: SxProps; action: SxProps; close: SxProps} = {
  footer: {display: 'flex', justifyContent: 'flex-end', width: '100%'},
  action: {marginX: 3},
  close: {marginX: 3, color: neutral[700]},
};

export const ModalSessionDetail = (props: ISessionModalProps) => {
  const {show, event, listEvent, onClose, onConfirm, onDelete, onSave} = props;
  const [isEdit, setIsEdit] = useState<boolean>(props.isEdit);

  const {
    register,
    control,
    watch,
    handleSubmit,
    setValue,
    formState: {errors},
  } = useForm<scheduleGeneratorInput>({
    mode: 'onChange',
    // @ts-ignore
    resolver: yupResolver(scheduleGeneratorSchema),
  });

  useEffect(() => {
    if (show) {
      setIsEdit(props.isEdit);
    }
  }, [show, props.isEdit]);

  const renderSession = (props: {
    session: sessionType | undefined;
    startTime: Dayjs | string | undefined;
    endTime: Dayjs | string | undefined;
  }): string => {
    if (props.session && props.startTime && props.endTime) {
      return `${toTitleCase(props.session)}, ${dayjs(props.startTime).format('HH:mm')} - ${dayjs(
        props.endTime,
      ).format('HH:mm')}`;
    } else {
      return toTitleCase('');
    }
  };

  useEffect(() => {
    if (event) {
      setValue('startDate', event?.startDate);
      setValue('endDate', event?.endDate);
      setValue('volunteerType', event?.volunteerType);
      setValue('scheduleType', event?.scheduleType);
      setValue('sessionType', event?.sessionType);
      setValue('location', event?.location);
      setValue('maxVolunteer', event?.maxVolunteer || 0);
      setValue('startTime', event?.timeStart as Dayjs);
      setValue('endTime', event?.timeEnd as Dayjs);
      setValue('postalCode', event?.postalCode);
      setValue('unitNumber', event?.unitNumber);
    }
  }, [event]);

  useEffect(() => {
    if (watch('sessionType') === 'morning') {
      setValue('startTime', dayjs().set('hour', 9).set('minute', 30));
      setValue('endTime', dayjs().set('hour', 12).set('minute', 0));
    } else if (watch('sessionType') === 'afternoon') {
      setValue('startTime', dayjs().set('hour', 14).set('minute', 30));
      setValue('endTime', dayjs().set('hour', 17).set('minute', 0));
    }
  }, [watch('sessionType')]);

  const onSubmit: SubmitHandler<scheduleGeneratorInput> = (data) => {
    const checkSessionExist = ({
      currentDate,
      session,
      volunteerType,
    }: {
      currentDate: string;
      session: sessionType;
      volunteerType: volunteerType;
    }) => {
      if (listEvent) {
        let currentDateEvent = [...listEvent].filter(
          (ar) =>
            ar.startDate === currentDate &&
            ar.sessionType === session &&
            ar.volunteerType === volunteerType,
        );
        return currentDateEvent.length + 1;
      } else {
        return 0;
      }
    };

    if (onSave && event?.id) {
      let itemCalendar: ICalendarGeneratorEvent = {
        id: event?.id,
        title: `FP Session ${data.sessionType === 'morning' ? 'M' : 'A'}${checkSessionExist({
          currentDate: data.startDate,
          session: data.sessionType,
          volunteerType: data.volunteerType,
        })} - 0/${data.maxVolunteer} ${data.scheduleType === 'regular' ? 'R' : 'A'}`,
        start: data.startDate,
        end: data.endDate,
        className: data.volunteerType === 'individual' ? 'info' : 'success',
        startDate: data.startDate,
        endDate: data.endDate,
        volunteerType: data.volunteerType,
        assignedVolunteer: 0,
        maxVolunteer: data.maxVolunteer,
        scheduleType: data.scheduleType,
        numberSession: data.sessionType === 'morning' ? 0 : 1,
        sessionType: data.sessionType,
        timeStart: watch('startTime'),
        timeEnd: watch('endTime'),
        location: data.location,
      };
      onSave(itemCalendar);
    }
  };

  return (
    <Modal open={show} onClose={onClose}>
      <SessionModalHeader
        title={event?.title}
        divider
        onClose={onClose}
        onDelete={onDelete}
        isEdit={event?.sfId ? false : true}
        icon={{
          icon: (
            <Box component='img' src={salesForceLogo} display={event?.sfId ? 'block' : 'none'} />
          ),
        }}
      />
      <form onSubmit={handleSubmit(onSubmit)}>
        <Body>
          <Render in={!!event}>
            <Render in={!isEdit}>
              <Grid container spacing={4}>
                <Grid item xs={12} md={6}>
                  <InfoItem
                    title='Volunteer Type'
                    info={toTitleCase(event?.volunteerType || '-')}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <InfoItem title='Schedule Type' info={toTitleCase(event?.scheduleType || '-')} />
                </Grid>
                <Grid item xs={12} md={6}>
                  <InfoItem
                    title='Assigned Volunteer'
                    info={event?.assignedVolunteer.toString() || '-'}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <InfoItem
                    title='Max Number of Volunteer'
                    info={event?.maxVolunteer.toString() || '-'}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <InfoItem
                    title='Session'
                    info={renderSession({
                      session: event?.sessionType,
                      startTime: event?.timeStart,
                      endTime: event?.timeEnd,
                    })}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <InfoItem title='Volunteer Location' info={event?.location || '-'} />
                </Grid>
                {event?.volunteerType === 'organisation' && (
                  <>
                    <Grid item xs={12} md={6}>
                      <InfoItem title='Company Name' info={event?.companyName || '-'} />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <InfoItem title='Contact Name' info={event?.contactName || '-'} />
                    </Grid>
                  </>
                )}
              </Grid>
            </Render>
            <Render in={isEdit}>
              <Grid container spacing={4}>
                <Grid item xs={12} md={6}>
                  <Controller
                    control={control}
                    name='volunteerType'
                    render={({field: {onChange, value}}) => (
                      <Select
                        label='Volunteer Type'
                        onChange={(event) => {
                          if (event.target) {
                            onChange(event.target.value as volunteerType);
                          }
                        }}
                        value={value}
                        options={[
                          {label: 'Individual', value: 'individual'},
                          {label: 'Organisation', value: 'organisation'},
                        ]}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Controller
                    control={control}
                    name='scheduleType'
                    render={({field: {onChange, value}}) => (
                      <Select
                        label='Schedule Type'
                        onChange={(event) => {
                          if (event.target) {
                            onChange(event.target.value as scheduleType);
                          }
                        }}
                        value={value}
                        options={[
                          {label: 'Regular', value: 'regular'},
                          {label: 'Ad-Hoc', value: 'adhoc'},
                        ]}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <Controller
                    control={control}
                    name='sessionType'
                    render={({field: {onChange, value}}) => (
                      <Select
                        label='Session'
                        onChange={(event) => {
                          if (event.target) {
                            onChange(event.target.value as sessionType);
                          }
                        }}
                        value={value}
                        options={[
                          {label: 'Morning', value: 'morning'},
                          {label: 'Afternoon', value: 'afternoon'},
                        ]}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <Controller
                    control={control}
                    name='startTime'
                    render={({field: {onChange, value}}) => (
                      <InputFloatingTime
                        label='Start Time'
                        value={value}
                        onChange={(val) => onChange(dayjs(val))}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <Controller
                    control={control}
                    name='endTime'
                    render={({field: {onChange, value}}) => (
                      <InputFloatingTime
                        label='End Time'
                        value={value}
                        onChange={(val) => onChange(dayjs(val))}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Controller
                    control={control}
                    name='location'
                    render={({field: {onChange, value}}) => (
                      <Select
                        label='Volunteer Location'
                        onChange={(event) => {
                          if (event.target) {
                            onChange(event.target.value as locationType);
                          }
                        }}
                        value={value}
                        options={[
                          {label: 'PR', value: 'PR'},
                          {label: 'MP', value: 'MP'},
                          {label: 'Other', value: 'OTHER'},
                        ]}
                      />
                    )}
                  />
                </Grid>
                {watch('location') === 'OTHER' && (
                  <>
                    <Grid item xs={12} md={6}>
                      <InputFloating
                        label='Postal Code'
                        {...register('postalCode')}
                        type='number'
                      />
                    </Grid>
                  </>
                )}
                {watch('location') === 'OTHER' && (
                  <Grid item xs={12} md={6}>
                    <InputFloating label='Unit Number' {...register('unitNumber')} />
                  </Grid>
                )}
                <Grid item xs={12} md={6}>
                  <InputFloating
                    label='Max Number of Volunteer'
                    {...register('maxVolunteer')}
                    type='number'
                    error={!!errors?.maxVolunteer?.message}
                    helperText={errors?.maxVolunteer?.message}
                  />
                </Grid>
              </Grid>
            </Render>
          </Render>
        </Body>
        <Footer divider>
          <Box sx={sessionStyles.footer}>
            <Box>
              <Button sx={sessionStyles.close} variant='outlined' onClick={onClose}>
                Close
              </Button>
            </Box>
            {isEdit ? (
              <Box>
                <Button type='submit' sx={sessionStyles.action}>
                  Save
                </Button>
              </Box>
            ) : (
              <Box>
                <Button type='button' sx={sessionStyles.action} onClick={onConfirm}>
                  {event?.sfId ? 'Open Detail' : 'Edit'}
                </Button>
              </Box>
            )}
          </Box>
        </Footer>
      </form>
    </Modal>
  );
};
