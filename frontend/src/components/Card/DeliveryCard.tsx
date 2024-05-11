import {Card, CardContent, Grid, Box, Typography, Button} from '@mui/material';
import {ShoppingBag} from '@mui/icons-material';
import {FHInfo} from '../../themes/FHColor';
import {Link} from 'react-router-dom';

export interface DeliveryCardProps {
  itemName?: string;
  bakeryName?: string;
  doNumber?: string;
  date?: string;
  time?: string;
  isUrgent?: boolean;
}

export const DeliveryCard = (props: DeliveryCardProps) => {
  const {time, bakeryName, date, itemName} = props;
  return (
    <Card
      sx={{
        margin: '1rem 0',
      }}
    >
      <CardContent sx={{flexDirection: 'row', display: 'flex'}}>
        <Grid container>
          <Grid
            item
            xs={12}
            md={2}
            sx={{
              display: 'flex',
              alignItems: 'start',
              justifyContent: {xs: 'start', sm: 'center'},
            }}
          >
            <Box
              sx={{
                backgroundColor: FHInfo[100],
                padding: '.5rem',
                aspectRatio: 1,
                color: FHInfo[600],
                display: 'flex',
                alignItems: 'center',
                borderRadius: '1rem',
              }}
            >
              <ShoppingBag />
            </Box>
          </Grid>
          <Grid item md={8} xs={12} sx={{marginTop: {xs: 2, sm: 0}, marginBottom: {xs: 1, sm: 0}}}>
            <Typography variant='body1' component='h5' sx={{color: '#26272B', fontWeight: 700}}>
              {bakeryName}
            </Typography>
            <Typography sx={{fontSize: 12, color: '#70707B'}} gutterBottom>
              {itemName}
            </Typography>
            <Typography sx={{color: '#70707B'}} variant='body2' gutterBottom>
              {date} | {time?.substring(0, 5)}
            </Typography>
          </Grid>
          <Grid
            item
            xs={12}
            md={2}
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Link to='/breadrun/deliverydetail/asdasd'>
              <Button color='inherit' variant='outlined'>
                Detail
              </Button>
            </Link>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};
