import {NotifDataType} from '@/interface/notification.interface';
import {neutral} from '@/themes/ts/colors';
import {Box, Divider, Paper, SxProps, Typography} from '@mui/material';
import dayjs from 'dayjs';

interface NotificationDetailProps {
  notification: NotifDataType | null;
}

const styles: {
  root: SxProps;
  header: SxProps;
  body: SxProps;
  footer: SxProps;
  footnote: SxProps;
  label: SxProps;
} = {
  root: {
    borderColor: neutral[200],
    borderWidth: 1,
    borderStyle: 'solid',
    my: 2,
    minHeight: '65vh',
    display: 'flex',
    flexDirection: 'column',
  },
  header: {py: 4, px: 6},
  body: {px: 6, py: 4, flexGrow: 1},
  footer: {
    margin: 2,
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  footnote: {flexGrow: 1, px: 6, py: 4},
  label: {color: neutral[500]},
};

export const NotificationDetail: React.FC<NotificationDetailProps> = ({notification}) => {
  return (
    <Paper sx={styles.root}>
      <Box sx={styles.header}>
        <Typography variant='h6' fontWeight='medium'>
          {notification?.Title__c || 'Title'}
        </Typography>
        <Typography variant='body1' fontWeight='regular'>
          {notification?.Subtitle__c}
        </Typography>
      </Box>
      <Divider />
      <Box sx={styles.body}>
        <Typography color='text.secondary' mb={2}>
          Body
        </Typography>
        <Typography variant='body2' fontWeight='regular'>
          {notification?.Body__c}
        </Typography>
      </Box>
      <Box sx={styles.footer}>
        <Box sx={styles.footnote}>
          <Typography sx={styles.label} fontWeight='regular' mb={1}>
            Last modified by
          </Typography>
          <Typography fontWeight='regular'>Admin</Typography>
        </Box>
        <Box sx={styles.footnote}>
          <Typography sx={styles.label} fontWeight='regular' mb={1}>
            Date Created
          </Typography>
          <Typography fontWeight='regular'>
            {dayjs(notification?.CreatedDate).format('DD/MM/YYYY')}
          </Typography>
        </Box>
      </Box>
    </Paper>
  );
};
