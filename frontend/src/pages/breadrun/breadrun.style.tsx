import {SxProps} from '@mui/material';
import {BreadRunProps} from '.';
import {FHNeutral} from '../../themes/FHColor';

interface StyleProps {
  root: SxProps;
  box: SxProps;
  border: SxProps;
  tab: SxProps;
}

export const styles = (props: BreadRunProps): StyleProps => ({
  root: {
    flexGrow: 1,
    p: 3,
    backgroundColor: 'white',
    marginTop: '1rem',
    borderRadius: '3rem 0 0 0',
  },
  box: {},
  border: {
    borderBottom: 1,
    borderColor: 'divider',
    maxWidth: {xs: 270, sm: 500, md: 800},
  },
  tab: {
    color: FHNeutral[300],
  },
});
