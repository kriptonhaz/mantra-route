import {EmptyStateBox} from '@/components/EmptyState/EmptyState';
import FeatherIcon from '@/components/FeatherIcon/FeatherIcon';
import Render from '@/components/Render/Render';
import CardDelivery from '@/features/dashboard/breadrun/ui/CardDelivery';
import DashboardLayout from '@/layouts/dashboard.layout';
import {Box, CircularProgress, Divider, Paper, Stack, SxProps, Typography} from '@mui/material';
import dayjs from 'dayjs';
import {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import deliveryMan from '../../../assets/img/delivery-man.png';
import {Button} from '../../../components/Button/ThemedButton';
import {useSuperbunHook} from '../../../hooks/use-superbun.hooks';
import {DayRangeFilter, sortType} from '../../../interface/delivery.interface';
import {FHPrime} from '../../../themes/FHColor';
import CardStatistic from './ui/CardStatistic';

export interface OverviewProps {
  isRegistered?: boolean;
}

export const Overview = (props: OverviewProps) => {
  const navigate = useNavigate();
  const {isRegistered} = props;
  const {isLoading, upcomingDo, getListDo} = useSuperbunHook();
  const [currentPage, setCurrentPage] = useState(1);
  const limitPage = 10;
  const [activeTab, setActiveTab] = useState(0);
  const [searchFilter, setSearchFilter] = useState<{
    name: string;
    dayRange: DayRangeFilter;
    sort: sortType;
  }>({
    name: '',
    dayRange: 'This year',
    sort: 'asc',
  });

  useEffect(() => {
    if (!isLoading) {
      onGetListDataDo({
        dayRange: searchFilter.dayRange,
        sort: searchFilter.sort,
      });
    }
  }, []);

  const onGetListDataDo = ({dayRange, sort}: {dayRange: DayRangeFilter; sort: sortType}) => {
    let startDate!: string;
    let endDate!: string;
    switch (dayRange) {
      case 'Today':
        startDate = dayjs().format('YYYY-MM-DD');
        endDate = dayjs().format('YYYY-MM-DD');
        break;

      case 'This week':
        startDate = dayjs().subtract(7, 'day').format('YYYY-MM-DD');
        endDate = dayjs().format('YYYY-MM-DD');
        break;

      case 'Last week':
        startDate = dayjs().subtract(14, 'day').format('YYYY-MM-DD');
        endDate = dayjs().subtract(7, 'day').format('YYYY-MM-DD');
        break;

      case 'Last month':
        startDate = dayjs().subtract(30, 'day').format('YYYY-MM-DD');
        endDate = dayjs().format('YYYY-MM-DD');
        break;

      case 'This year':
        startDate = dayjs().startOf('year').format('YYYY-MM-DD');
        endDate = dayjs().endOf('year').format('YYYY-MM-DD');
        break;

      default:
        break;
    }
    getListDo(
      {
        page: currentPage,
        limit: limitPage,
        isUrgent: false,
        status: activeTab === 0 ? ['Assigned'] : activeTab === 1 ? ['Delivered'] : ['Missed'],
        startDate: startDate,
        endDate: endDate,
        sort: sort,
        bakeryName: searchFilter.name,
      },
      'upcoming',
    );
  };

  return (
    <>
      <Box sx={{mt: -4}}>
        <Render in={!!isRegistered}>
          <Stack direction={{xs: 'column', md: 'row'}} spacing={{xs: 3, md: 6}} sx={{mb: 8}}>
            <Box sx={{flex: 1}}>
              <CardStatistic />
            </Box>
            <Box sx={{flex: 1}}>
              <CardStatistic />
            </Box>
            <Box sx={{flex: 1}}>
              <CardStatistic />
            </Box>
          </Stack>
        </Render>
        <Stack
          direction={{xs: 'column', md: 'row'}}
          justifyContent={'space-between'}
          sx={{width: '100%', mt: 8}}
          alignItems={'flex-start'}
          spacing={6}
        >
          <DashboardLayout.Content>
            <Box>
              <Render in={!isRegistered}>
                <Paper
                  elevation={0}
                  sx={{
                    background: `url(${deliveryMan}), ${FHPrime[100]};`,
                    backgroundPosition: 'right',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'contain',
                    p: 8,
                    borderRadius: '16px',
                    mb: 6,
                  }}
                >
                  <Typography variant='h6' mb={2}>
                    Wanna contribute with bread runs?
                  </Typography>
                  <Box sx={{width: '60%'}} mb={6}>
                    <Typography color='text.secondary'>
                      For the Bread Run programme, you will collect bread from a bakery or hotel the
                      same time every week
                    </Typography>
                  </Box>
                  <Button>Register now</Button>
                </Paper>
              </Render>

              <Box>
                <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
                  <Box>
                    <Typography variant='h6' mb={1}>
                      Upcoming Deliveries
                    </Typography>
                    <Typography color='text.secondary'>List of asssigned DOs</Typography>
                  </Box>
                  <Box>
                    <Button
                      size='sm'
                      variant='outlined'
                      color='inherit'
                      endIcon={<FeatherIcon icon='arrow-up-right' />}
                    >
                      See All
                    </Button>
                  </Box>
                </Stack>
                <Divider sx={{margin: '20px 0'}} />
                <Stack direction='column' spacing={4}>
                  {isLoading ? (
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
                    <>
                      {upcomingDo?.doData.records.map((item) => {
                        return (
                          <CardDelivery
                            key={item.Id}
                            icon='info'
                            color='error'
                            bakery={item.Bakery_Name__c}
                            name={item.Name}
                            time={item.Collection_Time_Start__c ?? 'N/A'}
                            date={item.Delivery_Order_Date__c ?? 'N/A'}
                            onDetail={() => navigate('/breadrun/deliverydetail/asdasd')}
                          />
                        );
                      })}
                    </>
                  )}
                </Stack>
              </Box>
            </Box>
          </DashboardLayout.Content>
          <DashboardLayout.Activity>
            <Box mb={6}>
              <Typography variant='h6' fontWeight={'medium'} mb={1}>
                Upcoming Deliveries
              </Typography>
              <Typography color='text.secondary'>List of asssigned DOs</Typography>
              <Divider sx={{mt: 5, mb: 6}} />
              <EmptyStateBox
                title="You don't have an assigned delivery order"
                message="Let's change that! register to become one of the bread runners"
              />
            </Box>
            <Box>
              <Typography variant='h6' fontWeight={'medium'} mb={1}>
                Your History
              </Typography>
              <Typography color='text.secondary'>List of past DOs</Typography>
              <Divider sx={{mt: 5, mb: 6}} />
              <EmptyStateBox
                title="You haven't done any delivery order"
                message="Let's change that! register to become one of the bread runners"
              />
            </Box>
          </DashboardLayout.Activity>
        </Stack>
      </Box>
    </>
  );
};
