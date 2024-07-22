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
import {NotePencil, Trash} from 'phosphor-react';
import React, {useState} from 'react';
import Render from '@/components/Render';
import {EmptyStateBox} from '@/components/EmptyState/EmptyState';
import {useCompanyHook} from '@/hooks/use-company.hook';
import ModalAddCompany from './ModalAddCompany';

const ListCompany: React.FC = () => {
  const [showModalAddCompany, setShowModalAddCompany] = useState(false);
  const {getCompanyQuery} = useCompanyHook();
  const {data: dataListCompany} = getCompanyQuery();

  return (
    <Box>
      <Stack
        direction={{xs: 'column', md: 'row'}}
        justifyContent={'space-between'}
        alignItems={{xs: 'flex-start', md: 'center'}}
      >
        <Stack direction='column' spacing={2}>
          <Button
            onClick={() => setShowModalAddCompany(true)}
            startIcon={<FeatherIcon icon='plus' />}
          >
            Add Company
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
      <ModalAddCompany show={showModalAddCompany} onClose={() => setShowModalAddCompany(false)} />
    </Box>
  );
};

export default ListCompany;
