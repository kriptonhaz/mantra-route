import {Box, AppBar, IconButton, Toolbar, Drawer} from '@mui/material';
import {Outlet, useLocation} from 'react-router-dom';
import {ProfileDataResponseType} from '../interface/profileInfo.interface';
import {
  HomeOutlined,
  CalendarMonthOutlined,
  MenuOutlined,
  TwoWheeler,
  Store,
  Apartment,
} from '@mui/icons-material';
import {useEffect, useState} from 'react';
import {AppDrawer} from '../components/AppDrawer/AppDrawer';
import {InnerDrawer} from '../components/AppDrawer/InnerDrawer';
import logoMantraWhite from '@/assets/img/logo-mantra-white.png';
import {neutral} from '@/themes/ts/colors';

export interface DashboardPageProps {
  isLoading?: boolean;
  profileData?: ProfileDataResponseType;
}

interface MenuItemsType {
  label: string;
  to: string;
  icon: React.ReactElement;
}

export const DashboardPage = (props: DashboardPageProps) => {
  const location = useLocation();
  const {isLoading, profileData} = props;

  const [mobileOpen, setMobileOpen] = useState(false);
  const [drawerWidth, setDrawerWidth] = useState(280);
  const [menuItems, setMenuItems] = useState<MenuItemsType[]>([
    {label: 'Home', to: '/dashboard/home', icon: <HomeOutlined sx={{fill: 'inherit'}} />},
    {
      label: 'Company',
      to: '/dashboard/company',
      icon: <Apartment color='secondary' sx={{fill: 'inherit'}} />,
    },
    {
      label: 'Frontliners',
      to: '/dashboard/frontliners',
      icon: <TwoWheeler color='secondary' sx={{fill: 'inherit'}} />,
    },
    {
      label: 'Outlet',
      to: '/dashboard/outlet',
      icon: <Store color='secondary' sx={{fill: 'inherit'}} />,
    },
    {
      label: 'Jobs',
      to: '/dashboard/jobs',
      icon: <CalendarMonthOutlined sx={{fill: 'inherit'}} />,
    },
  ]);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const handleDrawerChevron = () => {
    if (!mobileOpen) {
      setDrawerWidth(66);
    } else {
      setDrawerWidth(280);
    }
    setMobileOpen(!mobileOpen);
  };

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  return (
    <Box sx={{display: 'flex', background: neutral[900]}}>
      <AppBar
        position='fixed'
        sx={{
          width: {sm: `calc(100% - ${drawerWidth}px)`},
          ml: {sm: `${drawerWidth}px`},
          backgroundColor: 'black',
        }}
      >
        <Toolbar sx={{display: {sm: 'none'}}}>
          <Box
            component='img'
            sx={{
              height: 40,
            }}
            alt='mantrawhite'
            src={logoMantraWhite}
          />
          <IconButton
            color='inherit'
            aria-label='open drawer'
            edge='start'
            onClick={handleDrawerToggle}
            sx={{mr: 2, display: {sm: 'none'}, marginLeft: 'auto'}}
          >
            <MenuOutlined sx={{color: 'gray'}} />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Box
        component='nav'
        sx={{
          width: {sm: drawerWidth},
          flexShrink: {sm: 0},
        }}
        aria-label='mailbox folders'
      >
        <Drawer
          variant='temporary'
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: {xs: 'block', sm: 'none'},
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
        >
          <InnerDrawer menuItems={menuItems} isLoading={isLoading} profileData={profileData} />
        </Drawer>
        <Drawer
          variant='permanent'
          sx={{
            display: {xs: 'none', sm: 'block'},
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
            '& .MuiPaper-root': {paddingTop: '32px', px: 2},
          }}
          open
        >
          <AppDrawer
            hideDrawer={handleDrawerChevron}
            drawerWidth={drawerWidth}
            menuItems={menuItems}
            isLoading={isLoading}
            profileData={profileData}
          />
        </Drawer>
      </Box>
      <Box
        sx={{
          width: '100%',
          minHeight: '90vh',
          maxHeight: '100vh',
          background: '#fff',
          borderTopLeftRadius: '40px',
          marginTop: '20px',
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};
