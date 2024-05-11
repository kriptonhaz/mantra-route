import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  CardProps,
  Typography,
} from '@mui/material';
import {Capsule} from '../Capsule/Capsule';
import {AccessTime, CalendarTodayOutlined} from '@mui/icons-material';
import {StageType} from '../../interface/programmeEvents.interface';
import dayjs from 'dayjs';

export interface ActivityCardProps extends CardProps {
  label?: string | null;
  date?: string | null;
  time?: string | null;
  image?: string | null;
  stage: StageType | null;
  onDetail: () => void;
}

export const ActivityCard: React.FC<ActivityCardProps> = (props: ActivityCardProps) => {
  const {label, date, time, image, stage, onDetail} = props;

  return (
    <Card
      sx={{
        display: 'flex',
        marginBottom: '20px',
        borderRadius: '12px',
        padding: '20px',
      }}
    >
      <CardMedia
        component='img'
        sx={{width: 178, borderRadius: '12px'}}
        image={
          image ||
          'https://www.foodfromtheheart.sg/images/happenings/tumblr_por420JAoD1u52le7o1_1280[1].jpg'
        }
        alt='Live from space album cover'
      />
      <CardContent sx={{margin: '0 15px', flexGrow: 1}}>
        <Typography gutterBottom variant='body1' component='div'>
          {label}
        </Typography>
        <Box component='div' sx={{display: 'flex', marginBottom: '25px'}}>
          <Typography variant='body2' color='text.primary' sx={{marginRight: '1rem'}}>
            <CalendarTodayOutlined
              fontSize='inherit'
              sx={{marginRight: '4px', verticalAlign: 'middle'}}
            />
            {dayjs(date).format('DD/MM/YYYY')}
          </Typography>
          <Typography variant='body2' color='text.primary'>
            <AccessTime fontSize='inherit' sx={{marginRight: '4px', verticalAlign: 'middle'}} />
            {dayjs(time).format('HH:mm')}
          </Typography>
        </Box>
        <Button size='sm' variant='contained' onClick={onDetail}>
          Open Details
        </Button>
      </CardContent>
      <CardActions
        sx={{
          alignItems: 'start',
        }}
      >
        <Capsule label={stage || 'Planned'} />
      </CardActions>
    </Card>
  );
};
