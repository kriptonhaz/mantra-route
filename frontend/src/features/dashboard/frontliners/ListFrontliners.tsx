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
import React, {useState} from 'react';
import ModalFilter from './ModalFilter';
import {VrRequestType} from '@/interface/volunteerRequest.interface';
import ModalAddFrontliners from './ModalAddFrontliners';
import {useFrontlinersHook} from '@/hooks/use-frontliners.hook';
import Render from '@/components/Render';
import {EmptyStateBox} from '@/components/EmptyState/EmptyState';
import Select from '@/components/Select';
import {useCompanyHook} from '@/hooks/use-company.hook';

const ListFrontliners: React.FC = () => {
  const {getCompanyQuery} = useCompanyHook();
  const {data: dataListCompany} = getCompanyQuery();
  const [showModalFilter, setShowModalFilter] = useState(false);
  const [showModalAddFrontliner, setShowModalAddFrontliner] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState<string | undefined>(undefined);
  const [propsRequest, setPropsRequest] = React.useState<VrRequestType>({
    page: 1,
    limit: 5,
    search: '',
    status: '',
    name: '',
    date: '',
  });
  const {getFrontlinerCompanyQuery} = useFrontlinersHook();
  const {data: dataFrontlinerCompany} = getFrontlinerCompanyQuery({
    companyId: selectedCompany || '',
  });

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
        <Stack direction='row' spacing={5} sx={{width: '50vw'}} alignItems={'center'}>
          <Select
            label='Company'
            sx={{width: '250px'}}
            onChange={(event) => {
              setSelectedCompany(event.target.value as string);
            }}
            value={selectedCompany}
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
            disabled={selectedCompany === undefined}
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
      <ModalFilter
        show={showModalFilter}
        onClose={() => setShowModalFilter(false)}
        onApply={handleFilter}
        title='Sort'
      />
      <ModalAddFrontliners
        show={showModalAddFrontliner}
        companyId={selectedCompany || ''}
        onClose={() => setShowModalAddFrontliner(false)}
      />
    </Box>
  );
};

export default ListFrontliners;
