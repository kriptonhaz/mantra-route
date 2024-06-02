import FeatherIcon from '@/components/FeatherIcon/FeatherIcon';
import Pagination from '@/components/Pagination/Pagination';
import Render from '@/components/Render';
import usePagination from '@/hooks/use-pagination.hook';
import {useVolunteerSessionHook} from '@/hooks/use-volunteerSession.hooks';
import {IAssignedVolunteer} from '@/interface/volunteerSession.interface';
import {neutral} from '@/themes/ts/colors';
import {
  Box,
  Button,
  Divider,
  Paper,
  Stack,
  TableContainer,
  TableHead,
  Typography,
  Table,
  TableRow,
  TableCell,
  TableBody,
  CircularProgress,
} from '@mui/material';
import React, {useState} from 'react';
import ModalEditVolunteer from './ModalEditVolunteer';

export interface ITableVolunteerProps {
  listAssignedVolunteer: IAssignedVolunteer[];
  onClear: () => void;
  onAdd: () => void;
  loading: boolean;
}

const TableVolunteer: React.FC<ITableVolunteerProps> = ({
  onClear,
  onAdd,
  listAssignedVolunteer,
  loading,
}) => {
  const [modalEditState, setModalEditState] = useState<{
    show: boolean;
    volunteerData: IAssignedVolunteer | null;
  }>({
    show: false,
    volunteerData: null,
  });
  const pagination = usePagination({count: 10, page: 1});
  const {deleteMutation} = useVolunteerSessionHook();
  const deleteItem = deleteMutation();

  return (
    <Box mt={8}>
      <Stack
        direction={{xs: 'column', md: 'row'}}
        justifyContent={'space-between'}
        alignItems={{xs: 'flex-start', md: 'center'}}
      >
        <Typography fontWeight={'medium'} mb={2}>
          Volunteer Assignment{' '}
          <Render in={loading}>
            <CircularProgress
              color='info'
              sx={{width: '20px !important', height: '20px !important', ml: 2}}
            />
          </Render>
        </Typography>
        <Stack direction={'row'} spacing={{xs: 1, md: 4}}>
          <Button
            variant='outlined'
            color='inherit'
            onClick={onClear}
            startIcon={<FeatherIcon icon='trash-2' />}
          >
            Clear{' '}
            <Typography
              variant='button'
              sx={{fontSize: 'inherit', display: {xs: 'none', md: 'inline-block'}, ml: 1}}
            >
              Volunteers
            </Typography>
          </Button>
          <Button onClick={onAdd} startIcon={<FeatherIcon icon='user-plus' />}>
            Add{' '}
            <Typography
              variant='button'
              sx={{fontSize: 'inherit', display: {xs: 'none', md: 'inline-block'}, ml: 1}}
            >
              Volunteers
            </Typography>
          </Button>
        </Stack>
      </Stack>
      <Divider sx={{my: 5}} />
      <TableContainer component={Paper}>
        <Table sx={{border: `1px solid ${neutral[200]}`, overflow: 'hidden'}}>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Mobile Phone</TableCell>
              <TableCell width={100}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {listAssignedVolunteer
              .filter((volunteer) => volunteer.Assignee_Status__c !== 'Cancelled')
              .map((volunteer) => (
                <TableRow key={volunteer.Id}>
                  <TableCell>{volunteer.Volunteer_Name__r.Name}</TableCell>
                  <TableCell>{volunteer.Volunteer_Name__r.Email}</TableCell>
                  <TableCell>{volunteer.Volunteer_Name__r.MobilePhone}</TableCell>
                  <TableCell>
                    <Stack direction={'row'} spacing={4}>
                      <Button
                        data-shape='icon'
                        color='inherit'
                        variant='outlined'
                        onClick={() =>
                          setModalEditState((prev) => ({
                            ...prev,
                            show: true,
                            volunteerData: volunteer,
                          }))
                        }
                      >
                        <FeatherIcon sx={{'& svg': {transform: 'scale(1.2)'}}} icon='edit' />
                      </Button>
                      <Button
                        data-shape='icon'
                        color='inherit'
                        variant='outlined'
                        onClick={() => deleteItem.mutate({assignedId: volunteer.Id})}
                      >
                        <Render in={deleteItem.isLoading}>
                          <CircularProgress />
                        </Render>
                        <Render in={!deleteItem.isLoading}>
                          <FeatherIcon sx={{'& svg': {transform: 'scale(1.2)'}}} icon='trash-2' />
                        </Render>
                      </Button>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box mt={4}>{/* <Pagination {...pagination} /> */}</Box>

      <ModalEditVolunteer
        show={modalEditState.show}
        onClose={() => setModalEditState((prev) => ({...prev, show: false}))}
        volunteerData={modalEditState.volunteerData}
      />
    </Box>
  );
};

export default TableVolunteer;
