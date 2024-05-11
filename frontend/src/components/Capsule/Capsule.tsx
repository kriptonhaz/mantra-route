import React, {ReactElement} from 'react';
import {ArrowUpward} from '@mui/icons-material';
import {Box, BoxProps, Typography} from '@mui/material';

export interface CapsuleProps extends BoxProps {
  label?: string;
  adornment?: ReactElement;
}

export const Capsule: React.FC<CapsuleProps> = (props: CapsuleProps) => {
  const {label, adornment} = props;
  return (
    <Box
      sx={{
        backgroundColor: '#F0FDE4',
        color: '#3DA73A',
        display: 'flex',
        alignItems: 'center',
        borderRadius: '1rem',
        padding: '0 .5rem',
        fontSize: 12,
      }}
    >
      {adornment}
      <Typography sx={{textAlign: 'center', fontSize: 12, margin: '.3rem', fontWeight: 400}}>
        {label}
      </Typography>
    </Box>
  );
};
