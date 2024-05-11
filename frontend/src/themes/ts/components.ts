import {Components} from '@mui/material';
import {danger, info, neutral, primary, success, warning} from './colors';
import {shadows, shadowsArray} from './shadows';
import {CaretDown} from 'phosphor-react';

declare module '@mui/material/Button' {
  interface ButtonPropsSizeOverrides {
    small: false;
    medium: false;
    large: false;
    sm: true;
    md: true;
    lg: true;
    xl: true;
    '2xl': true;
  }
}
declare module '@mui/material/IconButton' {
  interface IconButtonPropsSizeOverrides {
    small: false;
    medium: false;
    large: false;
    sm: true;
    md: true;
    lg: true;
    xl: true;
    '2xl': true;
  }
}

const objColor = {
  primary: primary,
  neutral: neutral,
  success: success,
  info: info,
  warning: warning,
  danger: danger,
};

const fnBtnColorStyle = (
  color: 'primary' | 'neutral' | 'success' | 'info' | 'warning' | 'danger',
  variant: 'contained' | 'text',
) => {
  if (variant === 'contained')
    return {
      color: '#fff',
      background: objColor[color][600],
      ':hover': {
        background: objColor[color][700],
      },
      ':focus': {
        boxShadow: `0px 0px 0px 4px ${objColor[color][100]}`,
      },
      ':disabled': {
        background: objColor[color][200],
        color: '#fff',
      },
    };
  if (variant === 'text')
    return {
      background: objColor[color][50],
      ':hover': {
        background: objColor[color][100],
      },
      ':focus': {
        background: objColor[color][50],
        boxShadow: `0px 0px 0px 4px ${objColor[color][100]}`,
      },
      ':disabled': {
        background: 'none',
        color: objColor[color][300],
      },
    };
};

