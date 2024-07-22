import DashboardLayout from '@/layouts/dashboard.layout';
import * as React from 'react';
import ListFrontliners from './ListFrontliners';

const FrontlinersUI: React.FC = () => {
  return (
    <DashboardLayout title='Frontliners' subtitle='Honoring frontliners for going extra mile'>
      <DashboardLayout.Content>
        <ListFrontliners />
      </DashboardLayout.Content>
    </DashboardLayout>
  );
};

export default FrontlinersUI;
