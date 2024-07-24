import FeatherIcon from '@/components/FeatherIcon/FeatherIcon';
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
import {NotePencil, Trash, Eye} from 'phosphor-react';
import React, {useEffect, useState} from 'react';
import ModalAddFrontliners from './ModalAddFrontliners';
import {useFrontlinersHook} from '@/hooks/use-frontliners.hook';
import Render from '@/components/Render';
import {EmptyStateBox} from '@/components/EmptyState/EmptyState';
import Select from '@/components/Select';
import {useCompanyHook} from '@/hooks/use-company.hook';
import ModalConfirm, {IModalConfirmProps} from '@/components/Modal/ui/ModalConfirm';
import {queryClient} from '@/service/QueryClient';
import Pagination from '@/components/Pagination';
import {IFrontlineRequestType} from '@/interface/frontliners.interface';
import {getFrontlinerCompany} from '@/api/frontliners.api';

const ListFrontliners: React.FC = () => {
  const {getCompanyQuery} = useCompanyHook();
  const {data: dataListCompany} = getCompanyQuery();
  const [showModalAddFrontliner, setShowModalAddFrontliner] = useState(false);
  const [propsRequest, setPropsRequest] = React.useState<IFrontlineRequestType>({
    page: 1,
    per_page: 1,
    companyId: '',
  });
  const {getFrontlinerCompanyQuery, deleteFrontlinerMutation} = useFrontlinersHook();
  const {data: dataFrontlinerCompany} = getFrontlinerCompanyQuery(propsRequest);
  const [modalConfirm, setModalConfirm] = useState<IModalConfirmProps>({
    show: false,
    title: '',
    description: '',
    color: 'warning',
    onClose: () => handleCloseConfirm(),
    onConfirm: () => null,
  });

  useEffect(() => {
    if (
      (dataFrontlinerCompany?.meta.Page || 1) <= (propsRequest.page || 1) &&
      propsRequest.companyId !== ''
    ) {
      queryClient.prefetchQuery({
        queryKey: ['frontliner', 'list', propsRequest.companyId],
        queryFn: () => getFrontlinerCompany(propsRequest),
      });
    }
  }, [dataFrontlinerCompany, queryClient, propsRequest]);

  const mutationDeleteFrontliner = deleteFrontlinerMutation({
    onSuccess: () => {
      queryClient.invalidateQueries(['frontliner', 'list', propsRequest.companyId]);
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

  const handleDelete = (frontlinerId: string) => {
    setModalConfirm({
      ...modalConfirm,
      title: 'Confirm Deletion',
      description: 'Do you really want to delete this data?',
      show: true,
      onConfirm: () => {
        mutationDeleteFrontliner.mutate(frontlinerId);
      },
    });
  };

  const onNextPage = () => {
    setPropsRequest({
      ...propsRequest,
      page: (propsRequest.page ?? 1) + 1,
    });
  };

  const onPrevPage = () => {
    setPropsRequest({
      ...propsRequest,
      page: (propsRequest.page ?? 1) - 1,
    });
  };

  const onChangePage = (val: number) => {
    setPropsRequest({...propsRequest, page: val});
  };

  return (
    <Box>
      <Stack
        direction={{xs: 'column', md: 'row'}}
        justifyContent={'space-between'}
        alignItems={{xs: 'flex-start', md: 'center'}}
      >
        <Stack direction='row' spacing={5} sx={{width: '50vw'}} alignItems={'center'}>
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
            onClick={() => setShowModalAddFrontliner(true)}
            startIcon={<FeatherIcon icon='user-plus' />}
            sx={{
              minHeight: '55px',
            }}
            disabled={propsRequest.companyId === ''}
          >
            Add Frontliners
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
        <Divider sx={{my: 4}} />
        <Pagination
          page={propsRequest.page ?? 1}
          count={dataFrontlinerCompany?.meta.TotalPage ?? 1}
          onNext={onNextPage}
          onPrev={onPrevPage}
          onChange={onChangePage}
        />
      </Render>
      <ModalAddFrontliners
        show={showModalAddFrontliner}
        companyId={propsRequest.companyId || ''}
        onClose={() => setShowModalAddFrontliner(false)}
      />
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

export default ListFrontliners;
