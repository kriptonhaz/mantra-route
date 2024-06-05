import DashboardLayout from '@/layouts/dashboard.layout';
import * as React from 'react';
import ListOutlets from './ui/ListOutlets';

const FrontlinersUI: React.FC = () => {
  return (
    <DashboardLayout title='Outlets' subtitle='The Thrill of the Find, Without the High Price'>
      <DashboardLayout.Content>
        <ListOutlets />
      </DashboardLayout.Content>
      {/* <DashboardLayout.Activity>
      </DashboardLayout.Activity> */}
    </DashboardLayout>
  );
};

export default FrontlinersUI;
