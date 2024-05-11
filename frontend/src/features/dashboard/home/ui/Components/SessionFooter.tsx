import {combineClasses} from '@/utils/styles';
import {StackProps, Box, Stack} from '@mui/material';
import {PropsWithChildren} from 'react';
import classes from '@/components/Modal/styles/Modal.module.scss';

export interface IModalFooterProps extends PropsWithChildren, StackProps {
  onCancel?: () => void;
  divider?: boolean;
}
export const Footer: React.FC<IModalFooterProps> = (rootProps) => {
  const {direction = 'row', spacing = 4, onCancel, divider, ...props} = rootProps;

  return (
    <Box className={combineClasses([classes.Modal_Footer, divider && classes.Divider])}>
      <Stack direction={direction} spacing={spacing} {...props}>
        {props.children}
      </Stack>
    </Box>
  );
};
