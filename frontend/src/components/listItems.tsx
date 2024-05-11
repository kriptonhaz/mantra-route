import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import AssignmentIcon from '@mui/icons-material/Assignment';
import LogoutOutlined from '@mui/icons-material/LogoutOutlined';
import HomeOutlined from '@mui/icons-material/HomeOutlined';
import CalendarMonthOutlined from '@mui/icons-material/CalendarMonthOutlined';
import UploadOutlined from '@mui/icons-material/UploadOutlined';
import AccessTime from '@mui/icons-material/AccessTime';
import FavoriteOutlined from '@mui/icons-material/FavoriteOutlined';
import MapOutlined from '@mui/icons-material/MapOutlined';
import BarChartOutlined from '@mui/icons-material/BarChartOutlined';
import PersonOutline from '@mui/icons-material/PersonOutline';
import Avatar from '@mui/material/Avatar';
import avatarimg from '../assets/img/Avatar.png';

export const mainListItems = (
  <React.Fragment>
    <ListItemButton>
      <ListItemIcon>
        <HomeOutlined sx={{color: '#A0A0AB'}} />
      </ListItemIcon>
      <ListItemText primary='Home' />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <CalendarMonthOutlined color='secondary' sx={{color: '#A0A0AB'}} />
      </ListItemIcon>
      <ListItemText primary='Schedule' />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <UploadOutlined color='secondary' sx={{color: '#A0A0AB'}} />
      </ListItemIcon>
      <ListItemText primary='Upload Donation' />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <AccessTime color='secondary' sx={{color: '#A0A0AB'}} />
      </ListItemIcon>
      <ListItemText primary='Upcoming Events' />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <FavoriteOutlined color='secondary' sx={{color: '#A0A0AB'}} />
      </ListItemIcon>
      <ListItemText primary='Volunteer' />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <BarChartOutlined color='secondary' sx={{color: '#A0A0AB'}} />
      </ListItemIcon>
      <ListItemText primary='Attendance' />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <MapOutlined color='secondary' sx={{color: '#A0A0AB'}} />
      </ListItemIcon>
      <ListItemText primary='Bread Run' />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <PersonOutline color='secondary' sx={{color: '#A0A0AB'}} />
      </ListItemIcon>
      <ListItemText primary='Profile' />
    </ListItemButton>
  </React.Fragment>
);

export const secondaryListItems = <React.Fragment></React.Fragment>;
export const AccountItems = <React.Fragment></React.Fragment>;
