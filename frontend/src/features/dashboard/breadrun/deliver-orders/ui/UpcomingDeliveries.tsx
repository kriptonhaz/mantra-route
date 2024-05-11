import React from 'react';
import {Box, Divider, Stack, Typography} from '@mui/material';
import BtnFilter from '@/components/BtnFilter';
import CardDelivery from '../../ui/CardDelivery';
import {useNavigate} from 'react-router-dom';

const listDelivery = [
  {
    Id: '123',
    Bakery_Name__c: 'BreadTalk Rivervale Mall',
    Name: 'DO-23040075',
    Collection_Time_Start__c: '21:00:00.000Z',
    Delivery_Order_Date__c: '2023-04-19',
  },
  {
    Id: '123',
    Bakery_Name__c: 'BreadTalk Rivervale Mall',
    Name: 'DO-23040075',
    Collection_Time_Start__c: '21:00:00.000Z',
    Delivery_Order_Date__c: '2023-04-19',
  },
  {
    Id: '123',
    Bakery_Name__c: 'BreadTalk Rivervale Mall',
    Name: 'DO-23040075',
    Collection_Time_Start__c: '21:00:00.000Z',
    Delivery_Order_Date__c: '2023-04-19',
  },
  {
    Id: '123',
    Bakery_Name__c: 'BreadTalk Rivervale Mall',
    Name: 'DO-23040075',
    Collection_Time_Start__c: '21:00:00.000Z',
    Delivery_Order_Date__c: '2023-04-19',
  },
  {
    Id: '123',
    Bakery_Name__c: 'BreadTalk Rivervale Mall',
    Name: 'DO-23040075',
    Collection_Time_Start__c: '21:00:00.000Z',
    Delivery_Order_Date__c: '2023-04-19',
  },
];

const UpcomingDeliveries: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Box>
      <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
        <Box>
          <Typography variant='h6' mb={1} fontWeight={'medium'}>
            Upcoming Deliveries
          </Typography>
          <Typography color='text.secondary'>Showing 5 out of 10</Typography>
        </Box>
        <Box>
          <BtnFilter />
        </Box>
      </Stack>
      <Divider sx={{mt: 5, mb: 6}} />
      <Stack direction='column' spacing={4}>
        {listDelivery.map((item) => (
          <CardDelivery
            key={item.Id}
            icon='shopping-bag'
            color='info'
            bakery={item.Bakery_Name__c}
            name={item.Name}
            time={item.Collection_Time_Start__c ?? 'N/A'}
            date={item.Delivery_Order_Date__c ?? 'N/A'}
            onDetail={() => navigate('/breadrun/deliverydetail/asdasd')}
          />
        ))}
      </Stack>
    </Box>
  );
};

export default UpcomingDeliveries;
