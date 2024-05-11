import {neutral} from '@/themes/ts/colors';
import {SxProps, Box, Typography} from '@mui/material';

export interface InfoItemProps {
  title: string;
  info: string;
}

export const infoItemStyle: {root: SxProps; title: SxProps; info: SxProps} = {
  root: {marginTop: 1},
  title: {color: neutral[500]},
  info: {color: neutral[800]},
};

export const InfoItem = (props: InfoItemProps) => {
  const {title, info} = props;
  return (
    <Box sx={infoItemStyle.root}>
      <Typography variant='body2' sx={infoItemStyle.title}>
        {title}
      </Typography>
      <Typography variant='body2' sx={infoItemStyle.info}>
        {info}
      </Typography>
    </Box>
  );
};
