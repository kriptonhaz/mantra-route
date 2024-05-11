import {SxProps} from '@mui/material';
import {ActivityDetailProps} from './ActivityDetail';

interface StyleProps {
  root: SxProps;
  paper: SxProps;
  header: SxProps;
}

export const styles = (props: ActivityDetailProps): StyleProps => ({
  root: {
    p: 3,
    width: '100%',
    marginTop: '1rem',
    borderRadius: '3rem 0 0 0',
  },
  paper: {
    padding: 3,
    flexGrow: 1,
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: 3,
  },
});
