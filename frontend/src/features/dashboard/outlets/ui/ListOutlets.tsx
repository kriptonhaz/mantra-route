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
import {AddBusiness} from '@mui/icons-material';
import {NotePencil, Trash, Eye} from 'phosphor-react';
import React, {useState} from 'react';
import ModalFilter from './ModalFilter';
import {VrRequestType} from '@/interface/volunteerRequest.interface';
import ModalAddOutlets from './ModalAddOutlets';
import Render from '@/components/Render';
import {EmptyStateBox} from '@/components/EmptyState/EmptyState';
import {useOutletsHook} from '@/hooks/use-outlets.hook';

const ListOutlets: React.FC = () => {
  const companyId = import.meta.env.VITE_COMPANY_ID;
  const [showModalFilter, setShowModalFilter] = useState(false);
  const [showModalAddOutlets, setShowModalAddOutlets] = useState(false);
  const [tmpSearchKeyword, setTmpSearchKeyword] = useState('');
  const [propsRequest, setPropsRequest] = React.useState<VrRequestType>({
    page: 1,
    limit: 5,
    search: '',
    status: '',
    name: '',
    date: '',
  });
  const {getOutletsCompanyQuery} = useOutletsHook();
  const {
    data: dataOutletsCompany,
    isPreviousData,
    isLoading: isLoadingFrontlinerCompany,
  } = getOutletsCompanyQuery({companyId: companyId});

  // useEffect(() => {
  //   const timeoutSearch = setTimeout(() => {
  //     setPropsRequest((prevState) => ({...prevState, search: tmpSearchKeyword}));
  //   }, 250);
  //   return () => clearTimeout(timeoutSearch);
  // }, [tmpSearchKeyword]);

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
            onClick={() => setShowModalAddOutlets(true)}
            startIcon={<AddBusiness color='secondary' sx={{fill: 'inherit'}} />}
          >
            Add Outlets
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
      <Render in={dataOutletsCompany?.data.length === 0}>
        <EmptyStateBox title='No outlets found' message='Let’s add outlets!' />
      </Render>
      <Render in={!!dataOutletsCompany && dataOutletsCompany?.data.length > 0}>
        <Stack direction='column' spacing={4}>
          <TableContainer component={Paper} sx={{marginTop: '20px'}}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Outlet ID</TableCell>
                  <TableCell>Outlet</TableCell>
                  <TableCell>Cycle</TableCell>
                  <TableCell>Interval</TableCell>
                  <TableCell>Frontline ID</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {dataOutletsCompany &&
                  dataOutletsCompany?.data.map((row, i) => (
                    <TableRow key={i}>
                      <TableCell>{row.outlet_id}</TableCell>
                      <TableCell>{row.name}</TableCell>
                      <TableCell>{row.cycle}</TableCell>
                      <TableCell>{row.interval}</TableCell>
                      <TableCell>{row.frontliner_external_id}</TableCell>
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
      <ModalAddOutlets show={showModalAddOutlets} onClose={() => setShowModalAddOutlets(false)} />
    </Box>
  );
};

export default ListOutlets;
