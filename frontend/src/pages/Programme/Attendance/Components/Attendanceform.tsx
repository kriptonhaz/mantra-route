import FeatherIcon from '@/components/FeatherIcon/FeatherIcon';
import InputFloating from '@/components/InputFloating';
import {useInvitationHook} from '@/hooks/use-invitation.hook';
import {useProgrammeEventsHook} from '@/hooks/use-programmeEvents.hooks';
import {ICheckEmailPEPayload} from '@/interface/programmeEvents.interface';
import {DataItem} from '@/pages/Orientation/Components/DataItem';
import {invitationStyles} from '@/pages/Orientation/Invitation';
import {yupResolver} from '@hookform/resolvers/yup';
import {Alert, Box, Button, CircularProgress, Typography} from '@mui/material';
import {AxiosError} from 'axios';
import {useForm} from 'react-hook-form';
import * as yup from 'yup';
import classes from '../../../Orientation/orientation.style.scss?inline';
import Render from '@/components/Render';
import useProgrammeEventAttendance from './useProgrammeEventAttendance';

interface ApiError {
  error: string;
}

const schema = yup.object().shape({
  email: yup.string().email().required(),
});

export const AttendanceForm = (props: {idProgramme?: string}) => {
  const {idProgramme} = props;
  const {onCheckin} = useInvitationHook();
  const participant = useProgrammeEventAttendance((state) => state.participant);
  const {programmeEventCheckEmailMutation, programmeEventCheckinMutation} =
    useProgrammeEventsHook();

  const {
    handleSubmit,
    register,
    watch,
    formState: {errors},
  } = useForm<ICheckEmailPEPayload>({
    // @ts-ignorer
    resolver: yupResolver(schema),
    defaultValues: {
      programmeId: idProgramme,
      email: '',
    },
  });

  const onSubmitHandler = handleSubmit((data) => {
    // onCheckin.reset();
    // onCheckin.mutate({email: data.email, programmeEventID: idProgramme ?? ''});
    programmeEventCheckEmailMutation.mutate(data);
  });

  return (
    <form onSubmit={onSubmitHandler}>
      {onCheckin.isLoading ? (
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
      ) : (
        onCheckin.isSuccess && (
          <>
            <DataItem label='Email'>
              <Typography className={classes.Value}>{watch('email')}</Typography>
            </DataItem>
          </>
        )
      )}

      <Render in={!participant?.Id}>
        <Box sx={{marginTop: 4}}>
          <InputFloating
            {...register('email')}
            label='Email'
            type='email'
            error={!!errors.email?.message}
            helperText={errors.email?.message}
            startIcon={<FeatherIcon icon='mail' />}
          />
          <Box className={classes.Navigation} sx={invitationStyles.action}>
            <Button
              disabled={programmeEventCheckEmailMutation.isLoading}
              variant='contained'
              type='submit'
              sx={{width: '100%'}}
            >
              Submit
            </Button>
          </Box>
        </Box>
      </Render>
      <Render in={!!participant?.Id}>
        <DataItem label='Email'>
          <Typography className={classes.Value}>{watch('email')}</Typography>
        </DataItem>
      </Render>
      <Render in={participant?.Status__c === 'Accepted'}>
        <Box className={classes.Navigation} sx={invitationStyles.action}>
          <Button
            disabled={programmeEventCheckinMutation.isLoading}
            onClick={() =>
              programmeEventCheckinMutation.mutate({participantId: participant?.Id || ''})
            }
            variant='contained'
            type='button'
            sx={{width: '100%'}}
          >
            Check in
          </Button>
        </Box>
      </Render>
      <Render in={participant?.Status__c === 'Attended'}>
        <Box sx={{paddingY: 3}}>
          <Alert
            className={classes.Alert}
            severity='success'
            sx={{display: 'flex', justifyContent: 'center'}}
            icon={<FeatherIcon icon='check-circle' />}
          >
            Checked In successfully!
          </Alert>
        </Box>
      </Render>
    </form>
  );
};
