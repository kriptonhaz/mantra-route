import DashboardLayout from '@/layouts/dashboard.layout';
import * as React from 'react';
import ListVolunteer from './ui/ListVolunteer';
import VolunteerHistory from './ui/VolunteerHistory';

const VolunteerOpportunitiesUI: React.FC = () => {
  return (
    <DashboardLayout
      title='Volunteer Opportunities'
      subtitle='Find a suitable volunteer opportunities for you'
    >
      <DashboardLayout.Content>
        <ListVolunteer />
      </DashboardLayout.Content>
      <DashboardLayout.Activity>
        <VolunteerHistory />
      </DashboardLayout.Activity>
    </DashboardLayout>
  );
};

export default VolunteerOpportunitiesUI;
