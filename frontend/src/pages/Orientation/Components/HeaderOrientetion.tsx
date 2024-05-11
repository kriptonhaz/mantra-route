import {primary} from '@/themes/ts/colors';
import {Box, Typography} from '@mui/material';
import classes from '../orientation.style.scss?inline';
import Logo from '../../../assets/img/logo-ffth.png';

interface IHeaderOrientation {
  title: string;
}
export const HeaderOrientation: React.FC<IHeaderOrientation> = ({title}) => {
  return (
    <Box
      className={classes.Header}
      sx={{
        borderBottom: 1,
        borderWidth: 2,
        borderColor: primary[500],
        padding: 6,
        background:
          'linear-gradient(0deg, #FFFEF2, #FFFEF2),linear-gradient(0deg, #FFD200, #FFD200)',
      }}
    >
      <Box>
        <img className={classes.Logo} src={Logo} alt='Logo Dreams' />
        <Typography mt={3} fontWeight='bold'>
          {title}
        </Typography>
      </Box>
    </Box>
  );
};
