import DashboardLayout from '@/layouts/dashboard.layout';
import * as React from 'react';
import ListVolunteer from './ui/ListVolunteer';

const FrontlinersUI: React.FC = () => {
  return (
    <DashboardLayout title='Frontliners' subtitle='Honoring frontliners for going extra mile'>
      <DashboardLayout.Content>
        <ListVolunteer />
      </DashboardLayout.Content>
      {/* <DashboardLayout.Activity>
      </DashboardLayout.Activity> */}
    </DashboardLayout>
  );
};

export default FrontlinersUI;
