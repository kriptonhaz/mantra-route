import DashboardLayout from '@/layouts/dashboard.layout';
import * as React from 'react';
import ListJobs from './ListJobs';

const JobsUI: React.FC = () => {
  return (
    <DashboardLayout title='Jobs' subtitle='Consider its done'>
      <DashboardLayout.Content>
        <ListJobs />
      </DashboardLayout.Content>
    </DashboardLayout>
  );
};

export default JobsUI;
