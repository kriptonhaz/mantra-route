import {Grid} from '@mui/material';
import {useFormContext} from 'react-hook-form';
import {ProfileInfoInput} from '../../interface/profileInfo.interface';
import FeatherIcon from '../FeatherIcon/FeatherIcon';
import InputFloating from '../InputFloating/InputFloating';

export const ProfileForm = () => {
  const {
    register,
    formState: {errors},
  } = useFormContext<ProfileInfoInput>();

  return (
    <>
      <Grid container spacing={4}>
        <Grid item xs={12} md={12}>
          <InputFloating
            label='Profile Name'
            {...register('name')}
            readOnly
            startIcon={<FeatherIcon icon='user' />}
            error={!!errors?.name?.message}
            helperText={errors?.name?.message}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <InputFloating
            label='Email'
            {...register('email')}
            readOnly
            startIcon={<FeatherIcon icon='mail' />}
            error={!!errors?.email?.message}
            helperText={errors?.email?.message}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <InputFloating
            label='Phone Number'
            {...register('phoneNumber')}
            startIcon={<FeatherIcon icon='phone' />}
            error={!!errors?.phoneNumber?.message}
            helperText={errors?.phoneNumber?.message}
          />
        </Grid>
      </Grid>
    </>
  );
};
