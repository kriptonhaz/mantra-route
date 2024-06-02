import {
  Avatar,
  Box,
  CSSObject,
  CircularProgress,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Drawer as MuiDrawer,
  Theme,
  styled,
} from '@mui/material';

import {useAuthHook} from '@/hooks/use-auth.hooks';
import {neutral} from '@/themes/ts/colors';
import {LogoutOutlined} from '@mui/icons-material';
import {useState} from 'react';
import {Link, NavLink} from 'react-router-dom';
import ffthLogo from '../../assets/img/logo-ffth.png';
import logoMantraWhite from '@/assets/img/logo-mantra-white.png';
import {useProfileHook} from '../../hooks/use-profile.hooks';
import {ProfileDataResponseType} from '../../interface/profileInfo.interface';
import {FHNeutral} from '../../themes/FHColor';
import FeatherIcon from '../FeatherIcon/FeatherIcon';
import {MenuItemInterface} from './InnerDrawer';

export interface AppDrawerProps {
  menuItems: Array<MenuItemInterface>;
  hideDrawer?: () => void;
  drawerWidth?: number;
  isLoading?: boolean;
  profileData?: ProfileDataResponseType;
}

export const AppDrawer = (props: AppDrawerProps) => {
  const {hideDrawer, drawerWidth, menuItems, isLoading, profileData} = props;
  const {profileUser} = useProfileHook();
  const {onLogout} = useAuthHook();
  const [open, setOpen] = useState(true);

  const openedMixin = (theme: Theme): CSSObject => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: '.25s',
    }),
    overflowX: 'hidden',
    backgroundColor: FHNeutral[900],
  });

  const closedMixin = (theme: Theme): CSSObject => ({
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: '.25s',
    }),
    overflowX: 'hidden',
    backgroundColor: FHNeutral[900],
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
      width: `66px`,
    },
  });

  const DrawerHeader = styled('div')(({theme}) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
  }));

  const Drawer = styled(MuiDrawer, {
    shouldForwardProp: (prop) => prop !== 'open',
  })(({theme, open}) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }));

  const handleDrawerChevron = () => {
    setOpen(!open);
    if (hideDrawer) {
      hideDrawer();
    }
  };

  const handleLogout = () => {
    onLogout();
  };

  return (
    <Drawer variant='permanent' open={open}>
      <Box sx={{height: '100%', display: 'flex', flexDirection: 'column'}}>
        <DrawerHeader>
          <Box
            sx={{
              width: '100%',
              padding: 1,
            }}
          >
            {open && (
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  width: '100%',
                }}
              >
                <Box
                  component='img'
                  sx={{
                    height: 35,
                  }}
                  alt='mantrawhite'
                  src={logoMantraWhite}
                />
                <IconButton onClick={handleDrawerChevron}>
                  <FeatherIcon icon='arrow-left' sx={{color: neutral[400]}} />
                </IconButton>
              </Box>
            )}
            {!open && (
              <IconButton
                sx={{transform: 'translateX(-2px)'}}
                color='inherit'
                aria-label='open drawer'
                onClick={handleDrawerChevron}
              >
                <FeatherIcon icon='arrow-right' sx={{color: neutral[400]}} />
              </IconButton>
            )}
          </Box>
        </DrawerHeader>
        <Divider />
        <List>
          {menuItems.map((item, index) => (
            <ListItem key={index} disablePadding sx={{display: 'block'}}>
              <NavLink
                to={item.to}
                style={({isActive}) => {
                  if (isActive) {
                    return {
                      color: 'white',
                      textDecoration: 'none',
                      fill: 'white',
                    };
                  }
                  return {color: FHNeutral[400], textDecoration: 'none', fill: FHNeutral[400]};
                }}
              >
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? 'initial' : 'center',
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : 'auto',
                      justifyContent: 'center',
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText primary={item.label} sx={{opacity: open ? 1 : 0}} />
                </ListItemButton>
              </NavLink>
            </ListItem>
          ))}
        </List>
        <List
          sx={{
            flexGrow: 1,
            justifyContent: 'flex-end',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {profileUser.isLoading ? (
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              {' '}
              <CircularProgress />
            </Box>
          ) : (
            <Box>
              <ListItemButton onClick={handleLogout} sx={{margin: '1rem 0'}}>
                <ListItemIcon>
                  <LogoutOutlined
                    color='secondary'
                    sx={{color: FHNeutral[400], transform: `translateX(${open ? '0' : '-8px'})`}}
                  />
                </ListItemIcon>
                <ListItemText sx={{color: FHNeutral[400]}} primary='Logout' />
              </ListItemButton>
              <Divider variant='middle' sx={{borderColor: 'gray'}} />
              <Link to='/dashboard/profile'>
                <ListItemButton sx={{margin: '1rem 0'}}>
                  <ListItemIcon>
                    <Avatar
                      alt={profileUser.data?.data?.Name}
                      src={profileUser.data?.data?.Profile_Image_Url__c}
                      sx={{
                        color: FHNeutral[400],
                        width: 32,
                        height: 32,
                        transform: `translateX(${open ? '0' : '-12px'})`,
                      }}
                    />
                  </ListItemIcon>
                  <ListItemText sx={{color: FHNeutral[400]}}>
                    {profileUser.data?.data?.Name}
                  </ListItemText>
                </ListItemButton>
              </Link>
            </Box>
          )}
        </List>
      </Box>
    </Drawer>
  );
};
