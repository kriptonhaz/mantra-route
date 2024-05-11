import DashboardLayout from '@/layouts/dashboard.layout';
import {yupResolver} from '@hookform/resolvers/yup';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  FormHelperText,
  Grid,
  Stack,
} from '@mui/material';
import Typography from '@mui/material/Typography';
import {useEffect, useState} from 'react';
import {Controller, FormProvider, SubmitHandler, useForm} from 'react-hook-form';
import {NewPasswordForm} from '../components/Form/NewPasswordForm';
import {ProfileForm} from '../components/Form/ProfileForm';
import {useProfileHook} from '../hooks/use-profile.hooks';
import {ProfileChangePasswordProps, ProfileInfoInput} from '../interface/profileInfo.interface';
import {
  updatePasswordValidationSchema,
  updateProfileInfoValidationSchema,
} from '../validation/portal.validation';
import {useMutation} from '@tanstack/react-query';
import {changeUserPassword} from '@/api/profile.api';
import useErrorStore from '@/store/use-error.store';
import {useAuthHook} from '@/hooks/use-auth.hooks';
import axios, {AxiosError} from 'axios';
import UploadFile from '@/components/UploadFile/ui/UploadFile';
import {danger} from '@/themes/ts/colors';
import ModalConfirm, {
  IModalConfirmProps,
} from '@/features/dashboard/activities/detail/ui/ModalConfirm';

