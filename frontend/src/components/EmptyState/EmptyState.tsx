import ImgEmptyState from '@/assets/empty-state-icon.svg';
import {neutral, primary} from '@/themes/ts/colors';
import {shadows} from '@/themes/ts/shadows';
import {Box, Button, SxProps, Typography} from '@mui/material';
import {NavLink} from 'react-router-dom';

const styles: {root: SxProps; button: SxProps} = {
  root: {
    borderRadius: 1,
    p: 6,
    mt: 4,
    textAlign: 'center',
    borderColor: neutral[200],
    borderStyle: 'solid',
    borderWidth: 1,
    boxShadow: shadows.lg,
  },
  button: {color: primary[600], backgroundColor: primary[100]},
};

interface EmptyStateBoxProps {
  title?: string;
  message?: string;
  action?: string;
  to?: string;
}

export const EmptyStateBox = (props: EmptyStateBoxProps) => {
  const {title, message, action, to} = props;
  return (
    <Box sx={styles.root}>
      <img src={ImgEmptyState} alt='empty' />
      <Typography mt={4} mb={2}>
        {title ? title : 'Nothing to see here'}
      </Typography>
      <Typography mb={4} color='text.secondary' variant='body2' fontWeight={'light'}>
        {message ? message : 'Lets find something!'}
      </Typography>
      {action ? (
        <NavLink to={to ? to : '/'}>
          <Button sx={styles.button}>Look for activities</Button>
        </NavLink>
      ) : (
        ''
      )}
    </Box>
  );
};
