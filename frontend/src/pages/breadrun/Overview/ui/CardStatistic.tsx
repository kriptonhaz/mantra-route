import React from 'react';
import {Box, Card, Chip, Stack, SxProps, Typography} from '@mui/material';
import IconCircle from '@/components/IconCircle';
import FeatherIcon from '@/components/FeatherIcon/FeatherIcon';

const styles: {root: SxProps} = {
  root: {width: '100%'},
};

const CardStatistic: React.FC = () => {
  return (
    <Card sx={styles.root}>
      <Stack direction='row' spacing={3}>
        <IconCircle icon='shopping-bag' color='success' />
        <Box sx={{flex: 1}}>
          <Typography variant='body2' fontWeight={'light'} color='text.secondary'>
            Breads delivered
          </Typography>
          <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
            <Typography variant='h4' fontWeight={'bold'}>
              8.2 kg
            </Typography>
            <Box>
              <Chip
                size='small'
                color='success'
                label='40%'
                icon={
                  <FeatherIcon
                    sx={{'& svg': {transform: 'scale(.65) translate(10px,4px)'}}}
                    icon='arrow-up'
                  />
                }
              />
            </Box>
            {/* <Box sx={styles.progress}>
              <FeatherIcon icon='arrow-up' />
              <Typography>40%</Typography>
            </Box> */}
          </Stack>
        </Box>
      </Stack>
    </Card>
  );
};

export default CardStatistic;
