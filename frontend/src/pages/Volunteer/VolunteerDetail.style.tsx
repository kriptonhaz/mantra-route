import {SxProps} from '@mui/material';
import {VolunteerDetailProps} from './VolunteerDetail';
import {neutral} from '@/themes/ts/colors';

interface StyleProps {
  root: SxProps;
  paper: SxProps;
  header: SxProps;
}

export const styles = (props: VolunteerDetailProps): StyleProps => ({
  root: {
    p: 3,
    width: '100%',
    marginTop: '1rem',
    borderRadius: '3rem 0 0 0',
  },
  paper: {
    padding: 3,
    flexGrow: 1,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: neutral[200],
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: 3,
  },
});
