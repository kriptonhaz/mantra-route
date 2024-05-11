import {IconButton, Stack} from '@mui/material';
import {useState} from 'react';
import {useFormContext} from 'react-hook-form';
import {EditableFormProp} from '../../interface/auth.interface';
import {ProfileChangePasswordProps} from '../../interface/profileInfo.interface';
import FeatherIcon from '../FeatherIcon/FeatherIcon';
import InputFloating from '../InputFloating/InputFloating';

export const NewPasswordForm = (props: EditableFormProp) => {
  const {
    register,
    formState: {errors},
  } = useFormContext<ProfileChangePasswordProps>();

  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showVeriPassword, setShowVeriPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowNewPassword = () => setShowNewPassword((show) => !show);
  const handleClickShowVeriPassword = () => setShowVeriPassword((show) => !show);

  const {isEdit} = props;

  return (
    <>
      <Stack direction={'column'} spacing={4}>
        <InputFloating
          label='Old Password'
          {...register('oldPassword')}
          readOnly={!isEdit}
          type={showPassword ? 'text' : 'password'}
          startIcon={<FeatherIcon icon='lock' />}
          error={!!errors?.oldPassword?.message}
          helperText={errors?.oldPassword?.message}
          endIcon={
            <IconButton sx={{mt: -2}} onClick={handleClickShowPassword}>
              <FeatherIcon icon={showPassword ? 'eye-off' : 'eye'} />
            </IconButton>
          }
        />
        <InputFloating
          label='New Password'
          {...register('newPassword')}
          readOnly={!isEdit}
          type={showNewPassword ? 'text' : 'password'}
          startIcon={<FeatherIcon icon='lock' />}
          error={!!errors?.newPassword?.message}
          helperText={errors?.newPassword?.message}
          endIcon={
            <IconButton sx={{mt: -2}} onClick={handleClickShowNewPassword}>
              <FeatherIcon icon={showNewPassword ? 'eye-off' : 'eye'} />
            </IconButton>
          }
        />
        <InputFloating
          label='Confirm New Password'
          {...register('verifyPassword')}
          readOnly={!isEdit}
          type={showVeriPassword ? 'text' : 'password'}
          startIcon={<FeatherIcon icon='lock' />}
          error={!!errors?.verifyPassword?.message}
          helperText={errors?.verifyPassword?.message}
          endIcon={
            <IconButton sx={{mt: -2}} onClick={handleClickShowVeriPassword}>
              <FeatherIcon icon={showVeriPassword ? 'eye-off' : 'eye'} />
            </IconButton>
          }
        />
      </Stack>
    </>
  );
};
