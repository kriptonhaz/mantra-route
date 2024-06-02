import ErrorMessage from '@/components/ErrorMessage';
import FeatherIcon from '@/components/FeatherIcon/FeatherIcon';
import InputFloating from '@/components/InputFloating';
import {Modal} from '@/components/Modal';
import {useVolunteerSessionHook} from '@/hooks/use-volunteerSession.hooks';
import {IWithdrawRegularVRPayload} from '@/interface/volunteerSession.interface';
import {yupResolver} from '@hookform/resolvers/yup';
import {Button, Typography} from '@mui/material';
import React from 'react';
import {useForm} from 'react-hook-form';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  reason: Yup.string().required(),
});

interface IModalWithdrawProps {
  open: boolean;
  sessionId: string;
  vrId: string;
  onClose: () => void;
}
const ModalWithdraw: React.FC<IModalWithdrawProps> = ({open, sessionId, vrId, onClose}) => {
  const {withdrawMutation} = useVolunteerSessionHook();
  const mutation = withdrawMutation({
    onSuccess: () => {
      onClose();
      reset();
    },
  });
  const {
    handleSubmit,
    register,
    reset,
    formState: {errors},
  } = useForm<IWithdrawRegularVRPayload>({
    mode: 'onChange',
    // @ts-ignore
    resolver: yupResolver(validationSchema),
    defaultValues: {
      reason: '',
      sessionId: sessionId,
      vrId: vrId,
    },
  });

  const onSubmit = handleSubmit((data) => {
    mutation.mutate(data);
  });

  return (
    <Modal open={open} onClose={onClose} containerProps={{sx: {maxWidth: '500px !important'}}}>
      <form onSubmit={onSubmit}>
        <Modal.Header
          icon={{
            icon: <FeatherIcon icon='info' />,
            variant: 'contained',
            color: 'error',
          }}
        />
        <Modal.Body>
          <Typography fontWeight={500}>
            Are you sure you want to withdraw from this volunteer request?
          </Typography>
          <Typography variant='body2' color='text.secondary' mb={4}>
            You will be opted out from this activity, please state the reason:
          </Typography>
          <InputFloating
            label='Withdraw reason..'
            {...register('reason')}
            error={!!errors.reason?.message}
          />
          <ErrorMessage message={errors.reason?.message} />
        </Modal.Body>
        <Modal.Footer onCancel={onClose} divider>
          <Button type='submit' disabled={mutation.isLoading}>
            Confirm
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
  );
};

export default ModalWithdraw;
