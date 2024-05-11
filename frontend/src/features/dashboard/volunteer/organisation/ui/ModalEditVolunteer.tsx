import ErrorMessage from '@/components/ErrorMessage';
import InputFloating from '@/components/InputFloating/InputFloating';
import {Modal} from '@/components/Modal';
import {useVolunteerSessionHook} from '@/hooks/use-volunteerSession.hooks';
import {
  IAssignedVolunteer,
  IUpdateVolunteerSessionPayload,
} from '@/interface/volunteerSession.interface';
import useErrorStore from '@/store/use-error.store';
import {yupResolver} from '@hookform/resolvers/yup';
import {Button, Grid} from '@mui/material';
import React, {useEffect} from 'react';
import {useForm} from 'react-hook-form';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  name: Yup.string().required(),
  email: Yup.string().email().required(),
  mobileNo: Yup.string().required().contact(),
});

export interface IModalEditVolunteerProps {
  show: boolean;
  volunteerData: IAssignedVolunteer | null;
  onClose: () => void;
}

const ModalEditVolunteer: React.FC<IModalEditVolunteerProps> = ({show, volunteerData, onClose}) => {
  const error = useErrorStore();
  const {updateMutation} = useVolunteerSessionHook();
  const mutation = updateMutation({
    onSuccess: () => {
      onClose();
      reset();
    },
  });
  const {
    register,
    handleSubmit,
    formState: {errors},
    setValue,
    reset,
  } = useForm<IUpdateVolunteerSessionPayload>({
    mode: 'onChange',
    // @ts-ignore
    resolver: yupResolver(validationSchema),
    defaultValues: {
      assignedId: volunteerData?.Id,
      name: volunteerData?.Volunteer_Name__r.Name,
      email: volunteerData?.Volunteer_Name__r.Email,
      mobileNo: volunteerData?.Volunteer_Name__r.MobilePhone,
    },
  });

  useEffect(() => {
    setValue('assignedId', volunteerData?.Id || '');
    setValue('name', volunteerData?.Volunteer_Name__r.Name || '');
    setValue('email', volunteerData?.Volunteer_Name__r.Email || '');
    setValue('mobileNo', volunteerData?.Volunteer_Name__r.MobilePhone || '');
  }, [volunteerData]);

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
        <Modal.Header title='Edit Volunteer' divider />
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

export default ModalEditVolunteer;
