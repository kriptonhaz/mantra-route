import FeatherIcon from '@/components/FeatherIcon/FeatherIcon';
import {StageType} from '@/interface/programmeEvents.interface';
import {TColorVariant, neutral} from '@/themes/ts/colors';
import {Box, Button, Card, CardMedia, Chip, Stack, SxProps, Typography} from '@mui/material';
import dayjs from 'dayjs';
import React, {useEffect, useRef} from 'react';
import {Link} from 'react-router-dom';
import ImgPlaceholder from '@/assets/placeholder-image.jpg';

const styles: {dateTime: SxProps; icon: SxProps} = {
  dateTime: {
    color: neutral[500],
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: '4px',
  },
  icon: {
    '& svg': {transform: 'scale(.8) translateY(5px)', color: neutral[400]},
  },
};

export interface ICardActivity {
  id?: string;
  title: string;
  date: string;
  time: string;
  image?: string | null;
  status?: StageType;
}
const CardActivity: React.FC<ICardActivity> = ({
  id,
  title,
  date,
  time,
  image,
  status = 'Planned',
}) => {
  const color: {[key in StageType]: Exclude<TColorVariant, 'neutral'>} = {
    Planned: 'warning',
    Started: 'info',
    Ended: 'error',
    Cancelled: 'error',
    Completed: 'success',
  };

  const imgRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    if (image) {
      imgRef.current?.addEventListener('error', (e) => {
        let img = e.target as HTMLImageElement;
        img.setAttribute('src', ImgPlaceholder);
      });
    } else {
      let img = imgRef.current;
      if (img) {
        img.setAttribute('src', ImgPlaceholder);
      }
    }
  }, [imgRef, image]);

  return (
    <Card>
      <Stack
        sx={{display: {xs: 'flex', md: 'none'}}}
        direction='column'
        spacing={4}
        justifyContent={'space-between'}
      >
        <Box>
          <CardMedia
            ref={imgRef}
            component='img'
            image={image ?? ''}
            alt='Live from space album cover'
            sx={{borderRadius: '8px', width: '100%', mb: 2}}
          />
        </Box>
        <Box sx={{flex: 1}}>
          <Typography fontWeight={'medium'} mb={2} mt={2} ml={1}>
            {title}
          </Typography>
          <Stack direction='row' mb={4} spacing={4}>
            <Box sx={styles.dateTime}>
              <FeatherIcon sx={styles.icon} icon='calendar' />
              <Typography color='text.secondary' variant='body2'>
                {dayjs(date).format('DD/MM/YYYY')}
              </Typography>
            </Box>
            <Box sx={styles.dateTime}>
              <FeatherIcon sx={styles.icon} icon='clock' />
              <Typography color='text.secondary' variant='body2'>
                {dayjs(time).format('HH:mm')}
              </Typography>
            </Box>
          </Stack>
          <Link to={`/dashboard/upcoming/${id}`}>
            <Button fullWidth>Open Details</Button>
          </Link>
        </Box>
      </Stack>
      <Stack
        sx={{display: {xs: 'none', md: 'flex'}}}
        direction='row'
        spacing={4}
        justifyContent={'space-between'}
      >
        <Box>
          <CardMedia
            ref={imgRef}
            component='img'
            image={image ?? ''}
            alt='Live from space album cover'
            sx={{borderRadius: '8px', width: 180}}
          />
        </Box>
        <Box sx={{flex: 1}}>
          <Typography fontWeight={'medium'} mb={2}>
            {title}
          </Typography>
          <Stack direction='row' mb={7} spacing={4}>
            <Box sx={styles.dateTime}>
              <FeatherIcon sx={styles.icon} icon='calendar' />
              <Typography color='text.secondary' variant='body2'>
                {dayjs(date).format('DD/MM/YYYY')}
              </Typography>
            </Box>
            <Box sx={styles.dateTime}>
              <FeatherIcon sx={styles.icon} icon='clock' />
              <Typography color='text.secondary' variant='body2'>
                {dayjs(time).format('HH:mm')}
              </Typography>
            </Box>
          </Stack>
          <Link to={`/dashboard/upcoming/${id}`}>
            <Button>Open Details</Button>
          </Link>
        </Box>
      </Stack>
    </Card>
  );
};

export default CardActivity;
