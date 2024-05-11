import FeatherIcon from '@/components/FeatherIcon/FeatherIcon';
import InputSearch from '@/components/InputSearch';
import Pagination from '@/components/Pagination/Pagination';
import {useVolunteerRequestHook} from '@/hooks/use-volunteerRequest.hooks';
import {Box, Button, CircularProgress, Divider, Stack, Typography} from '@mui/material';
import React, {useState, useEffect} from 'react';
import VolunteerItem from './VolunteerItem';
import ModalFilter from './ModalFilter';
import {VrRequestType} from '@/interface/volunteerRequest.interface';
import {queryClient} from '@/service/QueryClient';
import {getListVolunteerRequest} from '@/api/volunteerRequest.api';

const ListVolunteer: React.FC = () => {
  const [showModalFilter, setShowModalFilter] = useState(false);
  const [tmpSearchKeyword, setTmpSearchKeyword] = useState('');
  const [propsRequest, setPropsRequest] = React.useState<VrRequestType>({
    page: 1,
    limit: 5,
    search: '',
    status: '',
    name: '',
    date: '',
  });
  const {listVolunteerRequest} = useVolunteerRequestHook();
  const {
    data: dataVolunteerRequest,
    isPreviousData,
    isLoading: isLoadingVolunteerRequest,
  } = listVolunteerRequest(propsRequest);

  useEffect(() => {
    if (
      !isPreviousData &&
      (dataVolunteerRequest?.metaData.totalPages || 0) <= (propsRequest.page || 0)
    ) {
      queryClient.prefetchQuery({
        queryKey: ['listVolunteerRequest', propsRequest],
        queryFn: () => getListVolunteerRequest(propsRequest),
      });
    }
  }, [dataVolunteerRequest, queryClient, isPreviousData, propsRequest]);

  useEffect(() => {
    const timeoutSearch = setTimeout(() => {
      setPropsRequest((prevState) => ({...prevState, search: tmpSearchKeyword}));
    }, 250);
    return () => clearTimeout(timeoutSearch);
  }, [tmpSearchKeyword]);

  const onNextPage = () => {
    setPropsRequest((prevState: VrRequestType) => {
      return {
        ...propsRequest,
        page: (prevState.page ?? 1) + 1,
      };
    });
  };

  const onPrevPage = () => {
    setPropsRequest((prevState: VrRequestType) => {
      return {
        ...propsRequest,
        page: (prevState.page ?? 1) - 1,
      };
    });
  };

  const onChangePage = (val: number) => {
    setPropsRequest({...propsRequest, page: val});
  };

  const handleFilter = (data: Partial<VrRequestType>) => {
    setPropsRequest((prev) => ({...prev, ...data}));
    setShowModalFilter(false);
  };

  return (
    <Box>
      <Stack
        direction={{xs: 'column', md: 'row'}}
        justifyContent={'space-between'}
        alignItems={{xs: 'flex-start', md: 'center'}}
      >
        {isLoadingVolunteerRequest ? (
          <CircularProgress color={'primary'} />
        ) : (
          <Typography color='text.secondary' mb={{xs: 2, md: 0}}>
            Showing{' '}
            {(dataVolunteerRequest?.metaData.totalPages || 0) <=
            (dataVolunteerRequest?.metaData.currentPage || 0)
              ? dataVolunteerRequest?.metaData.totalRecords
              : (dataVolunteerRequest?.metaData.currentPage || 0) * (propsRequest.limit || 0)}{' '}
            of {dataVolunteerRequest?.metaData.totalRecords || 'N/A'} total
          </Typography>
        )}
        <Stack direction='row' spacing={2}>
          <InputSearch onChange={(e) => setTmpSearchKeyword(e.target.value)} />
          <Button
            variant='outlined'
            color='inherit'
            startIcon={
              <FeatherIcon icon='filter' sx={{'& svg': {transform: 'scale(.8) translateY(3px)'}}} />
            }
            onClick={() => setShowModalFilter(true)}
          >
            Sort
          </Button>
        </Stack>
      </Stack>
      <Divider sx={{my: 6}} />
      <Stack direction='column' spacing={4}>
        {dataVolunteerRequest?.volunteerRequests.map((item) => {
          return (
            <VolunteerItem
              key={item.Id}
              id={item.Id}
              title={item.Name}
              startDate={item.Start_Date__c}
              endDate={item.End_Date__c}
              status={item.RecordType.Name}
              session={item.Available_Session__c}
              volunteerType={item.Volunteer_Type__c}
            />
          );
        })}
      </Stack>
      <Divider sx={{my: 4}} />
      <Pagination
        page={propsRequest.page ?? 1}
        count={dataVolunteerRequest?.metaData.totalPages ?? 1}
        onNext={onNextPage}
        onPrev={onPrevPage}
        onChange={onChangePage}
      />

      <ModalFilter
        show={showModalFilter}
        onClose={() => setShowModalFilter(false)}
        onApply={handleFilter}
        title='Sort'
      />
    </Box>
  );
};

export default ListVolunteer;