export const components: Components = {
  MuiButton: {
    defaultProps: {
      variant: 'contained',
      size: 'md',
      disableRipple: true,
    },
    styleOverrides: {
      root: {
        borderRadius: '8px',
        textTransform: 'capitalize',
        fontWeight: 500,

        '& .MuiButton-startIcon svg, & .MuiButton-endIcon svg': {
          transform: 'translateY(3px)',
        },

        "&[data-shape='icon']": {
          minWidth: '0px',
          padding: '0px !important',
          '& span.MuiCircularProgress-root': {
            height: '18px !important',
            width: '18px !important',
          },
        },

        '& span.MuiCircularProgress-root': {
          height: '24px !important',
          width: '24px !important',
        },

        // --- size sm ---
        '&.MuiButton-sizeSm': {
          height: '36px',
          fontSize: '14px',
          padding: '8px 14px',
          "&[data-shape='icon']": {
            height: '36px',
            width: '36px',
            '& svg': {
              width: '17px',
            },
          },
        },
        // --- size md ---
        '&.MuiButton-sizeMd': {
          height: '40px',
          fontSize: '14px',
          padding: '10px 16px',
          "&[data-shape='icon']": {
            height: '40px',
            width: '40px',
            '& svg': {
              width: '17px',
            },
          },
        },
        // --- size lg ---
        '&.MuiButton-sizeLg': {
          height: '44px',
          fontSize: '16px',
          padding: '10px 18px',
          "&[data-shape='icon']": {
            height: '44px',
            width: '44px',
            '& svg': {
              width: '17px',
            },
          },
        },
        // --- size xl ---
        '&.MuiButton-sizeXl': {
          height: '48px',
          fontSize: '16px',
          padding: '12px 20px',
          "&[data-shape='icon']": {
            height: '48px',
            width: '48px',
            '& svg': {
              width: '17px',
            },
          },
        },
        // --- size 2xl ---
        '&.MuiButton-size2xl': {
          height: '60px',
          fontSize: '18px',
          padding: '16px 28px',
          "&[data-shape='icon']": {
            height: '56px',
            width: '56px',
            '& svg': {
              width: '20px',
            },
          },
        },
      },

      outlined: {
        borderColor: neutral[300],
      },
      containedPrimary: {
        color: neutral[800],
        background: primary[500],
        ':hover': {
          background: primary[600],
        },
        ':focus': {
          boxShadow: `0px 0px 0px 4px ${primary[100]}`,
        },
        ':disabled': {
          background: primary[200],
          color: '#fff',
        },
      },
      textPrimary: {
        color: primary[600],
        background: primary[100],
        ':hover': {
          background: primary[200],
        },
        ':focus': {
          background: primary[100],
          boxShadow: `0px 0px 0px 4px ${primary[200]}`,
        },
        ':disabled': {
          background: 'none',
          color: primary[300],
        },
      },
      containedInfo: fnBtnColorStyle('info', 'contained'),
      textInfo: fnBtnColorStyle('info', 'text'),
      containedSuccess: fnBtnColorStyle('success', 'contained'),
      textSuccess: fnBtnColorStyle('success', 'text'),
      containedWarning: fnBtnColorStyle('warning', 'contained'),
      textWarning: fnBtnColorStyle('warning', 'text'),
      containedError: fnBtnColorStyle('danger', 'contained'),
      textError: fnBtnColorStyle('danger', 'text'),
      containedInherit: fnBtnColorStyle('neutral', 'contained'),
      textInherit: fnBtnColorStyle('neutral', 'text'),
    },
  },
  MuiCircularProgress: {
    defaultProps: {
      disableShrink: true,
      color: 'inherit',
    },
  },
  MuiChip: {
    styleOverrides: {
      root: {
        textTransform: 'uppercase',
      },
      sizeMedium: {
        padding: '2px 0px',
        fontSize: '14px',
      },
      sizeSmall: {
        fontSize: '12px',
      },
      outlined: {
        borderWidth: '2px',
        borderColor: neutral[700],
        color: neutral[700],
      },
      outlinedPrimary: {
        borderColor: primary[700],
        color: primary[700],
      },
      filled: {
        background: neutral[100],
        color: neutral[700],
      },
      filledPrimary: {
        background: primary[50],
        color: primary[700],
      },
      colorError: {
        '&.MuiChip-filled': {
          background: danger[50],
          color: danger[500],
        },
        '&.MuiChip-outlined': {
          borderColor: danger[700],
          color: danger[700],
        },
      },
      colorSuccess: {
        '&.MuiChip-filled': {
          background: success[50],
          color: success[700],
        },
        '&.MuiChip-outlined': {
          borderColor: success[700],
          color: success[700],
        },
      },
      colorInfo: {
        '&.MuiChip-filled': {
          background: info[50],
          color: info[500],
        },
        '&.MuiChip-outlined': {
          borderColor: info[700],
          color: info[700],
        },
      },
      colorWarning: {
        '&.MuiChip-filled': {
          background: warning[50],
          color: warning[700],
        },
        '&.MuiChip-outlined': {
          borderColor: warning[700],
          color: warning[700],
        },
      },
    },
  },
  MuiModal: {
    styleOverrides: {
      root: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        '& > .MuiBox-root': {
          position: 'relative',
          background: '#fff',
          boxShadow: '0px 24px 48px -12px rgba(16, 24, 40, 0.18)',
          minWidth: '320px',
          width: '100%',
          maxWidth: '900px',
          minHeight: '100px',
          borderRadius: '12px',
          outline: 'none',
        },
        '& .btn-close': {
          position: 'absolute',
          right: '12px',
          top: '12px',
        },
      },
    },
  },
  MuiBackdrop: {
    styleOverrides: {
      root: {
        '&.modal-backdrop': {
          backgroundImage:
            'linear-gradient(to bottom, rgba(52, 64, 84, 0.4), rgba(52, 64, 84, 0.6))',
          backdropFilter: 'blur(1px)',
        },
      },
    },
  },
  MuiTableHead: {
    styleOverrides: {
      root: {
        '& .MuiTableRow-root .MuiTableCell-root': {
          color: neutral[700],
          fontSize: '12px',
        },
      },
    },
  },
  MuiTableBody: {
    styleOverrides: {
      root: {
        '& .MuiTableRow-root .MuiTableCell-root': {
          color: neutral[700],
          fontSize: '14px',
        },
        '& .MuiTableRow-root .MuiTableCell-root svg': {
          width: '17px',
        },
        '&.hoverable .MuiTableRow-root:hover': {
          backgroundColor: info[50],
          cursor: 'pointer',
          '& .MuiTableCell-root': {
            color: neutral[900],
          },
        },
      },
    },
  },
  MuiTableCell: {
    styleOverrides: {
      root: {
        fontWeight: 500,
        fontSize: '14px',
        height: '54px',
        padding: '0px 16px',
        borderBottom: `1px solid ${neutral[200]}`,
        '& a': {
          color: neutral[700],
        },
        '& .MuiIconButton-root.MuiButtonBase-root': {
          width: '28px',
          height: '28px',
          padding: '0',
          borderRadius: '4px',
          '& svg': {
            color: neutral[500],
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%) scale(.9)',
          },
        },
        '& .MuiIconButton-root.MuiButtonBase-root:hover': {
          background: info[100],
          '& svg': {
            color: info[500],
          },
        },
      },
    },
  },
  MuiTextField: {
    defaultProps: {fullWidth: true, variant: 'filled'},
    styleOverrides: {
      root: {
        '& .MuiFormLabel-root': {
          color: neutral[500],
          fontSize: '14px',
          fontWeight: 300,
        },
        '& .MuiInputBase-root.MuiFilledInput-root': {
          borderRadius: 4,
          background: neutral[50],
          borderBottom: 'none',
          '&::before': {
            borderBottom: `1px solid ${neutral[200]}`,
          },
        },
      },
    },
  },
  MuiPaginationItem: {
    styleOverrides: {
      root: {
        '&.Mui-selected': {
          color: primary[700],
          background: primary[50],
          fontWeight: 500,
          pointerEvents: 'none',
        },
      },
    },
  },
  MuiFormControlLabel: {
    styleOverrides: {
      root: {
        '& span.MuiTypography-root.MuiFormControlLabel-label': {
          fontWeight: 400,
        },
      },
    },
  },
  MuiFormControl: {
    styleOverrides: {
      root: {
        '&[data-error="true"]': {
          '& div[data-shape="icon"]': {
            color: danger[500],
          },
        },
      },
    },
  },
  MuiPaper: {
    styleOverrides: {
      root: {
        '&.MuiCard-root': {
          overflow: 'initial',
        },
        '&.select-dropdown': {
          padding: '4px 10px',
          border: '1px solid #EAECF0',
          boxShadow:
            '0px 12px 16px -4px rgba(16, 24, 40, 0.08), 0px 4px 6px -2px rgba(16, 24, 40, 0.03)',
          borderRadius: '8px',
        },
        '&.select-dropdown ul': {
          display: 'flex',
          flexDirection: 'column',
          gap: '4px',
        },
        '&.select-dropdown li.MuiMenuItem-root': {
          borderRadius: '6px',
          height: '44px',
          padding: '0px 20px',
          '&:active': {
            backgroundColor: primary[200],
          },
        },
        "&.select-dropdown li.MuiMenuItem-root[data-value=' ']": {
          display: 'none',
        },
        '&.date-picker__paper': {
          boxShadow: shadows.lg,
        },
      },
    },
  },
  MuiCard: {
    styleOverrides: {
      root: {
        padding: 16,
        border: `1px solid ${neutral[200]}`,
        borderRadius: '12px',
        boxShadow: shadowsArray[4],
      },
    },
  },
  MuiTabs: {
    styleOverrides: {
      root: {
        '& .MuiTabs-flexContainer': {
          gap: '16px',
        },
        '& span.MuiTabs-indicator': {
          backgroundColor: primary[700],
          height: '2px',
        },
      },
    },
  },
  MuiTab: {
    styleOverrides: {
      root: {
        '&.MuiTab-textColorPrimary': {
          color: neutral[500],
          '&.Mui-selected': {
            color: primary[700],
            backgroundColor: primary[50],
          },
        },
      },
    },
  },
  MuiBreadcrumbs: {
    styleOverrides: {
      root: {
        '& .MuiBreadcrumbs-separator': {
          margin: '0px 14px',
        },
      },
    },
  },
  MuiToggleButtonGroup: {
    styleOverrides: {
      root: {
        '& .Mui-selected': {
          backgroundColor: primary[500],
          color: neutral[800],
        },
      },
    },
  },
  MuiStepper: {
    styleOverrides: {
      root: {
        '& .MuiStepLabel-iconContainer svg.MuiSvgIcon-root': {
          height: '16px !important',
          marginTop: 4,
        },
        '& .MuiStepConnector-root .MuiStepConnector-line': {
          borderTopWidth: 2,
          borderColor: primary[500],
        },
      },
    },
  },
  MuiAlert: {
    styleOverrides: {
      root: {
        '&.alert-neutral': {
          background: neutral[50],
          color: neutral[700],
          '& svg': {
            color: neutral[700],
          },
        },
      },
    },
  },
};
