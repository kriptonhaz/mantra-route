import {Modal} from '@/components/Modal';
import {Button, CircularProgress, Stack} from '@mui/material';
import React from 'react';
import {useForm} from 'react-hook-form';
import Render from '@/components/Render';
import {useQueryClient} from '@tanstack/react-query';
import InputFloating from '@/components/InputFloating';
import {IPostCompanyData} from '@/interface/company.interface';
import {JwtTokenType} from '@/interface/auth.interface';
import {useCompanyHook} from '@/hooks/use-company.hook';

export interface IModalAddCompanyProps {
  show: boolean;
  onClose: () => void;
}

const ModalAddCompany: React.FC<IModalAddCompanyProps> = ({show, onClose}) => {
  const queryClient = useQueryClient();
  const {postAddCompany} = useCompanyHook();
  const {
    handleSubmit,
    control,
    reset,
    register,
    formState: {errors},
  } = useForm<IPostCompanyData>({
    mode: 'onChange',
  });

  const mutation = postAddCompany({
    onSuccess: () => {
      queryClient.invalidateQueries(['company', 'list']);
      onClose();
      reset();
    },
    onError(err) {
      console.log(err);
    },
  });

  const onSubmit = handleSubmit((data) => {
    const dataStorage = localStorage.getItem('accessToken');
    if (dataStorage) {
      const token = JSON.parse(dataStorage) as JwtTokenType;
      const finalPayload = data;
      finalPayload.vendor = token.vendor;
      mutation.mutate(finalPayload);
    }
  });

  return (
    <Modal open={show} onClose={onClose} containerProps={{sx: {maxWidth: '600px !important'}}}>
      <form onSubmit={onSubmit}>
        <Modal.Header title='Company' subtitle='Add Data' divider />
        <Modal.Body>
          <Stack spacing={5}>
            <InputFloating
              label='Name'
              {...register('name')}
              error={!!errors?.name?.message}
              helperText={errors?.name?.message}
            />
            <InputFloating
              label='PIC'
              {...register('pic')}
              error={!!errors?.pic?.message}
              helperText={errors?.pic?.message}
            />
            <InputFloating
              label='Phone'
              {...register('phone')}
              error={!!errors?.phone?.message}
              helperText={errors?.phone?.message}
            />
            <InputFloating
              label='Email'
              {...register('email')}
              error={!!errors?.email?.message}
              helperText={errors?.email?.message}
            />
            <InputFloating
              label='Address'
              {...register('address')}
              error={!!errors?.address?.message}
              helperText={errors?.address?.message}
            />
          </Stack>
        </Modal.Body>
        <Modal.Footer divider onCancel={onClose}>
          <Button type='submit' disabled={mutation.isLoading}>
            Submit
            <Render in={mutation.isLoading}>
              <CircularProgress sx={{ml: 2}} />
            </Render>
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
  );
};

export default ModalAddCompany;
