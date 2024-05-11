import {VolunteerRequestItemType} from '@/interface/volunteerRequest.interface';
import {Box, Card, Divider, Grid, Typography} from '@mui/material';
import dayjs from 'dayjs';
import React from 'react';

const DataItem: React.FC<{label: string; value: string | undefined}> = ({label, value}) => {
  return (
    <Grid item xs={6} md={6}>
      <Typography variant='body2' color='text.secondary'>
        {label}
      </Typography>
      <Typography variant='body2'>{value ? value : '-'}</Typography>
    </Grid>
  );
};

type CardInfoProps = {
  vrInfo?: VolunteerRequestItemType;
};

const CardInfo: React.FC<CardInfoProps> = (props: CardInfoProps) => {
  return (
    <Card sx={{p: 0}}>
      <Box p={6}>
        <Typography variant='h6' fontWeight={'medium'} mb={1}>
          Need more info?
        </Typography>
        <Typography color={'text.secondary'}>Details for whis opportunitoy</Typography>
      </Box>
      <Divider />
      <Box p={6}>
        <Grid container columnSpacing={2} rowSpacing={4}>
          <DataItem label='Volunteer Type' value={props.vrInfo?.Volunteer_Type__c} />
          <DataItem
            label='Volunteer Required'
            value={props.vrInfo?.Total_Volunteers_Required__c.toString()}
          />
          <DataItem
            label='Month'
            value={dayjs()
              .set('month', parseInt(props.vrInfo?.Month__c || '0') - 1)
              .format('MMMM')}
          />
          <DataItem label='Year' value={props.vrInfo?.Year__c} />
          <DataItem
            label='Start Date'
            value={dayjs(props.vrInfo?.Start_Date__c).format('DD/MM/YYYY')}
          />
          <DataItem
            label='End Date'
            value={dayjs(props.vrInfo?.End_Date__c).format('DD/MM/YYYY')}
          />
          <DataItem label='Record Type' value={props.vrInfo?.RecordType.Name} />
          <DataItem
            label='Available Session'
            value={props.vrInfo?.Available_Session__c.toString()}
          />
        </Grid>
      </Box>
    </Card>
  );
};

export default CardInfo;
