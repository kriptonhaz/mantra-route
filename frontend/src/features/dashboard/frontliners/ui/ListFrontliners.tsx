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
import {NotePencil, Trash, Eye} from 'phosphor-react';
import React, {useState, useEffect} from 'react';
import ModalFilter from './ModalFilter';
import {VrRequestType} from '@/interface/volunteerRequest.interface';
import ModalAddFrontliners from './ModalAddFrontliners';
import {useFrontlinersHook} from '@/hooks/use-frontliners.hook';
import Render from '@/components/Render';
import {EmptyStateBox} from '@/components/EmptyState/EmptyState';

const ListFrontliners: React.FC = () => {
  const companyId = import.meta.env.VITE_COMPANY_ID;
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
  const {getFrontlinerCompanyQuery} = useFrontlinersHook();
  const {
    data: dataFrontlinerCompany,
    isPreviousData,
    isLoading: isLoadingFrontlinerCompany,
  } = getFrontlinerCompanyQuery({companyId: companyId});
  // const {listVolunteerRequest} = useVolunteerRequestHook();
  // const {
  //   data: dataVolunteerRequest,
  //   isPreviousData,
  //   isLoading: isLoadingVolunteerRequest,
  // } = listVolunteerRequest(propsRequest);

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
            startIcon={<FeatherIcon icon='user-plus' />}
          >
            Add Frontliners
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
      <Render in={dataFrontlinerCompany?.data.length === 0}>
        <EmptyStateBox title='No frontliners found' message='Let’s add frontliners!' />
      </Render>
      <Render in={!!dataFrontlinerCompany && dataFrontlinerCompany?.data.length > 0}>
        <Stack direction='column' spacing={4}>
          <TableContainer component={Paper} sx={{marginTop: '20px'}}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Position</TableCell>
                  <TableCell>ID Project</TableCell>
                  <TableCell>Max Visit Per Day</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {dataFrontlinerCompany &&
                  dataFrontlinerCompany?.data.map((row, i) => (
                    <TableRow key={i}>
                      <TableCell>{row.frontliner_id}</TableCell>
                      <TableCell>{row.name}</TableCell>
                      <TableCell>{row.position}</TableCell>
                      <TableCell>{row.id_project}</TableCell>
                      <TableCell>{row.max_visit_per_day}</TableCell>
                      <TableCell>
                        <Stack direction='row' spacing={1}>
                          <Button data-shape='icon' variant='text' color='info'>
                            <Eye size={22} weight='bold' />
                          </Button>
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

      <ModalFilter
        show={showModalFilter}
        onClose={() => setShowModalFilter(false)}
        onApply={handleFilter}
        title='Sort'
      />
      <ModalAddFrontliners
        show={showModalAddFrontliner}
        onClose={() => setShowModalAddFrontliner(false)}
      />
    </Box>
  );
};

export default ListFrontliners;
