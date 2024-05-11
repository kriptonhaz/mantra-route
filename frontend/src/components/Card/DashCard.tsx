import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {ReactElement} from 'react';
import {Chip, Divider, Grid} from '@mui/material';
import {ArrowUpward, PeopleOutline} from '@mui/icons-material';
import {Capsule} from '../Capsule/Capsule';

export interface DashCardProps {
  actionPath: string;
  actionLabel: string;
  icon: ReactElement;
  label: string;
  counter: string;
  increase?: string;
}

export const DashCard = (props: DashCardProps) => {
  const {actionPath, increase, icon, label, counter, actionLabel} = props;
  return (
    <Card sx={{minWidth: 275}}>
      <CardContent sx={{flexDirection: 'row', display: 'flex'}}>
        <Grid container columns={12}>
          <Grid item xs={2} sx={{display: 'flex', alignItems: 'start', justifyContent: 'center'}}>
            <Box
              sx={{
                backgroundColor: '#F0FDE4',
                padding: '.3rem',
                aspectRatio: 1,
                color: '#3DA73A',
                display: 'flex',
                alignItems: 'center',
                borderRadius: '1rem',
              }}
            >
              {icon}
            </Box>
          </Grid>
          <Grid item xs={7}>
            <Typography sx={{fontSize: 14, color: '#70707B', fontWeight: 300}} gutterBottom>
              {label}
            </Typography>
            <Typography
              variant='h5'
              component='h4'
              sx={{fontSize: 32, color: '#26272B', fontWeight: 700}}
            >
              {counter}
            </Typography>
          </Grid>
          <Grid item xs={3} sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            {increase && (
              <Capsule adornment={<ArrowUpward fontSize='inherit' />} label={increase} />
            )}
          </Grid>
        </Grid>
      </CardContent>
      <Divider />
      <CardActions sx={{display: 'flex', justifyContent: 'flex-end'}}>
        <Button sx={{borderRadius: '.5rem'}} variant='contained'>
          {actionLabel}
        </Button>
      </CardActions>
    </Card>
  );
};
