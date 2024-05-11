import {SxProps} from '@mui/material';
import {RouteDetailProps} from './RouteDetail';

interface StyleProps {
  root: SxProps;
  paper: SxProps;
  box: SxProps;
  body: SxProps;
  divider: SxProps;
}

export const styles = (props: RouteDetailProps): StyleProps => ({
  root: {
    flexGrow: 1,
    p: 3,
    backgroundColor: 'white',
    marginTop: '1rem',
    borderRadius: '3rem 0 0 0',
  },
  paper: {
    padding: 3,
  },
  box: {display: 'flex', justifyContent: 'space-between'},
  body: {fontWeight: 500, marginBottom: 1},
  divider: {
    margin: 2,
  },
});
