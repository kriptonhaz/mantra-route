import {createTheme} from '@mui/material';
import {palette} from './palette';
import {shadowsArray} from './shadows';
import {typography} from './typography';
import {spacing} from './spacing';
import {components} from './components';

export const theme = createTheme({
  spacing: spacing,
  typography: typography,
  palette: palette,
  shadows: shadowsArray,
  components: components,
  shape: {
    borderRadius: 8,
  },
});
