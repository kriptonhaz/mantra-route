import {useFeedHook} from '@/hooks/use-feed.hook';
import {useNotificationHook} from '@/hooks/use-notification.hook';
import {useProfileHook} from '@/hooks/use-profile.hooks';
import {useVolunteerHook} from '@/hooks/use-volunteer.hook';
import DashboardLayout from '@/layouts/dashboard.layout';
import {Card, Divider, Stack} from '@mui/material';
import React from 'react';
import Calendar from './ui/Calendar';
import CardDashboard from './ui/CardDashboard';
import ListAnnouncements from './ui/ListAnnouncements';
import ListUpcomingActivities from './ui/ListUpcomingActivities';
import {useNavigate} from 'react-router-dom';
import {useQuery} from '@tanstack/react-query';
import {getTotalAttendance} from '@/api/attendance.api';

const DashboardHomeUI: React.FC = () => {
  const navigate = useNavigate();
  const {profileUser} = useProfileHook();
  const {notificationUnreadUser} = useNotificationHook();
  const {volunteerActivity} = useVolunteerHook();
  const {listAnnouncements} = useFeedHook();
  const totalAttendance = useQuery(['portal', 'total-attendance'], getTotalAttendance);

  const gotoVolunteerPage = () => {
    navigate('/dashboard/volunteer');
  };

  return (
    <DashboardLayout
      title={`Welcome back, ${profileUser.data?.data?.Name || ''}`}
      subtitle='Track and manage frontliners'
      badgeProps={{
        badgeContent: notificationUnreadUser.data?.unreadMessage,
      }}
    >
      {/* <DashboardLayout.Content>
        <Stack direction={{xs: 'column', md: 'row'}} spacing={4}>
          <CardDashboard
            icon='clipboard'
            title='Total Attendances'
            subtitle="Combined from your organisation's volunteers"
            value={totalAttendance.data?.attendances || '0'}
            btnProps={{text: 'Volunteer Opportunities'}}
            onClick={gotoVolunteerPage}
          />
        </Stack>

        <ListAnnouncements listAnnouncements={listAnnouncements} />
      </DashboardLayout.Content>
      <DashboardLayout.Activity>
        <Card sx={{p: 0}}>
          <Calendar />
          <Divider />
          <ListUpcomingActivities />
        </Card>
      </DashboardLayout.Activity> */}
    </DashboardLayout>
  );
};

export default DashboardHomeUI;
