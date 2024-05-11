import {Card, CardContent, Grid, Box, Typography, Button} from '@mui/material';
import {Capsule} from '../Capsule/Capsule';
import {Link} from 'react-router-dom';

export const RouteCard = () => {
  return (
    <Card sx={{minWidth: 275, margin: '1rem 0'}}>
      <CardContent sx={{flexDirection: 'row', display: 'flex'}}>
        <Grid container columns={12} spacing={2}>
          <Grid item xs={2} sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <Capsule label='REGULAR' />
          </Grid>
          <Grid item xs={8}>
            <Box sx={{padding: '0 10px'}}>
              <Typography variant='body1' component='h5' sx={{color: '#26272B', fontWeight: 700}}>
                Bakery Brera & Fine Foods Pte Ltd
              </Typography>
              <Typography sx={{fontSize: 14, color: '#70707B', fontWeight: 300}} gutterBottom>
                Route 000335 | Monday
              </Typography>
            </Box>
          </Grid>
          <Grid
            item
            xs={2}
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Link to='/breadrun/routedetail/asdasd'>
              <Button sx={{borderRadius: '.5rem'}} variant='outlined'>
                Detail
              </Button>
            </Link>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};
