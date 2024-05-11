import FeatherIcon from '@/components/FeatherIcon/FeatherIcon';
import Render from '@/components/Render';
import {neutral} from '@/themes/ts/colors';
import {combineClasses} from '@/utils/styles';
import {BoxProps, SxProps, Box, Typography, Button} from '@mui/material';
import {ReactNode} from 'react';
import classes from '@/components/Modal/styles/Modal.module.scss';

export interface SessionHeaderProps extends BoxProps {
  title?: string;
  isEdit?: boolean;
  divider?: boolean;
  onClose: () => void;
  onDelete?: () => void;
  icon?: {
    icon: ReactNode;
  };
}

export const headerStyles: {
  root: SxProps;
  button: SxProps;
  title: SxProps;
  render: SxProps;
  boxIcon: SxProps;
} = {
  root: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  title: {color: neutral[900]},
  render: {display: 'flex'},
  boxIcon: null,
  button: {
    border: 0,
    marginX: 1,
    minWidth: 24,
    minHeight: 24,
    height: 24,
    width: 24,
    boxShadow: 'none',
    backgroundColor: 'white',
  },
};

export const SessionModalHeader: React.FC<SessionHeaderProps> = ({
  title,
  onClose,
  isEdit,
  icon,
  divider,
  onDelete,
  ...props
}) => {
  return (
    <Box {...props}>
      <Box
        className={combineClasses([classes.Modal_Header, divider && classes.Divider])}
        sx={headerStyles.root}
      >
        <Box>
          <Typography variant='subtitle2' fontWeight={'semiBold'} sx={headerStyles.title}>
            {title}
          </Typography>
        </Box>
        <Box sx={headerStyles.render}>
          <Render in={!!icon}>
            <Box className={combineClasses([classes.Modal_Icon])}>{icon?.icon}</Box>
          </Render>
          {isEdit ? (
            <>
              <Button sx={headerStyles.button} onClick={onDelete}>
                <FeatherIcon icon='trash-2' />
              </Button>
            </>
          ) : (
            ''
          )}
          <Button sx={headerStyles.button} onClick={onClose}>
            <FeatherIcon icon='x' />
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
