import {neutral} from '@/themes/ts/colors';
import {Box, Divider, SxProps, Typography} from '@mui/material';
import {PropsWithChildren} from 'react';
import classes from '../orientation.style.scss?inline';

interface IDataItemProps extends PropsWithChildren {
  label: string;
}

const styles: {root: SxProps; label: SxProps; children: SxProps} = {
  root: {display: 'flex', marginY: 4, paddingX: 2, flexDirection: {xs: 'column', md: 'row'}},
  label: {width: {xs: '100%', md: '40%'}, color: neutral[500]},
  children: {width: {xs: '100%', md: '60%'}},
};

export const DataItem: React.FC<IDataItemProps> = ({label, children}) => {
  return (
    <>
      <Box className={classes.DataItem} sx={styles.root}>
        <Typography className={classes.Label} sx={styles.label}>
          {label}
        </Typography>
        <Box sx={styles.children}>{children}</Box>
      </Box>
      <Divider />
    </>
  );
};
