import {LogoutOutlined} from '@mui/icons-material';
import {
  Avatar,
  Box,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import {ReactElement} from 'react';
import {NavLink, useNavigate} from 'react-router-dom';
import {useProfileHook} from '../../hooks/use-profile.hooks';
import {FHNeutral} from '../../themes/FHColor';
import {AppDrawerProps} from './AppDrawer';

export interface MenuItemInterface {
  label: string;
  icon: ReactElement;
  to: string;
}

export const InnerDrawer = (props: AppDrawerProps) => {
  const {menuItems} = props;
  const {profileUser} = useProfileHook();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('@ffth-token');
    navigate('/login');
  };

  return (
    <Box
      sx={{
        backgroundColor: FHNeutral[900],
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <List>
        {menuItems.map((item: MenuItemInterface, index: number) => (
          <ListItem key={index} disablePadding>
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
              <ListItemButton>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.label} />
              </ListItemButton>
            </NavLink>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List
        sx={{
          flexGrow: 1,
          justifyContent: 'flex-end',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Box>
          <ListItemButton onClick={handleLogout} sx={{margin: '1rem 0'}}>
            <ListItemIcon>
              <LogoutOutlined color='secondary' sx={{color: FHNeutral[400]}} />
            </ListItemIcon>
            <ListItemText sx={{color: FHNeutral[400]}} primary='Logout' />
          </ListItemButton>
          <Divider variant='middle' sx={{borderColor: 'gray'}} />
          <ListItemButton sx={{margin: '1rem 0'}}>
            <ListItemIcon>
              <Avatar
                alt={profileUser?.username}
                src={undefined}
                sx={{color: FHNeutral[400], width: 32, height: 32}}
              />
            </ListItemIcon>
            <ListItemText sx={{color: FHNeutral[400]}}>{profileUser?.username}</ListItemText>
          </ListItemButton>
        </Box>
      </List>
    </Box>
  );
};
