import React, {useState} from 'react';
import {Box} from '@mui/material';
import dayjs from 'dayjs';
import {CaretLeft, CaretRight} from 'phosphor-react';
import {useEffect, useId} from 'react';
import ReactCalendar, {CalendarProps} from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import classes from './styles/SmallCalendar.module.scss';

export type TColor = 'info' | 'primary' | 'danger' | 'success' | 'warning' | 'neutral';
export interface ISmallCalendarEvent {
  date: string;
  color: TColor;
}
interface ICalendarProps extends CalendarProps {
  events?: {
    date: string;
    color: TColor;
  }[];
}
const SmallCalendar: React.FC<ICalendarProps> = React.forwardRef(({events, ...props}, ref) => {
  const id = useId();
  const [listEvents, setListEvents] = useState<Map<any, any>>(new Map());

  useEffect(() => {
    const resultEvents = new Map();
    events?.forEach((event) => {
      resultEvents.set(event.date, event.color);
    });
    setListEvents(resultEvents);
  }, [events]);

  return (
    <Box id={id} className={classes.Box} ref={ref}>
      <ReactCalendar
        className={classes.ReactCalendar}
        prevLabel={<CaretLeft size={22} weight='bold' />}
        nextLabel={<CaretRight size={22} weight='bold' />}
        formatShortWeekday={(_, date) => ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sat'][date.getDay()]}
        {...props}
        tileContent={(content) => {
          const date = dayjs(content.date).format('DD-MM-YYYY');
          const color = listEvents.get(date);
          return (
            <>
              <div className={`event ${color || 'default'}`}></div>
            </>
          );
        }}
      />
    </Box>
  );
});

SmallCalendar.displayName = 'SmallCalendar';
export default SmallCalendar;