export const ProfilePage = () => {
  const {profileUser, updateProfileUser} = useProfileHook();
  const {onLogout} = useAuthHook();
  const error = useErrorStore();
  const [modalConfirm, setModalConfirm] = useState<IModalConfirmProps>({
    show: false,
    title: '',
    description: '',
    color: 'info',
    onClose: () => hideModalConfirm(),
  });

  const hideModalConfirm = () => {
    setModalConfirm({...modalConfirm, show: false});
  };

  const methods = useForm<ProfileInfoInput>({
    // @ts-ignore
    resolver: yupResolver(updateProfileInfoValidationSchema),
    mode: 'onChange',
    defaultValues: {
      email: profileUser.data?.data.Email || '',
      name: profileUser.data?.data.Name || '',
      phoneNumber: profileUser.data?.data.MobilePhone || '',
      file: profileUser.data?.data.Profile_Image_Url__c || '',
    },
  });

  useEffect(() => {
    if (profileUser.data && methods.watch('email') === '') {
      methods.setValue('email', profileUser.data.data.Email);
      methods.setValue('name', profileUser.data.data.Name);
      methods.setValue('phoneNumber', profileUser.data.data.MobilePhone);
      if (profileUser.data.data.Profile_Image_Url__c) {
        methods.setValue('file', profileUser.data.data.Profile_Image_Url__c);
      }
    }
  }, [profileUser.data, methods.watch('email')]);

  const passwordMethods = useForm<ProfileChangePasswordProps>({
    // @ts-ignore
    resolver: yupResolver(updatePasswordValidationSchema),
    mode: 'onChange',
    defaultValues: {oldPassword: '', newPassword: '', verifyPassword: ''},
  });

  const passwordMutation = useMutation({
    mutationKey: ['profile', 'password'],
    mutationFn: changeUserPassword,
    onSuccess: () => {
      passwordMethods.reset();
      setModalConfirm({
        ...modalConfirm,
        show: true,
        title: 'Success',
        description: 'Password has been changed',
        color: 'success',
      });
    },
    onError: (err: Error | AxiosError) => {
      if (axios.isAxiosError(err)) {
        passwordMethods.setError('oldPassword', {message: err.response?.data?.error});
      } else {
        error.open(err);
      }
    },
  });

  const [passwordEditable, setPasswordEditable] = useState(true);

  const updateProfileMutation = updateProfileUser({
    onSuccess: () => {
      setModalConfirm({
        ...modalConfirm,
        show: true,
        title: 'Success',
        description: 'Profile has been updated',
        color: 'success',
      });
    },
    onError: (err) => {
      setModalConfirm({
        ...modalConfirm,
        show: true,
        title: 'Error',
        description: 'Internal server error',
        color: 'error',
      });
    },
  });

  const submitEditProfile: SubmitHandler<ProfileInfoInput> = (data) => {
    updateProfileMutation.mutate(data);
  };

  const onEditPassword: SubmitHandler<ProfileChangePasswordProps> = (data) => {
    passwordMutation.mutate(data);
  };

  return (
    <Box component='main'>
      <DashboardLayout title='Profile' subtitle='Update and change your profile'>
        <DashboardLayout.Content>
          <Card sx={{marginBottom: 1}}>
            <FormProvider {...methods}>
              <form onSubmit={methods.handleSubmit(submitEditProfile)}>
                <CardContent sx={{flexDirection: 'row', display: 'flex'}}>
                  <Grid container columns={12}>
                    <Grid item xs={12} md={3}>
                      <Typography variant='body1'>Personal Info</Typography>
                      <Typography variant='body2' sx={{color: 'grey', fontSize: 'small'}}>
                        Update your photo and personal details.
                      </Typography>
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      md={9}
                      sx={{display: 'flex', flexDirection: 'column', mt: {xs: 4, md: 0}}}
                    >
                      <ProfileForm />

                      <Controller
                        name='file'
                        control={methods.control}
                        render={({field: {onChange, value}, formState: {errors}}) => (
                          <Stack
                            direction={{xs: 'column', md: 'row'}}
                            spacing={4}
                            sx={{display: 'flex', marginTop: '10px'}}
                          >
                            <Avatar
                              alt={methods.watch('name')}
                              src={profileUser.data?.data.Profile_Image_Url__c || ''}
                              sx={{color: '#A0A0AB', margin: 1, width: 64, height: 64}}
                            />
                            <Box sx={{flex: 1}}>
                              <UploadFile
                                description='SVG, PNG, JPG or GIF (max. 800x400px)'
                                onChange={(file) => {
                                  console.log(file);
                                  onChange(file as File);
                                }}
                              />
                              <FormHelperText sx={{color: danger[500]}}>
                                {errors?.file?.message}
                              </FormHelperText>
                            </Box>
                          </Stack>
                        )}
                      />
                    </Grid>
                  </Grid>
                </CardContent>
                <Divider />
                <CardActions sx={{display: 'flex', justifyContent: 'flex-end'}}>
                  <Button
                    sx={{borderRadius: '.5rem'}}
                    variant='contained'
                    type='submit'
                    disabled={updateProfileMutation.isLoading}
                  >
                    Save Changes
                  </Button>
                </CardActions>
              </form>
            </FormProvider>
          </Card>

          <Card sx={{marginBottom: 1}}>
            <FormProvider {...passwordMethods}>
              <form onSubmit={passwordMethods.handleSubmit(onEditPassword)}>
                <CardContent sx={{flexDirection: 'row', display: 'flex'}}>
                  <Grid container columns={12}>
                    <Grid item xs={12} md={3} sx={{paddingRight: '20px'}}>
                      <Typography variant='body1'>Password</Typography>
                      <Typography variant='body2' sx={{color: 'grey', fontSize: 'small'}}>
                        Please enter your current password to change your password.
                      </Typography>
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      md={9}
                      sx={{display: 'flex', flexDirection: 'column', mt: {xs: 4, md: 0}}}
                    >
                      <NewPasswordForm isEdit={passwordEditable} />
                    </Grid>
                  </Grid>
                </CardContent>
                <Divider />
                <CardActions sx={{display: 'flex', justifyContent: 'flex-end'}}>
                  <Button
                    sx={{borderRadius: '.5rem'}}
                    disabled={passwordMutation.isLoading}
                    variant='contained'
                    type='submit'
                  >
                    Save Changes
                  </Button>
                </CardActions>
              </form>
            </FormProvider>
          </Card>
          <ModalConfirm
            show={modalConfirm.show}
            title={modalConfirm.title}
            description={modalConfirm.description}
            color={modalConfirm.color}
            onClose={modalConfirm.onClose}
          />
        </DashboardLayout.Content>
      </DashboardLayout>
    </Box>
  );
};
