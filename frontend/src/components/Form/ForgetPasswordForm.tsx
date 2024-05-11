import {neutral} from '@/themes/ts/colors';
import {Box, CircularProgress} from '@mui/material';
import {useFormContext} from 'react-hook-form';
import {Button} from '../Button/ThemedButton';
import FeatherIcon from '../FeatherIcon/FeatherIcon';
import {ForgetPasswordInput} from '@/interface/auth.interface';
import InputFloating from '../InputFloating/InputFloating';
import {useNavigate} from 'react-router-dom';

export const ForgetPasswordForm = ({isLoading}: {isLoading: boolean}) => {
  const navigate = useNavigate();
  const {
    register,
    formState: {errors},
  } = useFormContext<ForgetPasswordInput>();

  const onCancel = () => {
    navigate('/login');
  };

  return (
    <>
      <Box sx={{padding: 1, marginBottom: 2}}>
        <InputFloating
          label='Email'
          type='email'
          {...register('email')}
          error={!!errors?.email?.message}
          helperText={errors?.email?.message}
          startIcon={<FeatherIcon icon='mail' />}
        />
      </Box>
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          justifyContent: 'space-evenly',
          padding: 2,
          borderColor: neutral[200],
          borderStyle: 'solid',
          borderBottom: 0,
          borderLeft: 0,
          borderRight: 0,
        }}
      >
        <Button variant='outlined' color='inherit' onClick={onCancel}>
          Cancel
        </Button>
        <Button variant='contained' type='submit' disabled={isLoading}>
          {isLoading && <CircularProgress color='primary' />}
          Submit
        </Button>
      </Box>
    </>
  );
};
