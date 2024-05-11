import {Button, Typography} from '@mui/material';
import {Warning} from 'phosphor-react';
import React, {useEffect, useState} from 'react';
import Modal from './Modal';
import {AxiosError} from 'axios';

export interface IModalErrorProps {
  open: boolean;
  onClose: () => void;
  error: Error | AxiosError | null;
}
const ModalError: React.FC<IModalErrorProps> = ({open, onClose, error}) => {
  const [message, setMessage] = useState('Error');

  useEffect(() => {
    if (error instanceof AxiosError) {
      setMessage(error.response?.data?.message ?? error?.message);
    } else {
      setMessage(error?.message || 'Internal Server Error');
    }
  }, [error]);

  return (
    <Modal containerProps={{sx: {maxWidth: '600px !important'}}} open={open} onClose={onClose}>
      <Modal.Header
        icon={{icon: <Warning weight='bold' />, color: 'error', variant: 'contained'}}
        title={error?.name ?? 'Error'}
        subtitle={''}
      />
      <Modal.Body sx={{maxHeight: '540px', overflow: 'auto', margin: '20px auto'}}>
        <Typography variant='subtitle2' fontWeight={'semiBold'}>
          {message}
        </Typography>
        <Typography variant='body2' color='text.secondary'>
          {error?.stack}
        </Typography>
      </Modal.Body>
      <Modal.Footer>
        <Button color='error' variant='text' onClick={onClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalError;
