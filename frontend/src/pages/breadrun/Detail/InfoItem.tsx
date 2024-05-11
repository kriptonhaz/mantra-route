import {Box, Typography} from '@mui/material';
import {FHNeutral} from '../../../themes/FHColor';

export interface InfoItemProps {
  title: string;
  info: string;
}

export const InfoItem = (props: InfoItemProps) => {
  const {title, info} = props;
  return (
    <Box sx={{marginTop: 1}}>
      <Typography variant='body2' sx={{fontWeight: 400, color: FHNeutral[500]}}>
        {title}
      </Typography>
      <Typography variant='body2' sx={{fontWeight: 400}}>
        {info}
      </Typography>
    </Box>
  );
};
