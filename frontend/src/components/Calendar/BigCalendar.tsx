import dayGridPlugin from '@fullcalendar/daygrid';
import FullCalendar from '@fullcalendar/react';
import {Box, Button, Stack, Typography, BoxProps} from '@mui/material';
import dayjs, {Dayjs} from 'dayjs';
import {CaretLeft, CaretRight} from 'phosphor-react';
import React, {useEffect, useRef, useState} from 'react';
import classes from './styles/BigCalendar.module.scss';
import {EventClickArg} from '@fullcalendar/core';
import {locationType, scheduleType, sessionType, volunteerType} from '../Form/ScheduleGenerator';

export interface ICalendarEvent {
  id?: string;
  title: string;
  start: string;
  end: string;
  className: 'neutral' | 'primary' | 'info' | 'warning' | 'success' | 'danger' | string[];
}

export interface ICalendarGeneratorEvent extends ICalendarEvent {
  id: string;
  sfId?: string;
  startDate: string;
  endDate: string;
  volunteerType: volunteerType;
  assignedVolunteer: number;
  maxVolunteer: number;
  scheduleType: scheduleType;
  numberSession: number;
  sessionType: sessionType;
  timeStart: Dayjs | string;
  timeEnd: Dayjs | string;
  location: locationType;
  postalCode?: string;
  unitNumber?: string;
  companyName?: string;
  contactName?: string;
}
interface IBigCalendarProps extends BoxProps {
  events?: ICalendarEvent[];
  onChangeDate?: (value: string) => void;
  onClickEvent?: (event: EventClickArg) => void;
}
const BigCalendar: React.FC<IBigCalendarProps> = React.forwardRef((props, ref) => {
  const {events, ...boxProps} = props;
  const calendarRef = useRef(null);
  const [calendarApi, setCalendarApi] = useState<any>(null);
  const [title, setTitle] = useState('');

  useEffect(() => {
    setTitle(dayjs().format('MMMM YYYY'));
  }, []);

  useEffect(() => {
    const calendarApi = calendarRef?.current;
    if (calendarApi) {
      // @ts-ignore
      setCalendarApi(calendarApi.getApi());
    }
  }, [calendarRef]);

  const onPrev = () => {
    calendarApi.prev();
    if (props.onChangeDate) {
      props.onChangeDate(dayjs(calendarApi.getDate()).format('YYYY-MM-DD') || '');
    }
    setTitle(dayjs(calendarApi.getDate()).format('MMMM YYYY'));
  };

  const onNext = () => {
    calendarApi.next();
    if (props.onChangeDate) {
      props.onChangeDate(dayjs(calendarApi.getDate()).format('YYYY-MM-DD') || '');
    }
    setTitle(dayjs(calendarApi.getDate()).format('MMMM YYYY'));
  };

  return (
    <Box {...boxProps} ref={ref} className='full-calendar'>
      <Box className={classes.Container}>
        <Stack direction='row' alignItems={'center'} justifyContent='space-between'>
          <Box>
            <Typography variant='subtitle2'>{title}</Typography>
          </Box>
          <Box className={classes.Navigation}>
            <Button color='inherit' variant='text' data-shape='icon' onClick={onPrev}>
              <CaretLeft weight='bold' size={28} />
            </Button>
            <Button color='inherit' variant='text' data-shape='icon' onClick={onNext}>
              <CaretRight weight='bold' size={28} />
            </Button>
          </Box>
        </Stack>
        <Box className={classes.FullCalendar}>
          <FullCalendar
            ref={calendarRef}
            plugins={[dayGridPlugin]}
            initialView='dayGridMonth'
            headerToolbar={false}
            events={events}
            eventClick={props.onClickEvent}
            firstDay={1}
          />
        </Box>
      </Box>
    </Box>
  );
});
BigCalendar.displayName = 'BigCalendar';
export default BigCalendar;
