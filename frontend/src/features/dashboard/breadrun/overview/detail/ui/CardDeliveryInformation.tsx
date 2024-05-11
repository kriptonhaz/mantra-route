import React from 'react';
import {Box, Card, Divider, Chip, Typography, SxProps, Stack, Button, Grid} from '@mui/material';
import FeatherIcon from '@/components/FeatherIcon/FeatherIcon';
import {info, neutral, success, warning} from '@/themes/ts/colors';

const styles: {
  root: SxProps;
  header: SxProps;
  headerChip: SxProps;
  body: SxProps;
  sectionTitle: SxProps;
  avatar: SxProps;
  iconInfo: SxProps;
  box: SxProps;
} = {
  root: {p: 0},
  header: {p: 6, position: 'relative'},
  headerChip: {
    position: 'absolute',
    top: 20,
    right: 20,
  },
  body: {p: 6},
  sectionTitle: {
    fontWeight: 'medium',
    mb: 4,
  },
  avatar: {
    p: 2,
    borderRadius: '8px',
    fontWeight: 'medium',
    alignSelf: 'flex-start',
    "&[data-color='warning']": {
      backgroundColor: warning[100],
      color: warning[700],
    },
    "&[data-color='success']": {
      backgroundColor: success[100],
      color: success[700],
    },
  },
  iconInfo: {marginRight: 1, '& svg': {transform: 'translateY(6px)'}},
  box: {
    backgroundColor: neutral[100],
    py: 6,
    px: 2,
    textAlign: 'center',
    borderRadius: 1,
    mb: 4,
  },
};

const CardDeliveryInformation: React.FC = () => {
  return (
    <Card sx={styles.root}>
      <Box sx={styles.header}>
        <Box sx={{display: {xs: 'block', md: 'none'}, mb: 3}}>
          <Chip label='URGENT' color='error' />
        </Box>
        <Typography variant='h6' fontWeight={'medium'} mb={1}>
          BreadTalk IONLINK
        </Typography>
        <Typography color='text.secondary'>DO-221207-0001</Typography>
        <Box sx={{display: {xs: 'none', md: 'block'}}}>
          <Chip label='URGENT' color='error' sx={styles.headerChip} />
        </Box>
      </Box>
      <Divider />
      <Box sx={styles.body}>
        <Box>
          <Typography sx={styles.sectionTitle}>Collection Point</Typography>
          <Stack
            direction={'row'}
            alignItems={'center'}
            justifyContent={'space-between'}
            spacing={4}
          >
            <Typography sx={styles.avatar} data-color='warning'>
              CP
            </Typography>
            <Box sx={{flex: 1}}>
              <Typography fontWeight={'medium'} mb={1}>
                Breadtalk IONLINK
              </Typography>
              <Typography variant='body2' fontWeight={'light'} color='text.secondary'>
                2 Orchard Turn, #B2-73 ION Orchard, Singapore 238801
              </Typography>
            </Box>
            <Button
              data-shape='icon'
              variant='outlined'
              color='inherit'
              sx={{display: {xs: 'none', md: 'block'}}}
            >
              <FeatherIcon icon='map-pin' sx={{transform: 'translateY(2px)'}} />
            </Button>
          </Stack>
          <Button
            variant='outlined'
            color='inherit'
            fullWidth
            sx={{mt: 4, display: {xs: 'flex', md: 'none'}}}
            startIcon={<FeatherIcon icon='map-pin' />}
          >
            Open Map
          </Button>
        </Box>
        <Divider sx={{my: 4}} />
        <Box>
          <Typography sx={styles.sectionTitle}>Delivery Point</Typography>
          <Stack
            direction={'row'}
            alignItems={'center'}
            justifyContent={'space-between'}
            spacing={4}
          >
            <Typography sx={styles.avatar} data-color='success'>
              DP
            </Typography>
            <Box sx={{flex: 1}}>
              <Typography fontWeight={'medium'} mb={1}>
                St. Andrew's Nursing Home
              </Typography>
              <Typography variant='body2' fontWeight={'light'} color='text.secondary' mb={2}>
                60 Buangkok View, Singapore 534012
              </Typography>
              <Typography variant='body2' sx={{color: info[600]}}>
                <FeatherIcon icon='info' sx={styles.iconInfo} /> Hang it on the door, please
              </Typography>
            </Box>
            <Button
              data-shape='icon'
              variant='outlined'
              color='inherit'
              sx={{display: {xs: 'none', md: 'block'}}}
            >
              <FeatherIcon icon='map-pin' sx={{transform: 'translateY(2px)'}} />
            </Button>
          </Stack>
          <Button
            variant='outlined'
            color='inherit'
            fullWidth
            sx={{mt: 4, display: {xs: 'flex', md: 'none'}}}
            startIcon={<FeatherIcon icon='map-pin' />}
          >
            Open Map
          </Button>
        </Box>
        <Divider sx={{my: 4}} />

        <Stack
          direction={'row'}
          alignItems={'center'}
          justifyContent={'space-between'}
          sx={styles.box}
          flexWrap={'wrap'}
        >
          <Box sx={{width: {xs: '50%', md: '30%'}}}>
            <Typography fontWeight={'medium'} mb={1}>
              30-60 min
            </Typography>
            <Typography fontWeight={'light'} variant='body2' color='text.secondary'>
              Est. Delivery Time
            </Typography>
          </Box>
          <Box sx={{width: {xs: '50%', md: '30%'}}}>
            <Typography fontWeight={'medium'} mb={1}>
              2.1 km
            </Typography>
            <Typography fontWeight={'light'} variant='body2' color='text.secondary'>
              Distance
            </Typography>
          </Box>
          <Box sx={{width: {xs: '100%', md: '30%'}, mt: {xs: 4, md: 0}}}>
            <Typography fontWeight={'medium'} mb={1}>
              08:00 PM - 09:00 PM
            </Typography>
            <Typography fontWeight={'light'} variant='body2' color='text.secondary'>
              Delivery Time`
            </Typography>
          </Box>
        </Stack>

        <Box>
          <Typography sx={styles.sectionTitle}>Route Details</Typography>
          <Grid container spacing={4}>
            <Grid item xs={6}>
              <Typography color='text.secondary' mb={1}>
                Active Until
              </Typography>
              <Typography>31 December 2022</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography color='text.secondary' mb={1}>
                Route Type
              </Typography>
              <Typography>Regular</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography color='text.secondary' mb={1}>
                Delivery Status
              </Typography>
              <Chip label='urgent' size='small' color='error' />
            </Grid>
            <Grid item xs={6}>
              <Typography color='text.secondary' mb={1}>
                Route Status
              </Typography>
              <Chip label='active' size='small' color='info' />
            </Grid>
            <Grid item xs={6}>
              <Typography color='text.secondary' mb={1}>
                Assigned To
              </Typography>
              <Chip label='urgent' size='small' color='error' />
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Card>
  );
};

export default CardDeliveryInformation;
