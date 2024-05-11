import {ModalProps, BoxProps, Fade, Box, Modal as MuiModal} from '@mui/material';
import {PropsWithChildren} from 'react';
import classes from '@/components/Modal/styles/Modal.module.scss';

export interface IModalProps extends Omit<ModalProps, 'children'> {
  children: React.ReactNode;
  containerProps?: BoxProps;
}
export const Modal = ({containerProps, ...props}: IModalProps) => {
  return (
    <MuiModal {...props} slotProps={{backdrop: {timeout: 500, className: 'modal-backdrop'}}}>
      <Fade style={{width: 650}} in={props.open}>
        <Box {...containerProps} className={classes.Container}>
          <Box>{props?.children}</Box>
        </Box>
      </Fade>
    </MuiModal>
  );
};

export interface IModalBodyProps extends PropsWithChildren, BoxProps {}
export const Body: React.FC<IModalBodyProps> = (props) => {
  return (
    <Box {...props}>
      <Box className={classes.Modal_Body}>{props.children}</Box>
    </Box>
  );
};
