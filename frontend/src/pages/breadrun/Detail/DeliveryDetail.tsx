import FeatherIcon from '@/components/FeatherIcon/FeatherIcon';
import CardAcceptDelivery from '@/features/dashboard/breadrun/overview/detail/ui/CardAcceptDelivery';
import CardDeliveryInformation from '@/features/dashboard/breadrun/overview/detail/ui/CardDeliveryInformation';
import DashboardLayout, {IDashboardBreadcrumb} from '@/layouts/dashboard.layout';
import {Box} from '@mui/material';

export interface DeliveryDetailProps {
  label?: string;
}

export const DeliveryDetail = (props: DeliveryDetailProps) => {
  const deliveryName = 'BreadTalk IONLINK';
  const breadcrumbs: IDashboardBreadcrumb[] = [
    {
      type: 'icon',
      content: <FeatherIcon icon='home' />,
      href: '/',
    },
    {
      type: 'text',
      content: 'Bread Run',
      href: '/breadrun',
    },
    {
      type: 'text',
      content: 'Overview',
      href: '/breadrun?tab=overview',
    },
    {
      type: 'text',
      content: deliveryName,
      href: '#',
    },
  ];

  return (
    <Box component='main'>
      <DashboardLayout title='Delivery Order' withBackBtn breadCrumbs={breadcrumbs}>
        <DashboardLayout.Content>
          <CardDeliveryInformation />
        </DashboardLayout.Content>
        <DashboardLayout.Activity>
          <CardAcceptDelivery />
        </DashboardLayout.Activity>
      </DashboardLayout>
    </Box>
  );
};
