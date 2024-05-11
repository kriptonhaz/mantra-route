import React from 'react';
import {Modal} from '@/components/Modal';
import FeatherIcon from '@/components/FeatherIcon/FeatherIcon';
import {TColorVariant} from '@/themes/ts/colors';
import {Button, Typography} from '@mui/material';

export interface IModalConfirmProps {
  show: boolean;
  title: string;
  description: string;
  color: TColorVariant;
  onClose: () => void;
  onConfirm?: () => void;
}

const ModalConfirm: React.FC<IModalConfirmProps> = ({
  show,
  title,
  description,
  color,
  onClose,
  onConfirm,
}) => {
  return (
    <Modal open={show} onClose={onClose} containerProps={{sx: {maxWidth: '368px !important'}}}>
      <Modal.Header
        icon={{
          icon: <FeatherIcon icon='info' />,
          color: color,
          variant: 'contained',
        }}
      />
      <Modal.Body>
        <Typography variant='subtitle1' mb={1} fontWeight={'medium'}>
          {title}
        </Typography>
        <Typography variant='body2' color='text.secondary'>
          {description}
        </Typography>
      </Modal.Body>
      {onConfirm && (
        <Modal.Footer divider onCancel={onClose}>
          <Button onClick={onConfirm}>Confirm</Button>
        </Modal.Footer>
      )}
    </Modal>
  );
};

export default ModalConfirm;
