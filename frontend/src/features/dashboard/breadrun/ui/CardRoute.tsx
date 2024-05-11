import React from 'react';
import {Card, Chip, Typography, Button, Stack, Box} from '@mui/material';

export interface ICardRoute {
  onDetail?: () => void;
}
const CardRoute: React.FC<ICardRoute> = ({onDetail}) => {
  return (
    <Card sx={{py: 4, px: 6}}>
      <Stack
        direction={{xs: 'column', md: 'row'}}
        alignItems={{xs: 'flex-start', md: 'center'}}
        justifyContent={'space-between'}
        spacing={{xs: 2, md: 6}}
      >
        <Chip label='regular' color='info' size='small' />
        <Box sx={{flex: 1}}>
          <Typography fontWeight={'medium'} mb={1}>
            Bakery Brera & Fine Foods Pte Ltd
          </Typography>
          <Typography variant='body2' fontWeight={'light'} color='text.secondary'>
            Route 000335 | Monday
          </Typography>
        </Box>
        <Button variant='outlined' color='inherit' size='sm' onClick={onDetail}>
          Detail
        </Button>
      </Stack>
    </Card>
  );
};

export default CardRoute;
