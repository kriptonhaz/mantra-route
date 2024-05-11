import React from 'react';
import {
  Box,
  Card,
  Divider,
  Chip,
  Typography,
  SxProps,
  Stack,
  Button,
  Grid,
  GridProps,
} from '@mui/material';
import FeatherIcon from '@/components/FeatherIcon/FeatherIcon';
import {info, neutral, success, warning} from '@/themes/ts/colors';

const styles: {
  root: SxProps;
  header: SxProps;
  headerChip: SxProps;
  body: SxProps;
  sectionTitle: SxProps;
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
};

interface IDataItemProps extends GridProps {
  label: string;
  value: string;
  width?: number;
}
const DataItem: React.FC<IDataItemProps> = ({label, value, width = 6, ...props}) => (
  <Grid item md={width} {...props}>
    <Typography color='text.secondary' mb={1}>
      {label}
    </Typography>
    <Typography>{value}</Typography>
  </Grid>
);

const CardRouteInformation: React.FC = () => {
  return (
    <Card sx={styles.root}>
      <Box sx={styles.header}>
        <Box mb={2}>
          <Chip label='regular' color='info' sx={{display: {xs: 'inline-block', md: 'none'}}} />
        </Box>
        <Typography variant='h6' fontWeight={'medium'} mb={1}>
          Bakery Brera & Fine Foods Pte Ltd
        </Typography>
        <Typography color='text.secondary'>Route 03355</Typography>
        <Chip
          label='regular'
          color='info'
          sx={{...styles.headerChip, display: {xs: 'none', md: 'block'}}}
        />
      </Box>
      <Divider />
      <Box sx={styles.body}>
        <Box>
          <Typography sx={styles.sectionTitle}>Route Details</Typography>
          <Grid container spacing={4}>
            <DataItem xs={6} label='Start Date' value='30/12/2022' />
            <DataItem xs={6} label='End Date' value='30/02/2023' />
            <DataItem xs={6} label='Route Status' value='Active' />
            <DataItem xs={6} label='Day of Route' value='Monday' />
          </Grid>
        </Box>
        <Divider sx={{mt: 4, mb: 6}} />
        <Box>
          <Typography sx={styles.sectionTitle}>Collection Point</Typography>
          <Grid container spacing={4}>
            <DataItem
              xs={12}
              md={6}
              label='Bakery Name'
              value='Bakery Brera & Fine Foods Pte Ltd'
            />
            <DataItem
              xs={12}
              md={6}
              label='Address'
              value='#01-05, 8 Empress Rd, Singapore 260008'
            />
            <DataItem xs={12} md={6} label='Collection Day' value='30 December 2022' />
            <DataItem xs={12} md={6} label='Collection Time' value='08:00 PM - 09:00 PM' />
            <DataItem xs={6} label='Contact Person' value='Samantha Williams' />
            <DataItem xs={6} label='Mobile' value='8877 4791' />
            <DataItem
              xs={12}
              md={6}
              label='Instructions'
              value='Always bring your volunteer ID, etc etc'
            />
          </Grid>
          <Stack direction='row' spacing={{xs: 3, md: 6}} sx={{mt: 4}}>
            <Button
              variant='outlined'
              color='inherit'
              startIcon={<FeatherIcon icon='phone' sx={{transform: 'scale(.8)'}} />}
            >
              8877 4211
            </Button>
            <Button
              variant='outlined'
              color='inherit'
              startIcon={<FeatherIcon icon='map-pin' sx={{transform: 'scale(.8)'}} />}
            >
              Open Map
            </Button>
          </Stack>
        </Box>
        <Divider sx={{mt: 4, mb: 6}} />
        <Box>
          <Typography sx={styles.sectionTitle}>Delivery Point</Typography>
          <Grid container spacing={4}>
            <DataItem xs={12} md={6} label='Bakery Name' value='St. Andrews Nursing Home' />
            <DataItem xs={12} md={6} label='Address' value='60 Buangkok View, Singapore 534012' />
            <DataItem xs={6} label='Contact Person' value='Andre Yang' />
            <DataItem xs={6} label='Mobile' value='8880 5330' />
            <DataItem xs={12} md={6} label='Instructions' value='-' width={12} />
            <DataItem xs={12} md={6} label='Route Note' value='-' width={12} />
          </Grid>
          <Stack direction='row' spacing={{xs: 3, md: 6}} sx={{mt: 4}}>
            <Button
              variant='outlined'
              color='inherit'
              startIcon={<FeatherIcon icon='phone' sx={{transform: 'scale(.8)'}} />}
            >
              8877 4211
            </Button>
            <Button
              variant='outlined'
              color='inherit'
              startIcon={<FeatherIcon icon='map-pin' sx={{transform: 'scale(.8)'}} />}
            >
              Open Map
            </Button>
          </Stack>
        </Box>
        <Divider sx={{mt: 4, mb: 6}} />
        <Box>
          <Typography sx={styles.sectionTitle}>Volunteer Information</Typography>
          <Grid container spacing={4}>
            <DataItem label='Main Volunteer Name' value='-' width={12} />
            <DataItem label='Alternate Volunteer' value='-' width={12} />
          </Grid>
        </Box>
      </Box>
    </Card>
  );
};

export default CardRouteInformation;
