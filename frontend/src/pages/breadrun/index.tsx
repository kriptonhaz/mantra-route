import {useEffect, useState} from 'react';
import {Box, SxProps, Tab, Tabs, Theme, Typography} from '@mui/material';
import {Link, Outlet, useLocation} from 'react-router-dom';
import {styles} from './breadrun.style';
import DashboardLayout from '@/layouts/dashboard.layout';
import {neutral} from '@/themes/ts/colors';

interface LinkTabProps {
  pathname: string;
  sx?: SxProps<Theme>;
  label: string;
}

export interface BreadRunProps {
  label?: string;
}

function LinkTab(props: LinkTabProps) {
  return <Tab component={Link} to={props.pathname} {...props} />;
}

export const BreadRunPage = (props: BreadRunProps) => {
  const avaliableRoutes = [
    {label: 'Overview', pathName: '', path: '/breadrun'},
    {label: 'Routes', pathName: 'routes', path: '/breadrun/routes'},
    {label: 'Delivery Orders', pathName: 'delivery', path: '/breadrun/delivery'},
    {label: 'History', pathName: 'history', path: '/breadrun/history'},
  ];
  const useStyles = styles(props);
  const location = useLocation();
  const [tabValue, setTabValue] = useState(
    avaliableRoutes.findIndex((route) => location.pathname === route.path),
  );
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };
  useEffect(() => {
    const i = avaliableRoutes.findIndex((route) => location.pathname === route.path);
    i > -1 ? setTabValue(i) : setTabValue(0);
  }, []);

  return (
    <Box component='main'>
      <DashboardLayout title='Bread Run' subtitle='Track and manage your bread run'>
        <Box sx={{width: '100%'}}>
          <Box sx={{width: '100%', borderBottom: `1px solid ${neutral[200]}`, mb: 8, mt: -2}}>
            <Tabs
              variant='scrollable'
              allowScrollButtonsMobile
              value={tabValue}
              onChange={handleChange}
              aria-label='breadrun tabs'
            >
              {avaliableRoutes.map((route, index) => (
                <LinkTab key={index} label={route.label} pathname={route.pathName} />
              ))}
            </Tabs>
          </Box>
          <Box>
            <Outlet />
          </Box>
        </Box>
      </DashboardLayout>
    </Box>
  );
};
