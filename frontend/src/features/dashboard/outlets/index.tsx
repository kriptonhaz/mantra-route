import DashboardLayout from '@/layouts/dashboard.layout';
import * as React from 'react';
import ListOutlets from './ListOutlets';

const OutletsUI: React.FC = () => {
  return (
    <DashboardLayout title='Outlets' subtitle='The Thrill of the Find, Without the High Price'>
      <DashboardLayout.Content>
        <ListOutlets />
      </DashboardLayout.Content>
    </DashboardLayout>
  );
};

export default OutletsUI;
