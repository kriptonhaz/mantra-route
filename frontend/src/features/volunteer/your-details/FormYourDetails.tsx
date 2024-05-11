import Checkbox from '@/components/Checkbox';
import ErrorMessage from '@/components/ErrorMessage';
import RHFDevTools from '@/components/RHFDevTools';
import Render from '@/components/Render';
import {genderOptions, listTitleOptions, sourceInformations} from '@/features/donate/options';
import {useVolunteerFormYourDetailHook} from '@/hooks/use-volunteer-form.hook';
import {combineClasses} from '@/utils/styles';
import {ArrowBack} from '@mui/icons-material';
import {
  Autocomplete,
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import React from 'react';
import {Controller} from 'react-hook-form';
import classes from './styles/FormYourDetail.module.scss';
import FormStepper from './ui/FormStepper';

const FormYourDetails: React.FC = () => {
  const {
    rhf: {
      control,
      watch,
      setValue,
      trigger,
      register,
      formState: {errors},
    },
    postalCodeQuery,
    onSubmit,
    mutation,
  } = useVolunteerFormYourDetailHook();

  return (
    <div>
      <Backdrop
        open={mutation.isLoading}
        sx={{color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1}}
      >
        <CircularProgress />
      </Backdrop>
      <Container maxWidth='lg' className={classes.Container} sx={{py: 10}}>
        <FormStepper />
        <form onSubmit={onSubmit}>
          <Box my={12}>
            <Stack direction={'row'} spacing={4} sx={{mb: 6}}>
              <Typography variant='subtitle1' fontWeight={'bold'} mb={3} sx={{minWidth: '180px'}}>
                Volunteer Type:
              </Typography>
              <Controller
                control={control}
                name='volunteerType'
                render={({field: {onChange, value}}) => (
                  <>
                    <Button
                      className={combineClasses([
                        classes.BtnCategory,
                        value === 'individual' && 'active',
                      ])}
                      onClick={() => onChange('individual')}
                    >
                      Individual
                    </Button>
                    <Button
                      className={combineClasses([
                        classes.BtnCategory,
                        value === 'organisation' && 'active',
                      ])}
                      onClick={() => onChange('organisation')}
                    >
                      Organisation
                    </Button>
                  </>
                )}
              />
              <ErrorMessage message={errors.volunteerType?.message} />
            </Stack>
            <Stack direction={'row'} spacing={4} sx={{mb: 6}}>
              <Typography variant='subtitle1' fontWeight={'bold'} mb={3} sx={{minWidth: '180px'}}>
                Event Type:
              </Typography>
              <Box>
                <Controller
                  control={control}
                  name='eventType'
                  render={({field: {onChange, value}}) => (
                    <Stack direction='row'>
                      <Render in={watch('volunteerType') !== 'organisation'}>
                        <Box>
                          <Checkbox
                            label='Bread Run'
                            checked={value.includes('Bread Run')}
                            onChange={(_, val) => {
                              if (val) {
                                onChange([...value, 'Bread Run']);
                                setValue('isBreadRun', true);
                              } else {
                                onChange(value.filter((e) => e !== 'Bread Run'));
                                setValue('isBreadRun', false);
                              }
                            }}
                          />
                        </Box>
                      </Render>
                      <Box>
                        <Checkbox
                          label='Food Packing'
                          checked={value.includes('Food Packing')}
                          onChange={(_, val) => {
                            if (val) {
                              onChange([...value, 'Food Packing']);
                              setValue('isFoodPacking', true);
                            } else {
                              onChange(value.filter((e) => e !== 'Food Packing'));
                              setValue('isFoodPacking', false);
                            }
                          }}
                        />
                      </Box>
                    </Stack>
                  )}
                />
                <ErrorMessage message={errors.eventType?.message} />
              </Box>
            </Stack>
            <Grid container spacing={4} my={8}>
              <Grid item xs={12} md={4}>
                <TextField
                  label='Title'
                  required
                  select
                  {...register('title')}
                  defaultValue={watch('title')}
                  InputLabelProps={{shrink: !!watch('title')}}
                  error={!!errors.title?.message}
                  helperText={errors.title?.message}
                >
                  {listTitleOptions.map((item) => (
                    <MenuItem key={item.label} value={item.value}>
                      {item.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  label='Full Name'
                  required
                  {...register('fullname')}
                  InputLabelProps={{shrink: !!watch('fullname')}}
                  error={!!errors.fullname?.message}
                  helperText={errors.fullname?.message}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  label='Surname'
                  required
                  {...register('surname')}
                  InputLabelProps={{shrink: !!watch('surname')}}
                  error={!!errors.surname?.message}
                  helperText={errors.surname?.message}
                />
              </Grid>
              <Render in={watch('volunteerType') === 'organisation'}>
                <Grid item xs={12} md={4}>
                  <TextField
                    label='Organisation Name'
                    required
                    {...register('orgName')}
                    InputLabelProps={{shrink: !!watch('orgName')}}
                    error={!!errors.orgName?.message}
                    helperText={errors.orgName?.message}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    label='Designation'
                    {...register('designation')}
                    InputLabelProps={{shrink: !!watch('designation')}}
                    error={!!errors.designation?.message}
                    helperText={errors.designation?.message}
                  />
                </Grid>
              </Render>
              <Grid item xs={12} md={4}>
                <TextField
                  label='Email'
                  required
                  type='email'
                  {...register('email')}
                  InputLabelProps={{shrink: !!watch('email')}}
                  error={!!errors.email?.message}
                  helperText={errors.email?.message}
                />
              </Grid>
              <Render in={watch('volunteerType') === 'individual'}>
                <Grid item xs={12} md={4}>
                  <Controller
                    control={control}
                    name='gender'
                    render={({field: {onChange, value}}) => (
                      <TextField
                        label='Gender'
                        select
                        value={value}
                        error={!!errors.gender?.message}
                        helperText={errors.gender?.message}
                        onChange={(e) => onChange(e.target.value)}
                      >
                        {genderOptions.map((item) => (
                          <MenuItem key={item.label} value={item.value}>
                            {item.label}
                          </MenuItem>
                        ))}
                      </TextField>
                    )}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    label='Birthdate'
                    type='date'
                    {...register('birthdate')}
                    InputLabelProps={{shrink: true}}
                    error={!!errors.birthdate?.message}
                    helperText={errors.birthdate?.message}
                  />
                </Grid>
              </Render>
              <Grid item xs={12} md={4}>
                <TextField
                  label='Phone'
                  required
                  {...register('phone')}
                  InputLabelProps={{shrink: !!watch('phone')}}
                  error={!!errors.phone?.message}
                  helperText={errors.phone?.message}
                />
              </Grid>
              <Render in={watch('volunteerType') === 'individual'}>
                <Grid item xs={12} md={4}>
                  <Controller
                    control={control}
                    name='postalcode'
                    render={({field: {onChange, value}}) => (
                      <>
                        <Autocomplete
                          options={postalCodeQuery.data || []}
                          fullWidth
                          loading={postalCodeQuery.isLoading}
                          loadingText={'Loading...'}
                          getOptionLabel={(option) => {
                            return option.name;
                          }}
                          onChange={(_, item) => {
                            if (item !== null && item?.name !== null) {
                              setValue('postalcode', item.name);
                              trigger('postalcode');
                              setValue(
                                'address',
                                `${item.buildingName ? item.buildingName : ''} ${
                                  item.block ? item.block : ''
                                } ${item.street ? item.street : ''}`.trim(),
                              );
                            } else {
                              setValue('postalcode', '');
                              setValue('address', '');
                            }
                          }}
                          renderInput={(params) => (
                            <TextField
                              label='Postal Code'
                              {...params}
                              onChange={(e) => onChange(e.target.value)}
                              value={value}
                              error={!!errors.postalcode?.message}
                              helperText={errors.postalcode?.message}
                            />
                          )}
                        />
                      </>
                    )}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    label='Address'
                    {...register('address')}
                    InputLabelProps={{shrink: !!watch('address')}}
                    error={!!errors.address?.message}
                    helperText={errors.address?.message}
                  />
                </Grid>
              </Render>
              <Grid item xs={12} md={watch('volunteerType') === 'individual' ? 6 : 8}>
                <TextField
                  label='How did you know about us?'
                  select
                  {...register('knowAboutUs')}
                  defaultValue={watch('knowAboutUs')}
                  error={!!errors.knowAboutUs?.message}
                  helperText={errors.knowAboutUs?.message}
                  required
                >
                  {sourceInformations.map((item) => (
                    <MenuItem key={item.label} value={item.value}>
                      {item.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12} md={watch('volunteerType') === 'individual' ? 6 : 12}>
                <TextField
                  label='Remarks'
                  {...register('remarks')}
                  error={!!errors.remarks?.message}
                  helperText={errors.remarks?.message}
                />
              </Grid>
            </Grid>
            <Stack direction={'column'} rowGap={3}>
              <Controller
                control={control}
                name='receiveMonthlyNewsletter'
                render={({field: {onChange, value}}) => (
                  <>
                    <Checkbox
                      label="I would like to receive Food from the Heart's monthly newsletter."
                      checked={value}
                      onChange={(_, val) => onChange(val)}
                    />
                    <ErrorMessage message={errors.receiveMonthlyNewsletter?.message} />
                  </>
                )}
              />
              <Controller
                control={control}
                name='agreeVolunteerCoC'
                render={({field: {onChange, value}}) => (
                  <>
                    <Checkbox
                      label={
                        <>
                          I agree to the Volunteer's Code of Conduct.
                          <a
                            href='https://www.foodfromtheheart.sg/assets/downloads/Code%20of%20Conduct%20Vetted%20310719.pdf'
                            target='_blank'
                            rel='noopener noreferrer'
                          >
                            (review)
                          </a>
                        </>
                      }
                      checked={value}
                      onChange={(_, val) => onChange(val)}
                    />
                    <ErrorMessage message={errors.agreeVolunteerCoC?.message} />
                  </>
                )}
              />
              <Controller
                control={control}
                name='agreeVolunteerTC'
                render={({field: {onChange, value}}) => (
                  <>
                    <Checkbox
                      label={
                        <>
                          I agree to the Terms & Conditions.
                          <a
                            href='https://www.foodfromtheheart.sg/assets/downloads/Terms%20&%20Conditions%20Vetted%20050819.pdf'
                            target='_blank'
                            rel='noopener noreferrer'
                          >
                            (review)
                          </a>
                        </>
                      }
                      checked={value}
                      onChange={(_, val) => onChange(val)}
                    />
                    <ErrorMessage message={errors.agreeVolunteerTC?.message} />
                  </>
                )}
              />
            </Stack>
            <Stack direction='row' justifyContent={'center'} spacing={2} sx={{mt: 8}}>
              <Button
                variant='outlined'
                type='button'
                color='inherit'
                size='lg'
                className={classes.BtnBack}
              >
                <ArrowBack />
              </Button>
              <Button
                variant='contained'
                type='submit'
                color='warning'
                className={classes.BtnSubmit}
                size='lg'
              >
                Submit
              </Button>
            </Stack>
          </Box>
        </form>
        <Box>
          <Stack mt={10} spacing={3} direction={'column'} alignItems={'center'}>
            <Typography>
              Unable to contribute your time? Make a cash contribution instead.
            </Typography>
            <Button color='error' size='lg'>
              Donate
            </Button>
          </Stack>
        </Box>
      </Container>

      <RHFDevTools control={control} />
    </div>
  );
};

export default FormYourDetails;
