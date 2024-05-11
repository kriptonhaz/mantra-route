import {SmallCalendar} from '@/components/Calendar';
import Render from '@/components/Render';
import useCalendar from '@/hooks/use-calendar.hook';
import {Box, CircularProgress} from '@mui/material';
import dayjs from 'dayjs';
import React from 'react';

const Calendar: React.FC = () => {
  const {listEvents, updateYear, isLoading} = useCalendar();

  return (
    <Box sx={{p: 6, minHeight: '410px'}}>
      <Render in={isLoading}>
        <CircularProgress />
      </Render>
      <Render in={!isLoading}>
        <SmallCalendar
          onActiveStartDateChange={(val) => {
            updateYear(val.activeStartDate?.getFullYear().toString() || '2023');
          }}
          events={
            listEvents.map((item) => ({
              color: dayjs().isAfter(dayjs(item.start)) ? 'neutral' : 'primary',
              date: dayjs(item.start).format('DD-MM-YYYY'),
            })) || []
          }
        />
      </Render>
    </Box>
  );
};

export default Calendar;
