import FeatherIcon from '@/components/FeatherIcon/FeatherIcon';
import InputSearch from '@/components/InputSearch';
import Pagination from '@/components/Pagination/Pagination';
import {
  Box,
  Button,
  CircularProgress,
  Divider,
  Stack,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import {NotePencil, Trash} from 'phosphor-react';
import React, {useState, useEffect} from 'react';
import {VrRequestType} from '@/interface/volunteerRequest.interface';
import Render from '@/components/Render';
import {EmptyStateBox} from '@/components/EmptyState/EmptyState';
import {useCompanyHook} from '@/hooks/use-company.hook';

const ListCompany: React.FC = () => {
  const [showModalFilter, setShowModalFilter] = useState(false);
  const [showModalAddFrontliner, setShowModalAddFrontliner] = useState(false);
  const [tmpSearchKeyword, setTmpSearchKeyword] = useState('');
  const [propsRequest, setPropsRequest] = React.useState<VrRequestType>({
    page: 1,
    limit: 5,
    search: '',
    status: '',
    name: '',
    date: '',
  });
  const {getCompanyQuery} = useCompanyHook();
  const {data: dataListCompany, isPreviousData, isLoading: isLoadingCompany} = getCompanyQuery();

  // useEffect(() => {
  //   if (
  //     !isPreviousData &&
  //     (dataVolunteerRequest?.metaData.totalPages || 0) <= (propsRequest.page || 0)
  //   ) {
  //     queryClient.prefetchQuery({
  //       queryKey: ['listVolunteerRequest', propsRequest],
  //       queryFn: () => getListVolunteerRequest(propsRequest),
  //     });
  //   }
  // }, [dataVolunteerRequest, queryClient, isPreviousData, propsRequest]);

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
        <Stack direction='column' spacing={2}>
          {/* {isLoadingVolunteerRequest ? (
            <CircularProgress color={'primary'} />
          ) : (
            <Typography color='text.secondary' mb={{xs: 2, md: 0}}>
              Showing{' '}
              {(dataVolunteerRequest?.metaData.totalPages || 0) <=
              (dataVolunteerRequest?.metaData.currentPage || 0)
                ? dataVolunteerRequest?.metaData.totalRecords
                : (dataVolunteerRequest?.metaData.currentPage || 0) *
                  (propsRequest.limit || 0)}{' '}
              of {dataVolunteerRequest?.metaData.totalRecords || 'N/A'} total
            </Typography>
          )} */}
          <Button
            onClick={() => setShowModalAddFrontliner(true)}
            startIcon={<FeatherIcon icon='plus' />}
          >
            Add Company
          </Button>
        </Stack>
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
      <Render in={dataListCompany?.data.length === 0}>
        <EmptyStateBox title='No frontliners found' message='Let’s add frontliners!' />
      </Render>
      <Render in={!!dataListCompany && dataListCompany?.data.length > 0}>
        <Stack direction='column' spacing={4}>
          <TableContainer component={Paper} sx={{marginTop: '20px'}}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>No</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>PIC</TableCell>
                  <TableCell>Phone</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Address</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {dataListCompany &&
                  dataListCompany?.data.map((row, i) => (
                    <TableRow key={i}>
                      <TableCell>{i + 1}</TableCell>
                      <TableCell>{row.name}</TableCell>
                      <TableCell>{row.pic}</TableCell>
                      <TableCell>{row.phone}</TableCell>
                      <TableCell>{row.email}</TableCell>
                      <TableCell>{row.address}</TableCell>
                      <TableCell>
                        <Stack direction='row' spacing={1}>
                          <Button data-shape='icon' variant='text' color='primary'>
                            <NotePencil size={22} weight='bold' />
                          </Button>
                          <Button data-shape='icon' variant='text' color='error'>
                            <Trash size={22} weight='bold' />
                          </Button>
                        </Stack>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Stack>
      </Render>
      {/* <Divider sx={{my: 4}} /> */}
      {/* 
      // TODO: will add after being wired
      <Pagination
        page={propsRequest.page ?? 1}
        count={dataVolunteerRequest?.metaData.totalPages ?? 1}
        onNext={onNextPage}
        onPrev={onPrevPage}
        onChange={onChangePage}
      /> 
      */}

      {/* <ModalFilter
        show={showModalFilter}
        onClose={() => setShowModalFilter(false)}
        onApply={handleFilter}
        title='Sort'
      />
      <ModalAddFrontliners
        show={showModalAddFrontliner}
        onClose={() => setShowModalAddFrontliner(false)}
      /> */}
    </Box>
  );
};

export default ListCompany;
