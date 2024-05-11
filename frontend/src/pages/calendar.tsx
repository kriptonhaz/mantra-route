import {BigCalendar} from '@/components/Calendar';

import DashboardLayout from '@/layouts/dashboard.layout';
import {Box} from '@mui/material';
import React from 'react';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './schedule.style.css';

import dayjs from 'dayjs';
import useCalendar from '@/hooks/use-calendar.hook';
import {EventClickArg} from '@fullcalendar/core';
import {useNavigate} from 'react-router-dom';

export const CalendarPage: React.FC = () => {
  const navigate = useNavigate();
  const {updateYear, listEvents} = useCalendar();
  const handleClickEvent = (e: EventClickArg) => {
    const href = e.event._def.extendedProps.href;
    if (href) navigate(href);
  };

  return (
    <Box component='main'>
      <DashboardLayout title='Calendar' subtitle='Track and manage volunteers'>
        <DashboardLayout.Content>
          <Box sx={{'& .fc.fc-media-screen': {minHeight: {xs: '520px', md: 'auto'}}}}>
            <BigCalendar
              events={listEvents}
              onChangeDate={(val) => updateYear(dayjs(val).format('YYYY'))}
              onClickEvent={handleClickEvent}
            />
          </Box>
        </DashboardLayout.Content>
      </DashboardLayout>
    </Box>
  );
};
