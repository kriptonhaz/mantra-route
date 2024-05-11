import {Box, Button, Card, CardActions, CardContent, CardProps, Typography} from '@mui/material';
import {Capsule} from '../Capsule/Capsule';
import {CalendarTodayOutlined, WorkOutline} from '@mui/icons-material';
import dayjs from 'dayjs';

export interface OpportunityCardProps extends CardProps {
  label?: string | null;
  startDate?: string | null;
  endDate?: string | null;
  availableSession?: number;
  recordType?: string | null;
}

export const OpportunityCard: React.FC<OpportunityCardProps> = (props: OpportunityCardProps) => {
  const {label, startDate, endDate, availableSession, recordType} = props;
  return (
    <Card
      sx={{
        display: 'flex',
        marginBottom: '20px',
        borderRadius: '12px',
        padding: '20px 10px',
      }}
    >
      <CardContent sx={{flexGrow: 1}}>
        <Typography gutterBottom variant='body1' component='div'>
          {label}
        </Typography>
        <Box component='div' sx={{display: 'flex', marginBottom: '25px'}}>
          <Typography variant='body2' color='text.primary' sx={{marginRight: '1rem'}}>
            <CalendarTodayOutlined
              fontSize='inherit'
              sx={{marginRight: '4px', verticalAlign: 'middle'}}
            />
            {dayjs(startDate).format('DD/MM/YYYY')} - {dayjs(endDate).format('DD/MM/YYYY')}
          </Typography>
          <Typography variant='body2' color='text.primary'>
            <WorkOutline fontSize='inherit' sx={{marginRight: '4px', verticalAlign: 'middle'}} />
            {availableSession}
            Available Session
          </Typography>
        </Box>
        <Button size='sm' variant='contained'>
          Open Details
        </Button>
      </CardContent>
      <CardActions
        sx={{
          alignItems: 'start',
        }}
      >
        <Capsule label={recordType || ''} />
      </CardActions>
    </Card>
  );
};
