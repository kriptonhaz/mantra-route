import React from 'react';
import {Box, Button, Stack, SxProps, Typography} from '@mui/material';
import IconCircle from '@/components/IconCircle';
import FeatherIcon from '@/components/FeatherIcon/FeatherIcon';
import {info} from '@/themes/ts/colors';

const styles: {root: SxProps} = {
  root: {
    backgroundColor: info[50],
    display: 'flex',
    gap: '12px',
    p: 4,
    borderRadius: '8px',
    mt: 6,
  },
};

export interface IBoxImportProps {
  onUpload: () => void;
  onAdd: () => void;
}
const BoxImport: React.FC<IBoxImportProps> = ({onUpload, onAdd}) => {
  return (
    <>
      <Box sx={styles.root}>
        <Box sx={{display: {xs: 'none', md: 'block'}}}>
          <IconCircle icon='info' color='info' />
        </Box>
        <Box>
          <Typography fontWeight={'medium'} mb={2}>
            Import Volunteers
          </Typography>
          <Typography color='text.secondary' variant='body2' mb={4}>
            You can download the template and fill it up before uploading the file to
          </Typography>
          <Stack direction={{xs: 'column', md: 'row'}} spacing={{xs: 2, md: 4}}>
            <Button
              href='/ParticipantDatav2.csv'
              startIcon={<FeatherIcon icon='download' />}
              variant='outlined'
              color='inherit'
              sx={{background: '#fff'}}
            >
              Download Template
            </Button>
            <Button color='success' onClick={onUpload} startIcon={<FeatherIcon icon='upload' />}>
              Upload File
            </Button>
            <Button onClick={onAdd} startIcon={<FeatherIcon icon='user-plus' />}>
              Add Volunteer
            </Button>
          </Stack>
        </Box>
      </Box>
    </>
  );
};

export default BoxImport;
