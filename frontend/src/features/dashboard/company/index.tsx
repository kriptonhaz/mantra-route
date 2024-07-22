import DashboardLayout from '@/layouts/dashboard.layout';
import * as React from 'react';
import ListCompany from './ListCompany';

const CompanyUI: React.FC = () => {
  return (
    <DashboardLayout title='Company' subtitle='Manage your company'>
      <DashboardLayout.Content>
        <ListCompany />
      </DashboardLayout.Content>
    </DashboardLayout>
  );
};

export default CompanyUI;
