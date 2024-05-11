import {getListProgrammeEvents} from '@/api/programmeEvents.api';
import FeatherIcon from '@/components/FeatherIcon/FeatherIcon';
import InputSearch from '@/components/InputSearch';
import Pagination from '@/components/Pagination/Pagination';
import {useProgrammeEventsHook} from '@/hooks/use-programmeEvents.hooks';
import {ProgrammeEventRequestType} from '@/interface/programmeEvents.interface';
import {queryClient} from '@/service/QueryClient';
import {Box, Button, CircularProgress, Divider, Stack, Typography} from '@mui/material';
import React, {useEffect, useState} from 'react';
import CardActivity from './CardActivity';
import {EmptyStateBox} from '@/components/EmptyState/EmptyState';
import ModalFilter from './ModalFilter';

const ListActivities: React.FC = () => {
  const {listProgrammeEvents} = useProgrammeEventsHook();
  const [tmpSearchKeyword, setTmpSearchKeyword] = useState('');
  const [showModalFilter, setShowModalFilter] = useState(false);
  const [propsRequest, setPropsRequest] = React.useState<ProgrammeEventRequestType>({
    page: 1,
    limit: 5,
    search: '',
    status: ['Planned'],
    name: '',
    date: '',
  });
  const {
    data: dataProgrammeEvent,
    isPreviousData,
    isLoading: isLoadingProgrammeEvent,
  } = listProgrammeEvents(propsRequest);

  React.useEffect(() => {
    if (
      !isPreviousData &&
      (dataProgrammeEvent?.metaData.totalPages || 0) <= (propsRequest.page || 0)
    ) {
      queryClient.prefetchQuery({
        queryKey: ['listProgrammeEvents', propsRequest],
        queryFn: () => getListProgrammeEvents(propsRequest),
      });
    }
  }, [dataProgrammeEvent, queryClient, isPreviousData, propsRequest]);

  useEffect(() => {
    const timeoutSearch = setTimeout(() => {
      setPropsRequest((prevState) => ({...prevState, search: tmpSearchKeyword}));
    }, 250);
    return () => clearTimeout(timeoutSearch);
  }, [tmpSearchKeyword]);

  const onNextPage = () => {
    setPropsRequest((prevState: ProgrammeEventRequestType) => {
      return {
        ...propsRequest,
        page: (prevState.page ?? 1) + 1,
      };
    });
  };

  const onPrevPage = () => {
    setPropsRequest((prevState: ProgrammeEventRequestType) => {
      return {
        ...propsRequest,
        page: (prevState.page ?? 1) - 1,
      };
    });
  };

  const onChangePage = (val: number) => {
    setPropsRequest({...propsRequest, page: val});
  };

  const handleFilter = (data: Partial<ProgrammeEventRequestType>) => {
    setPropsRequest((prev) => ({...prev, ...data}));
    setShowModalFilter(false);
  };

  return (
    <Box>
      {
        <>
          <Stack
            direction={{xs: 'column', md: 'row'}}
            justifyContent={'space-between'}
            alignItems={{xs: 'flex-start', md: 'center'}}
          >
            {isLoadingProgrammeEvent ? (
              <CircularProgress color={'primary'} />
            ) : (
              <Typography color='text.secondary'>
                {dataProgrammeEvent?.metaData.totalRecords === 0
                  ? '0 upcoming activities'
                  : `Showing ${
                      dataProgrammeEvent?.metaData.currentPage ===
                      dataProgrammeEvent?.metaData.totalPages
                        ? dataProgrammeEvent?.metaData.totalRecords
                        : (dataProgrammeEvent?.metaData.currentPage || 0) *
                          (propsRequest.limit || 0)
                    } of ${dataProgrammeEvent?.metaData.totalRecords || 'N/A'} total`}
              </Typography>
            )}

            <Stack direction='row' spacing={2}>
              <InputSearch onChange={(e) => setTmpSearchKeyword(e.target.value)} />
              <Button
                variant='outlined'
                color='inherit'
                onClick={() => setShowModalFilter(true)}
                startIcon={
                  <FeatherIcon
                    icon='filter'
                    sx={{'& svg': {transform: 'scale(.8) translateY(3px)'}}}
                  />
                }
              >
                Sort
              </Button>
            </Stack>
          </Stack>
          <Divider sx={{my: 6}} />
          {dataProgrammeEvent?.metaData.totalRecords === 0 ? (
            <EmptyStateBox
              title='There are no upcoming activities at the moment!'
              message='Please come back later!'
            />
          ) : (
            <>
              <Stack direction='column' spacing={4}>
                {dataProgrammeEvent?.programmeDatas.map((item) => {
                  return (
                    <CardActivity
                      key={item.Id}
                      id={item.Id}
                      title={item.Name}
                      status={item.Programme_Stage__c || 'Planned'}
                      date={item.Start_Date_Time__c}
                      time={item.Start_Date_Time__c}
                      image={item.Photo_Url__c || null}
                    />
                  );
                })}
              </Stack>
              <Divider sx={{my: 4}} />
              <Pagination
                page={propsRequest.page ?? 1}
                count={dataProgrammeEvent?.metaData.totalPages ?? 1}
                onNext={onNextPage}
                onPrev={onPrevPage}
                onChange={onChangePage}
              />
            </>
          )}
        </>
      }

      <ModalFilter
        show={showModalFilter}
        onClose={() => setShowModalFilter(false)}
        onApply={handleFilter}
        title='Sort'
      />
    </Box>
  );
};

export default ListActivities;
