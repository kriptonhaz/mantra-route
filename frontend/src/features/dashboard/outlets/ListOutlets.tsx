import FeatherIcon from '@/components/FeatherIcon/FeatherIcon';
import InputSearch from '@/components/InputSearch';
import Pagination from '@/components/Pagination/Pagination';
import {
  Box,
  Button,
  Divider,
  Stack,
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
import Select from '@/components/Select';
import {useCompanyHook} from '@/hooks/use-company.hook';
import {IOutletRequestType} from '@/interface/outlets.interface';
import ModalConfirm, {IModalConfirmProps} from '@/components/Modal/ui/ModalConfirm';
import {queryClient} from '@/service/QueryClient';

const ListOutlets: React.FC = () => {
  const {getCompanyQuery} = useCompanyHook();
  const {getOutletsCompanyQuery, deleteOutletsCompanyMutation} = useOutletsHook();
  const {data: dataListCompany} = getCompanyQuery();
  const [showModalFilter, setShowModalFilter] = useState(false);
  const [showModalAddOutlets, setShowModalAddOutlets] = useState(false);
  const [propsRequest, setPropsRequest] = React.useState<IOutletRequestType>({
    page: 1,
    per_page: 10,
    companyId: '',
  });
  const [modalConfirm, setModalConfirm] = useState<IModalConfirmProps>({
    show: false,
    title: '',
    description: '',
    color: 'warning',
    onClose: () => handleCloseConfirm(),
    onConfirm: () => null,
  });
  const {
    data: dataOutletsCompany,
    isPreviousData,
    isLoading: isLoadingFrontlinerCompany,
  } = getOutletsCompanyQuery(propsRequest);

  const mutationDeleteOutlet = deleteOutletsCompanyMutation({
    onSuccess: () => {
      queryClient.invalidateQueries(['outlets', 'list', propsRequest.companyId]);
      handleCloseConfirm();
    },
    onError(err) {
      console.log(err);
    },
  });

  const handleCloseConfirm = () => {
    setModalConfirm({
      ...modalConfirm,
      show: false,
    });
  };

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

  const handleDelete = (outletId: string) => {
    setModalConfirm({
      ...modalConfirm,
      title: 'Confirm Deletion',
      description: 'Do you really want to delete this data?',
      show: true,
      onConfirm: () => {
        mutationDeleteOutlet.mutate(outletId);
      },
    });
  };

  return (
    <Box>
      <Stack
        direction={{xs: 'column', md: 'row'}}
        justifyContent={'space-between'}
        alignItems={{xs: 'flex-start', md: 'center'}}
      >
        <Stack direction='row' spacing={2} sx={{width: '50vw'}} alignItems={'center'}>
          <Select
            label='Company'
            sx={{width: '250px'}}
            onChange={(event) => {
              setPropsRequest({...propsRequest, companyId: event.target.value as string});
            }}
            value={propsRequest.companyId}
            options={
              dataListCompany !== undefined
                ? dataListCompany.data.map((item, index) => {
                    let tmpData = {
                      label: item.name,
                      value: item.id,
                    };
                    return tmpData;
                  })
                : []
            }
          />
          <Button
            onClick={() => setShowModalAddOutlets(true)}
            startIcon={<AddBusiness color='secondary' sx={{fill: 'inherit'}} />}
            sx={{
              minHeight: '55px',
            }}
            disabled={propsRequest.companyId === undefined}
          >
            Add Outlets
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
                          <Button
                            data-shape='icon'
                            variant='text'
                            color='error'
                            onClick={() => handleDelete(row.id)}
                          >
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
      <ModalConfirm
        show={modalConfirm.show}
        title={modalConfirm.title}
        description={modalConfirm.description}
        color={modalConfirm.color}
        onClose={modalConfirm.onClose}
        onConfirm={modalConfirm.onConfirm}
      />
    </Box>
  );
};

export default ListOutlets;
