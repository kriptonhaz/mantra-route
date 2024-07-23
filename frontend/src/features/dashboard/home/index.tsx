import {useProfileHook} from '@/hooks/use-profile.hooks';
import DashboardLayout from '@/layouts/dashboard.layout';
import React from 'react';

const DashboardHomeUI: React.FC = () => {
  const {profileUser} = useProfileHook();

  return (
    <DashboardLayout
      title={`Welcome back, ${profileUser?.username || ''}`}
      subtitle='Track and manage frontliners'
      // badgeProps={{
      //   badgeContent: notificationUnreadUser.data?.unreadMessage,
      // }}
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
