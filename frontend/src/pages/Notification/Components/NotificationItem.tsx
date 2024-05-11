import IconCircle from '@/components/IconCircle';
import {danger, info, neutral} from '@/themes/ts/colors';
import {Box, Paper, SxProps, Typography} from '@mui/material';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import {useMemo} from 'react';

const styles: {
  root: SxProps;
  active: SxProps;
  danger: SxProps;
  box: SxProps;
  boxIcon: SxProps;
  icon: SxProps;
  time: SxProps;
} = {
  root: {
    boxShadow: 'none',
    borderColor: neutral[200],
    borderWidth: 1,
    borderStyle: 'solid',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    p: 2,
    mb: 3,
    cursor: 'pointer',
    transition: '.2s',
    ':hover': {
      backgroundColor: info[50],
      boxShadow: `0px 0px 0px 2px ${info[200]}`,
    },
  },
  active: {
    borderColor: info[500],
  },
  boxIcon: {
    backgroundColor: neutral[100],
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    margin: 1,
    color: neutral[500],
  },

  danger: {
    backgroundColor: danger[100],
    color: danger[500],
  },
  icon: {
    minWidth: 32,
    minHeight: 32,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  box: {flexGrow: 1, paddingLeft: 1},
  time: {alignSelf: 'flex-start'},
};

interface NotificationItemProps {
  active?: boolean;
  danger?: boolean;
  title: string;
  subtitle: string;
  onClick?: () => void;
  createdDate?: string;
}

export const NotificationItem = (props: NotificationItemProps) => {
  const {active, danger, title, subtitle, onClick, createdDate} = props;

  const formatTime = () => {
    dayjs.extend(relativeTime);
    return dayjs(createdDate).fromNow();
  };
  const notifTime = useMemo(formatTime, [createdDate]);

  return (
    <Paper
      sx={[
        ...(Array.isArray(styles.root) ? styles.root : [styles.root]),
        active ? styles.active : {},
      ]}
      onClick={onClick}
    >
      <IconCircle icon='info' color={danger ? 'error' : 'neutral'} />
      <Box sx={styles.box}>
        <Box>
          <Typography variant='caption' fontWeight='medium'>
            {title}
          </Typography>
        </Box>
        <Typography variant='caption' fontWeight='light'>
          {subtitle}
        </Typography>
      </Box>
      <Typography sx={styles.time} variant='overline' fontWeight='light' color='text.secondary'>
        {notifTime}
      </Typography>
    </Paper>
  );
};
