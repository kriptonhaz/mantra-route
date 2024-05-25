import ErrorMessage from '@/components/ErrorMessage';
import InputFloating from '@/components/InputFloating/InputFloating';
import {Modal} from '@/components/Modal';
import {useVolunteerSessionHook} from '@/hooks/use-volunteerSession.hooks';
import {IInsertVolunteerSessionPayload} from '@/interface/volunteerSession.interface';
import useErrorStore from '@/store/use-error.store';
import {yupResolver} from '@hookform/resolvers/yup';
import {Button, Grid} from '@mui/material';
import {useQueryClient} from '@tanstack/react-query';
import React from 'react';
import {useForm} from 'react-hook-form';
import {useParams} from 'react-router-dom';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  name: Yup.string().required(),
  email: Yup.string().email().required(),
  // mobileNo: Yup.string().required().contact(),
});

export interface IModalAddVolunteerProps {
  show: boolean;
  onClose: () => void;
}

const ModalAddVolunteer: React.FC<IModalAddVolunteerProps> = ({show, onClose}) => {
  const queryClient = useQueryClient();
  const {sessionId} = useParams();
  const error = useErrorStore();
  const {insertMutation} = useVolunteerSessionHook();
  const mutation = insertMutation({
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries([
        'volunteer',
        {sessionId: variables.sessionId},
        'assignment',
        'volunteers',
      ]);
      onClose();
      reset();
    },
  });
  const {
    register,
    handleSubmit,
    formState: {errors},
    reset,
  } = useForm<IInsertVolunteerSessionPayload>({
    mode: 'onChange',
    // @ts-ignore
    resolver: yupResolver(validationSchema),
    defaultValues: {
      sessionId: sessionId,
      name: '',
      email: '',
      mobileNo: '',
    },
  });

  const onSubmit = handleSubmit((data) => {
    try {
      mutation.mutate(data);
    } catch (err) {
      error.open(err as Error);
    }
  });

  return (
    <Modal open={show} onClose={onClose} containerProps={{sx: {maxWidth: '600px !important'}}}>
      <form onSubmit={onSubmit}>
        <Modal.Header title='Add Volunteer' divider />
        <Modal.Body>
          <Grid container spacing={4}>
            <Grid item xs={12} md={12}>
              <InputFloating label='Name' {...register('name')} error={!!errors.name?.message} />
              <ErrorMessage message={errors?.name?.message} />
            </Grid>
            <Grid item xs={12} md={6}>
              <InputFloating
                label='Email'
                type='email'
                {...register('email')}
                error={!!errors.email?.message}
              />
              <ErrorMessage message={errors?.email?.message} />
            </Grid>
            <Grid item xs={12} md={6}>
              <InputFloating
                label='Phone Number'
                {...register('mobileNo')}
                error={!!errors.mobileNo?.message}
              />
              <ErrorMessage message={errors?.mobileNo?.message} />
            </Grid>
          </Grid>
        </Modal.Body>
        <Modal.Footer divider onCancel={onClose}>
          <Button type='submit' disabled={mutation.isLoading}>
            Submit
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
  );
};

export default ModalAddVolunteer;
