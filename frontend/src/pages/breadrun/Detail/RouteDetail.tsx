import FeatherIcon from '@/components/FeatherIcon/FeatherIcon';
import CardInterest from '@/features/dashboard/breadrun/routes/detail/ui/CardInterest';
import CardRouteInformation from '@/features/dashboard/breadrun/routes/detail/ui/CardRouteInformation';
import DashboardLayout, {IDashboardBreadcrumb} from '@/layouts/dashboard.layout';
import {Box} from '@mui/material';

export interface RouteDetailProps {
  label?: string;
}

export const RouteDetail = (props: RouteDetailProps) => {
  const routeName = 'Bakery Brera & Fine Foods Pte Ltd';
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
      content: 'Routes',
      href: '/breadrun?tab=routes',
    },
    {
      type: 'text',
      content: routeName,
      href: '#',
    },
  ];
  return (
    <Box component='main'>
      <DashboardLayout title={'Available Route'} breadCrumbs={breadcrumbs} withBackBtn>
        <DashboardLayout.Content>
          <CardRouteInformation />
        </DashboardLayout.Content>
        <DashboardLayout.Activity>
          <CardInterest />
        </DashboardLayout.Activity>
      </DashboardLayout>
    </Box>
  );
};
