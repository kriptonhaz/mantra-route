import {createTheme} from '@mui/material/styles';
import {FHNeutral, FHPrime, FHSuccess, FHInfo, FHWarning, FHDanger} from './FHColor';

const theme = createTheme({
  palette: {
    background: {
      default: FHNeutral[900],
    },
    primary: {
      main: FHPrime[500],
    },
    secondary: {
      main: FHNeutral[500],
    },
    success: {
      main: FHSuccess[500],
    },
    info: {
      main: FHInfo[500],
    },
    warning: {
      main: FHWarning[500],
    },
    error: {
      main: FHDanger[500],
    },
    text: {
      primary: '#000',
      secondary: '#FFF',
    },
  },
  typography: {
    allVariants: {
      fontFamily: 'Lexend, sans-serif',
      textTransform: 'none',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        outlinedSecondary: {
          color: FHNeutral[700],
        },
      },
    },
  },
});

export default theme;
