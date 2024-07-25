import {useEffect, useState} from 'react';
import {
  Box,
  Button,
  Chip,
  Divider,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import {useCompanyHook} from '@/hooks/use-company.hook';
import Select from '@/components/Select';
import Render from '@/components/Render';
import {EmptyStateBox} from '@/components/EmptyState/EmptyState';
import {useJobsHook} from '@/hooks/use-jobs.hooks';
import ModalAddJobs from './ModalAddJobs';
import {NotePencil, Download, PlayCircle, PauseCircle} from 'phosphor-react';
import dayjs from 'dayjs';
import {queryClient} from '@/service/QueryClient';
import Pagination from '@/components/Pagination';
import {getJobsCompany} from '@/api/jobs.api';

const ListJobs: React.FC = () => {
  const {getCompanyQuery} = useCompanyHook();
  const {
    getJobsCompanyQuery,
    getJobsDownloadFileQuery,
    putExecuteJobsCompanyMutation,
    putDraftJobsCompanyMutation,
  } = useJobsHook();
  const [propsRequest, setPropsRequest] = useState({
    page: 1,
    per_page: 10,
    companyId: '',
  });
  const [propsDownload, setPropsDownload] = useState({filePath: '', enabled: false});
  const [showModalAddJobs, setShowModalAddJobs] = useState(false);
  const {data: dataListCompany} = getCompanyQuery();
  const {data: dataJobsCompany} = getJobsCompanyQuery(propsRequest);
  const {data: dataJobsDownload} = getJobsDownloadFileQuery(propsDownload);
  const renderStatus = (status: number) => {
    switch (status) {
      case 1:
        return <Chip label='Created' color='secondary' />;
      case 2:
        return <Chip label='Scheduled' color='info' />;
      case 3:
        return <Chip label='On Process' color='primary' />;
      case 4:
        return <Chip label='Failed' color='error' />;
      case 9:
        return <Chip label='Success' color='success' />;
      default:
        return <Chip label='Created' color='secondary' />;
    }
  };

  const mutationExecute = putExecuteJobsCompanyMutation({
    onSuccess: () => {
      queryClient.invalidateQueries(['job', 'list', propsRequest.companyId]);
    },
    onError(err) {
      console.log(err);
    },
  });

  const mutationDraft = putDraftJobsCompanyMutation({
    onSuccess: () => {
      queryClient.invalidateQueries(['job', 'list', propsRequest.companyId]);
    },
    onError(err) {
      console.log(err);
    },
  });

  useEffect(() => {
    if (
      (dataJobsCompany?.meta.Page || 1) <= (propsRequest.page || 1) &&
      propsRequest.companyId !== ''
    ) {
      queryClient.prefetchQuery({
        queryKey: ['job', 'list', propsRequest.companyId],
        queryFn: () => getJobsCompany(propsRequest),
      });
    }
  }, [dataJobsCompany, queryClient, propsRequest]);

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

  useEffect(() => {
    if (dataJobsDownload && propsDownload.enabled && propsDownload.filePath !== '') {
      const url = window.URL.createObjectURL(
        new Blob([dataJobsDownload], {
          type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        }),
      );
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute(
        'download',
        propsDownload.filePath.substring(propsDownload.filePath.lastIndexOf('/') + 1),
      );
      document.body.appendChild(link);
      link.click();
      setPropsDownload({
        filePath: '',
        enabled: false,
      });
    }
  }, [dataJobsDownload, propsDownload]);

  const handleDownload = (filePath: string) => {
    setPropsDownload({
      ...propsDownload,
      filePath: filePath,
      enabled: true,
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
              setPropsRequest((prev) => ({...prev, companyId: event.target.value as string}));
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
            onClick={() => setShowModalAddJobs(true)}
            sx={{
              minHeight: '55px',
            }}
            disabled={propsRequest.companyId === ''}
          >
            Create Jobs
          </Button>
        </Stack>
      </Stack>
      <Divider sx={{my: 6}} />
      <Render in={dataJobsCompany?.data.length === 0}>
        <EmptyStateBox title='No jobs found' message='Let’s create Jobs!' />
      </Render>
      <Render in={!!dataJobsCompany && dataJobsCompany?.data.length > 0}>
        <Stack direction='column' spacing={4}>
          <TableContainer component={Paper} sx={{marginTop: '20px'}}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Generated Month</TableCell>
                  <TableCell>Recounting API</TableCell>
                  <TableCell>Resynchronize Distance</TableCell>
                  <TableCell>Create Date</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {dataJobsCompany &&
                  dataJobsCompany?.data.map((row, i) => (
                    <TableRow key={i}>
                      <TableCell>{row.generated_month}</TableCell>
                      <TableCell>{row.recounting_api ? 'Yes' : 'No'}</TableCell>
                      <TableCell>{row.resynchronize_distance ? 'Yes' : 'No'}</TableCell>
                      <TableCell>{dayjs(row.create_date).format('DD MMM YYYY')}</TableCell>
                      <TableCell>{renderStatus(row.is_process)}</TableCell>
                      <TableCell>
                        <Stack direction='row' spacing={1}>
                          <Button data-shape='icon' variant='text' color='info'>
                            <NotePencil size={22} weight='bold' />
                          </Button>
                          {row.is_process === 9 && (
                            <Button
                              data-shape='icon'
                              variant='text'
                              color='primary'
                              onClick={() => handleDownload(row.output_file)}
                            >
                              <Download size={22} weight='bold' />
                            </Button>
                          )}
                          {row.is_process === 1 ? (
                            <Button
                              data-shape='icon'
                              variant='text'
                              color='success'
                              onClick={() => mutationExecute.mutate(row.id)}
                            >
                              <PlayCircle size={22} weight='bold' />
                            </Button>
                          ) : row.is_process === 2 ? (
                            <Button
                              data-shape='icon'
                              variant='text'
                              color='inherit'
                              onClick={() => mutationDraft.mutate(row.id)}
                            >
                              <PauseCircle size={22} weight='bold' />
                            </Button>
                          ) : null}
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
          count={dataJobsCompany?.meta.TotalPage ?? 1}
          onNext={onNextPage}
          onPrev={onPrevPage}
          onChange={onChangePage}
        />
      </Render>
      <ModalAddJobs
        show={showModalAddJobs}
        onClose={() => setShowModalAddJobs(false)}
        companyId={propsRequest.companyId}
      />
    </Box>
  );
};

export default ListJobs;
