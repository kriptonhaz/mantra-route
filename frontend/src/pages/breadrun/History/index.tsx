import {Box, Button, Divider, Grid, Stack, SxProps, Typography} from '@mui/material';
import {DeliveryCard} from '../../../components/Card/DeliveryCard';
import BtnFilter from '@/components/BtnFilter';
import usePagination from '@/hooks/use-pagination.hook';
import Pagination from '@/components/Pagination/Pagination';
import {TColorVariant, neutral} from '@/themes/ts/colors';
import {FeatherIconNames} from 'feather-icons';
import {useNavigate} from 'react-router-dom';
import CardDelivery from '@/features/dashboard/breadrun/ui/CardDelivery';
import {useState} from 'react';

interface IDelivery {
  Id: string;
  Bakery_Name__c: string;
  Name: string;
  Collection_Time_Start__c: string;
  Delivery_Order_Date__c: string;
  color: TColorVariant;
  icon: FeatherIconNames;
}
const listDelivery: IDelivery[] = [
  {
    Id: '123',
    Bakery_Name__c: 'BreadTalk Rivervale Mall',
    Name: 'DO-23040075',
    Collection_Time_Start__c: '21:00:00.000Z',
    Delivery_Order_Date__c: '2023-04-19',
    color: 'success',
    icon: 'check-circle',
  },
  {
    Id: '123',
    Bakery_Name__c: 'BreadTalk Rivervale Mall',
    Name: 'DO-23040075',
    Collection_Time_Start__c: '21:00:00.000Z',
    Delivery_Order_Date__c: '2023-04-19',
    color: 'warning',
    icon: 'alert-triangle',
  },
  {
    Id: '123',
    Bakery_Name__c: 'BreadTalk Rivervale Mall',
    Name: 'DO-23040075',
    Collection_Time_Start__c: '21:00:00.000Z',
    Delivery_Order_Date__c: '2023-04-19',
    color: 'warning',
    icon: 'alert-triangle',
  },
  {
    Id: '123',
    Bakery_Name__c: 'BreadTalk Rivervale Mall',
    Name: 'DO-23040075',
    Collection_Time_Start__c: '21:00:00.000Z',
    Delivery_Order_Date__c: '2023-04-19',
    color: 'success',
    icon: 'check-circle',
  },
  {
    Id: '123',
    Bakery_Name__c: 'BreadTalk Rivervale Mall',
    Name: 'DO-23040075',
    Collection_Time_Start__c: '21:00:00.000Z',
    Delivery_Order_Date__c: '2023-04-19',
    color: 'success',
    icon: 'check-circle',
  },
  {
    Id: '123',
    Bakery_Name__c: 'BreadTalk Rivervale Mall',
    Name: 'DO-23040075',
    Collection_Time_Start__c: '21:00:00.000Z',
    Delivery_Order_Date__c: '2023-04-19',
    color: 'error',
    icon: 'info',
  },
  {
    Id: '123',
    Bakery_Name__c: 'BreadTalk Rivervale Mall',
    Name: 'DO-23040075',
    Collection_Time_Start__c: '21:00:00.000Z',
    Delivery_Order_Date__c: '2023-04-19',
    color: 'success',
    icon: 'check-circle',
  },
  {
    Id: '123',
    Bakery_Name__c: 'BreadTalk Rivervale Mall',
    Name: 'DO-23040075',
    Collection_Time_Start__c: '21:00:00.000Z',
    Delivery_Order_Date__c: '2023-04-19',
    color: 'success',
    icon: 'check-circle',
  },
  {
    Id: '123',
    Bakery_Name__c: 'BreadTalk Rivervale Mall',
    Name: 'DO-23040075',
    Collection_Time_Start__c: '21:00:00.000Z',
    Delivery_Order_Date__c: '2023-04-19',
    color: 'error',
    icon: 'info',
  },
  {
    Id: '123',
    Bakery_Name__c: 'BreadTalk Rivervale Mall',
    Name: 'DO-23040075',
    Collection_Time_Start__c: '21:00:00.000Z',
    Delivery_Order_Date__c: '2023-04-19',
    color: 'warning',
    icon: 'alert-triangle',
  },
  {
    Id: '123',
    Bakery_Name__c: 'BreadTalk Rivervale Mall',
    Name: 'DO-23040075',
    Collection_Time_Start__c: '21:00:00.000Z',
    Delivery_Order_Date__c: '2023-04-19',
    color: 'warning',
    icon: 'alert-triangle',
  },
  {
    Id: '123',
    Bakery_Name__c: 'BreadTalk Rivervale Mall',
    Name: 'DO-23040075',
    Collection_Time_Start__c: '21:00:00.000Z',
    Delivery_Order_Date__c: '2023-04-19',
    color: 'success',
    icon: 'check-circle',
  },
];

enum TAB {
  ALL,
  DELIVERED,
  MISSED,
  CANCELLED,
}

const styles: {tabNotActive: SxProps} = {
  tabNotActive: {backgroundColor: 'transparent', color: neutral[500]},
};

export const History = () => {
  const navigate = useNavigate();
  const pagination = usePagination({page: 1, count: 5});
  const [tabActive, setTabActive] = useState<TAB>(TAB.ALL);

  return (
    <Box>
      <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
        <Box>
          <Typography variant='h6' mb={1} fontWeight={'medium'}>
            Your History
          </Typography>
          <Typography color='text.secondary'>Showing 5 out of 10</Typography>
        </Box>
        <Box>
          <BtnFilter />
        </Box>
      </Stack>
      <Divider sx={{mt: 5, mb: 6}} />
      <Stack direction='row' spacing={2} sx={{my: 6}}>
        <Button
          variant='text'
          color='inherit'
          sx={tabActive !== TAB.ALL ? styles.tabNotActive : {}}
          onClick={() => setTabActive(TAB.ALL)}
        >
          All
        </Button>
        <Button
          variant='text'
          color='inherit'
          sx={tabActive !== TAB.DELIVERED ? styles.tabNotActive : {}}
          onClick={() => setTabActive(TAB.DELIVERED)}
        >
          Delivered
        </Button>
        <Button
          variant='text'
          color='inherit'
          sx={tabActive !== TAB.MISSED ? styles.tabNotActive : {}}
          onClick={() => setTabActive(TAB.MISSED)}
        >
          Missed
        </Button>
        <Button
          variant='text'
          color='inherit'
          sx={tabActive !== TAB.CANCELLED ? styles.tabNotActive : {}}
          onClick={() => setTabActive(TAB.CANCELLED)}
        >
          Cancelled
        </Button>
      </Stack>
      <Grid container spacing={4}>
        {listDelivery.map((item) => (
          <Grid item md={6} key={item.Id}>
            <CardDelivery
              key={item.Id}
              icon={item.icon}
              color={item.color}
              bakery={item.Bakery_Name__c}
              name={item.Name}
              time={item.Collection_Time_Start__c ?? 'N/A'}
              date={item.Delivery_Order_Date__c ?? 'N/A'}
              onDetail={() => navigate('/breadrun/deliverydetail/asdasd')}
            />
          </Grid>
        ))}
      </Grid>
      <Divider sx={{mt: 6, mb: 4}} />
      <Pagination {...pagination} />
    </Box>
  );
};
