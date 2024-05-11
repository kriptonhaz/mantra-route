import {Attendance} from '@/interface/attendance.interface';
import {neutral} from '@/themes/ts/colors';
import {shadows} from '@/themes/ts/shadows';
import {Chip, TableProps} from '@mui/material';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import dayjs from 'dayjs';

export interface AttendanceTableProps extends TableProps {
  label?: string;
  listAttendances?: Attendance[];
}

export const AttendancaTable: React.FC<AttendanceTableProps> = (props: AttendanceTableProps) => {
  console.log(props);
  return (
    <TableContainer
      sx={{boxShadow: shadows['lg'], border: `1px solid ${neutral[300]}`, overflow: 'auto'}}
      component={Paper}
    >
      <Table>
        <TableHead sx={{border: '0px'}}>
          <TableRow>
            <TableCell sx={{fontSize: 12, fontWeight: 500, minWidth: '120px'}}>
              Attendance
            </TableCell>
            <TableCell sx={{fontSize: 12, fontWeight: 500, minWidth: '200px'}}>
              Volunteer Request
            </TableCell>
            <TableCell sx={{fontSize: 12, fontWeight: 500, minWidth: '150px'}}>
              Volunteer Type
            </TableCell>
            <TableCell sx={{fontSize: 12, fontWeight: 500, minWidth: '200px'}}>
              Volunteer Session
            </TableCell>
            <TableCell sx={{fontSize: 12, fontWeight: 500, minWidth: '120px'}}>
              Checked In
            </TableCell>
            <TableCell sx={{fontSize: 12, fontWeight: 500, minWidth: '120px'}}>
              Checked Out
            </TableCell>
            <TableCell sx={{fontSize: 12, fontWeight: 500, minWidth: '100px'}}>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.listAttendances?.map((row) => (
            <TableRow key={row.Id} sx={{'&:last-child td, &:last-child th': {border: 0}}}>
              <TableCell sx={{fontSize: 12, fontWeight: 400}} component='th' scope='row'>
                {row?.Contact__r.Name}
              </TableCell>
              <TableCell sx={{fontSize: 12, fontWeight: 400}}>
                {row.Volunteer_Request__r.Name}
              </TableCell>
              <TableCell sx={{fontSize: 12, fontWeight: 400}}>
                {row?.Volunteer_Request__r.Volunteer_Type__c || '-'}
              </TableCell>
              <TableCell sx={{fontSize: 12, fontWeight: 400}}>
                {row.Volunteer_Session__r?.Session_Title__c || '-'}
              </TableCell>
              <TableCell sx={{fontSize: 12, fontWeight: 400}}>
                {!!row.Checked_In__c ? dayjs(row.Checked_In__c).format('DD/MM/YYYY, HH:mm A') : '-'}
              </TableCell>
              <TableCell sx={{fontSize: 12, fontWeight: 400}}>
                {!!row.Checked_Out__c
                  ? dayjs(row.Checked_Out__c).format('DD/MM/YYYY, HH:mm A')
                  : '-'}
              </TableCell>
              <TableCell sx={{fontSize: 12, fontWeight: 400}}>
                <Chip
                  label={row.Checked_IN_OUT_Status__c}
                  color={/out/i.test(row.Checked_IN_OUT_Status__c) ? 'error' : 'success'}
                  size='small'
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
