import * as React from 'react';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {DateCalendar} from '@mui/x-date-pickers/DateCalendar';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import {Box, Button, Divider, Typography} from '@mui/material';
import emptyImg from '../assets/img/Empty-States.png';

export default function Calendar() {
  return (
    <Card sx={{}}>
      <CardContent sx={{flexDirection: 'column', display: 'flex', margin: 0, padding: 0}}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateCalendar sx={{width: '100%'}} />
        </LocalizationProvider>
        <Divider />
        <Box sx={{margin: '1rem'}}>
          <Typography variant='h5' component='h3'>
            Upcoming Events
          </Typography>
          <Typography paragraph>Keep track of activities every month</Typography>
          <Box
            sx={{
              border: '1px solid #E4E4E7',
              padding: '1rem',
              borderRadius: '5px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Box
              component='img'
              sx={{
                height: 120,
              }}
              alt='empty'
              src={emptyImg}
            />
            <Typography variant='subtitle1' sx={{fontWeight: 600, fontSize: 14}}>
              No activity found
            </Typography>
            <Typography variant='subtitle2' sx={{fontSize: 14, color: '#70707B', margin: '1rem'}}>
              Let’s start volunteering
            </Typography>
            <Button sx={{borderRadius: '.5rem'}} variant='contained'>
              Volunteer Opportunities
            </Button>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}
