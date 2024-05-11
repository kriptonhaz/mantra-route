import FeatherIcon from '@/components/FeatherIcon/FeatherIcon';
import InputFloating from '@/components/InputFloating';
import {useInvitationHook} from '@/hooks/use-invitation.hook';
import {CheckinRegularInputType, CheckinRegularRequestType} from '@/interface/invitation.interface';
import {Alert, Box, Button, CircularProgress, Typography} from '@mui/material';
import {useState} from 'react';
import {FormProvider, useForm, useFormContext} from 'react-hook-form';
import {invitationStyles} from '../Invitation';
import classes from '../orientation.style.scss?inline';
import {DataItem} from './DataItem';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {AxiosError} from 'axios';

interface ApiError {
  error: string;
}

const schema = yup.object().shape({
  email: yup.string().email().required(),
});

export const CheckinForm = (props: {idEvent?: string}) => {
  const {idEvent} = props;
  const {onCheckinEvent} = useInvitationHook();
  const [email, setEmail] = useState('');

  const {handleSubmit, register} = useForm<CheckinRegularInputType>({
    // @ts-ignore
    resolver: yupResolver(schema),
  });

  const onSubmitHandler = (data: CheckinRegularInputType) => {
    onCheckinEvent.reset();
    onCheckinEvent.mutate({email: data.email, eventID: idEvent ?? ''});
  };

  return (
    <form onSubmit={handleSubmit(onSubmitHandler)}>
      {onCheckinEvent.isLoading ? (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {' '}
          <CircularProgress color='primary' />
        </Box>
      ) : onCheckinEvent.isSuccess ? (
        <>
          <DataItem label='Email'>
            <Typography className={classes.Value}>email</Typography>
          </DataItem>
          <Box sx={{paddingY: 3}}>
            <Alert
              className={classes.Alert}
              severity='success'
              icon={<FeatherIcon icon='check-circle' />}
            >
              Welcome to our volunteer orientation!
            </Alert>
          </Box>
        </>
      ) : (
        <Box sx={{marginTop: 4}}>
          <InputFloating
            {...register('email')}
            label='email'
            type='email'
            error={onCheckinEvent.isError}
            helperText={
              onCheckinEvent.error
                ? ((onCheckinEvent.error as AxiosError).response?.data as ApiError).error
                : ''
            }
            startIcon={<FeatherIcon icon='mail' />}
          />
          <Box className={classes.Navigation} sx={invitationStyles.action}>
            <Button variant='contained' type='submit' sx={{width: '100%'}}>
              Check-in
            </Button>
          </Box>
        </Box>
      )}
    </form>
  );
};
