import {SmallCalendar} from '@/components/Calendar';
import DashboardLayout from '@/layouts/dashboard.layout';
import {Box, Card, Divider} from '@mui/material';
import * as React from 'react';
import ListActivities from './ui/ListActivities';
import RegisteredActivities from './ui/RegisteredActivities';
import useCalendar from '@/hooks/use-calendar.hook';
import dayjs from 'dayjs';

const UpcomingActivitiesUI: React.FC = () => {
  const {listEvents, updateYear} = useCalendar();
  return (
    <DashboardLayout
      title='Upcoming Events'
      subtitle='You can view any upcoming events or activities'
    >
      <DashboardLayout.Content>
        <ListActivities />
      </DashboardLayout.Content>
      <DashboardLayout.Activity>
        <RegisteredActivities />
      </DashboardLayout.Activity>
    </DashboardLayout>
  );
};

export default UpcomingActivitiesUI;
