import {StageType} from '@/interface/programmeEvents.interface';
import {neutral} from '@/themes/ts/colors';
import {Box, Chip, Paper, SxProps, Typography} from '@mui/material';

const styles: {root: SxProps; box: SxProps} = {
  root: {borderWidth: 1, borderColor: neutral[200], borderStyle: 'solid', padding: 3, marginY: 2},
  box: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
};

interface UpcomingCardProps {
  title: string;
  time: string;
  status: StageType | string;
  badgeColor?: 'default' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning';
}

export const CardActivity = (props: UpcomingCardProps) => {
  const {title, time, status} = props;
  return (
    <Paper sx={styles.root}>
      <Typography variant='body2' fontWeight='regular'>
        {title}
      </Typography>
      <Box sx={styles.box}>
        <Typography variant='body2' fontWeight='light'>
          {time}
        </Typography>
        <Chip label={status} color={props.badgeColor || 'info'} />
      </Box>
    </Paper>
  );
};
