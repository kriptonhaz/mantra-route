import React, {useState} from 'react';
import classes from '../styles/Content.module.scss';
import {
  Box,
  Button,
  Stack,
  Typography,
  Grid,
  MenuItem,
  InputBase,
  CircularProgress,
  Collapse,
  Backdrop,
  Autocomplete,
} from '@mui/material';
import {combineClasses} from '@/utils/styles';
import Input from './Input';
import Checkbox from '@/components/Checkbox/Checkbox';
import {Controller} from 'react-hook-form';
import {
  genderOptions,
  idTypeOptions,
  idTypeOrgOptions,
  listTitleOptions,
  nationalityOptions,
  sourceInformations,
} from '../options';
import {useDonationHook} from '@/hooks/use-donation.hook';
import Render from '@/components/Render';
import ErrorMessage from '@/components/ErrorMessage';

const listAmounts = [50, 150, 500, 'Other'];

const CardForm: React.FC = () => {
  const [isOtherAmount, setIsOtherAmount] = useState(false);
  const {
    rhf: {
      register,
      control,
      watch,
      setValue,
      trigger,
      formState: {errors},
    },
    postalCodeQuery,
    onSubmitForm,
    donationFormMutation,
  } = useDonationHook();

  return (
    <form onSubmit={onSubmitForm}>
      <Backdrop
        open={donationFormMutation.isLoading}
        sx={{color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1}}
      >
        <CircularProgress />
      </Backdrop>
      <Box className={classes.Form}>
        <Typography variant='h4' fontWeight={'bold'} mb={2}>
          Credit Card Donation
        </Typography>
        <Typography variant='subtitle1' fontWeight={'regular'}>
          Other ways to donate: <a href='#'>Cash</a>,<a href='#'>Cheque</a>,
          <a href='#'>Legacy Giving</a>
        </Typography>
        <Box mt={8}>
          <Typography variant='subtitle1' fontWeight={'bold'} mb={3}>
            How often you donate?
          </Typography>
          <Stack direction={{xs: 'column', md: 'row'}} gap={5}>
            <Controller
              control={control}
              name='frequency'
              render={({field: {onChange, value}}) => (
                <>
                  <Box
                    className={combineClasses([
                      classes.BoxFrequency,
                      classes.BoxInput,
                      value === 'One-time' && 'active',
                    ])}
                    onClick={() => onChange('One-time')}
                  >
                    <Typography>One-time donation</Typography>
                  </Box>
                  <Box
                    className={combineClasses([
                      classes.BoxFrequency,
                      classes.BoxInput,
                      value === 'Monthly' && 'active',
                    ])}
                    onClick={() => onChange('Monthly')}
                  >
                    <Typography>Monthly donation</Typography>
                  </Box>
                </>
              )}
            />
          </Stack>
          <ErrorMessage message={errors.frequency?.message} />
        </Box>
        <Collapse in={!!watch('frequency')}>
          <Box mt={8}>
            <Typography variant='subtitle1' fontWeight={'bold'} mb={3}>
              Please select the amount you wish to donate.
            </Typography>
            <Controller
              control={control}
              name='amount'
              render={({field: {onChange, value}}) => (
                <Stack direction={{xs: 'column', md: 'row'}} gap={5}>
                  {listAmounts.map((item) => (
                    <Box
                      key={item}
                      className={combineClasses([
                        classes.BoxAmount,
                        classes.BoxInput,
                        item !== 'Other'
                          ? value === item && !isOtherAmount && 'active'
                          : isOtherAmount && 'active',
                      ])}
                      onClick={() => {
                        if (item === 'Other') {
                          setIsOtherAmount(true);
                          onChange(0);
                        } else {
                          setIsOtherAmount(false);
                          onChange(parseInt(item as string));
                        }
                      }}
                    >
                      <Render in={item !== 'Other'}>
                        <Typography>${item}</Typography>
                      </Render>
                      <Render in={item === 'Other'}>
                        <Render in={isOtherAmount}>
                          <Typography>Other</Typography>
                          <InputBase
                            placeholder='Amount'
                            startAdornment='S$'
                            type='number'
                            value={value}
                            onChange={(e) => onChange(parseInt(e.target.value))}
                          />
                        </Render>
                        <Render in={!isOtherAmount}>
                          <Typography>Other</Typography>
                        </Render>
                      </Render>
                    </Box>
                  ))}
                </Stack>
              )}
            />
            <ErrorMessage message={errors.amount?.message} />
          </Box>
        </Collapse>
        <Collapse in={!!watch('amount') || isOtherAmount}>
          <>
            <Box mt={8}>
              <Box>
                <Stack direction={'row'} spacing={4} sx={{mb: 6}}>
                  <Typography variant='subtitle1' fontWeight={'bold'} mb={3}>
                    My Details:
                  </Typography>
                  <Controller
                    control={control}
                    name='donorType'
                    render={({field: {onChange, value}}) => (
                      <>
                        <Button
                          className={combineClasses([
                            classes.BtnCategory,
                            value === 'Individual' && 'active',
                          ])}
                          onClick={() => {
                            onChange('Individual');
                            setValue('idType', 'nric');
                          }}
                        >
                          Individual
                        </Button>
                        <Button
                          className={combineClasses([
                            classes.BtnCategory,
                            value === 'Organisation' && 'active',
                          ])}
                          onClick={() => {
                            onChange('Organisation');
                            setValue('idType', 'uen');
                          }}
                        >
                          Organisation
                        </Button>
                      </>
                    )}
                  />
                </Stack>

                <ErrorMessage message={errors.donorType?.message} />
              </Box>
              <Grid container spacing={4}>
                <Render in={watch('donorType') === 'Organisation'}>
                  <Grid item xs={12} md={6}>
                    <Controller
                      control={control}
                      name='orgName'
                      render={({field: {onChange, value}}) => (
                        <>
                          <Input
                            label='Organisation Name As Per UEN'
                            required
                            value={value}
                            onChange={(e) => onChange(e.target.value)}
                          />
                          <ErrorMessage message={errors.orgName?.message} />
                        </>
                      )}
                    />
                  </Grid>
                </Render>
                <Grid item xs={4} md={6}>
                  <Input
                    label='Title'
                    required
                    select
                    {...register('title')}
                    defaultValue={watch('title')}
                    value={watch('title')}
                  >
                    {listTitleOptions.map((item) => (
                      <MenuItem key={item.label} value={item.value}>
                        {item.label}
                      </MenuItem>
                    ))}
                  </Input>
                  <ErrorMessage message={errors.title?.message} />
                </Grid>
                <Grid item xs={8} md={6}>
                  <Controller
                    control={control}
                    name='fullname'
                    render={({field: {onChange, value}}) => (
                      <>
                        <Input
                          label={
                            watch('donorType') === 'Individual'
                              ? 'Full Name As In NRIC/FIN'
                              : 'Full Name of Contact Person'
                          }
                          required
                          value={value}
                          onChange={(e) => onChange(e.target.value)}
                        />
                        <ErrorMessage message={errors.fullname?.message} />
                      </>
                    )}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Controller
                    control={control}
                    name='surname'
                    render={({field: {onChange, value}}) => (
                      <>
                        <Input
                          label={
                            watch('donorType') === 'Individual'
                              ? 'Surname Only'
                              : 'Surname of Contact Person'
                          }
                          required
                          value={value}
                          onChange={(e) => onChange(e.target.value)}
                        />
                        <ErrorMessage message={errors.surname?.message} />
                      </>
                    )}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Controller
                    control={control}
                    name='email'
                    render={({field: {onChange, value}}) => (
                      <>
                        <Input
                          label='Email'
                          type='email'
                          required
                          value={value}
                          onChange={(e) => onChange(e.target.value)}
                        />
                        <ErrorMessage message={errors.email?.message} />
                      </>
                    )}
                  />
                </Grid>
                <Render in={watch('donorType') === 'Organisation'}>
                  <Grid item xs={12} md={6}>
                    <Controller
                      control={control}
                      name='designation'
                      render={({field: {onChange, value}}) => (
                        <>
                          <Input
                            label='Designation'
                            value={value}
                            onChange={(e) => onChange(e.target.value)}
                          />
                          <ErrorMessage message={errors.designation?.message} />
                        </>
                      )}
                    />
                  </Grid>
                </Render>
                <Grid item xs={12} md={6}>
                  <Box mt={3}>
                    <Controller
                      control={control}
                      name='isTax'
                      render={({field: {onChange, value}}) => (
                        <>
                          <Checkbox
                            label='I would like to receive tax deductions for this donation'
                            checked={value}
                            onChange={(_, checked) => onChange(checked)}
                          />
                          <ErrorMessage message={errors.isTax?.message} />
                        </>
                      )}
                    />
                  </Box>
                </Grid>
                <Grid item xs={4} md={2}>
                  <Render in={watch('isTax')}>
                    <Input
                      label='ID Type'
                      select
                      {...register('idType')}
                      defaultValue={watch('idType')}
                      value={watch('idType')}
                    >
                      {watch('donorType') === 'Individual'
                        ? idTypeOptions.map((item) => (
                            <MenuItem key={item.label} value={item.value}>
                              {item.label}
                            </MenuItem>
                          ))
                        : idTypeOrgOptions.map((item) => (
                            <MenuItem key={item.label} value={item.value}>
                              {item.label}
                            </MenuItem>
                          ))}
                    </Input>
                    <ErrorMessage message={errors.idType?.message} />
                  </Render>
                </Grid>
                <Grid item xs={8} md={4}>
                  <Render in={watch('isTax')}>
                    <Controller
                      control={control}
                      name='idNumber'
                      render={({field: {onChange, value}}) => (
                        <>
                          <Input
                            label='ID Number'
                            value={value}
                            onChange={(e) => onChange(e.target.value)}
                          />
                          <ErrorMessage message={errors.idNumber?.message} />
                        </>
                      )}
                    />
                  </Render>
                </Grid>
                <Render in={watch('donorType') === 'Individual'}>
                  <Grid item xs={6} md={6}>
                    <Input label='Gender' select {...register('gender')} value={watch('gender')}>
                      {genderOptions.map((item) => (
                        <MenuItem key={item.label} value={item.value}>
                          {item.label}
                        </MenuItem>
                      ))}
                    </Input>
                    <ErrorMessage message={errors.gender?.message} />
                  </Grid>
                  <Grid item xs={6} md={6}>
                    <Controller
                      control={control}
                      name='birthdate'
                      render={({field: {onChange, value}}) => (
                        <>
                          <Input
                            label='Birthdate'
                            type='date'
                            value={value}
                            onChange={(e) => onChange(e.target.value)}
                            InputLabelProps={{shrink: true}}
                          />
                          <ErrorMessage message={errors.birthdate?.message} />
                        </>
                      )}
                    />
                  </Grid>
                </Render>
                <Grid item xs={12} md={6}>
                  <Controller
                    control={control}
                    name='mobile'
                    render={({field: {onChange, value}}) => (
                      <>
                        <Input
                          label='Mobile No'
                          required
                          value={value}
                          onChange={(e) => onChange(e.target.value)}
                        />
                        <ErrorMessage message={errors.mobile?.message} />
                      </>
                    )}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Input
                    label='Country'
                    select
                    {...register('country')}
                    defaultValue={watch('country')}
                    value={watch('country')}
                  >
                    {nationalityOptions.map((item) => (
                      <MenuItem key={item.label} value={item.value}>
                        {item.label}
                      </MenuItem>
                    ))}
                  </Input>
                  <ErrorMessage message={errors.country?.message} />
                </Grid>
                <Grid item xs={6} md={6}>
                  <Controller
                    control={control}
                    name='postal'
                    render={({field}) => (
                      <>
                        <Autocomplete
                          options={postalCodeQuery.data || []}
                          fullWidth
                          loading={postalCodeQuery.isLoading}
                          loadingText={'Loading...'}
                          getOptionLabel={(option) => {
                            return option.name;
                          }}
                          value={{
                            name: watch('postal'),
                            // @ts-ignore
                            value: watch('postal'),
                          }}
                          onChange={(_, item) => {
                            if (item !== null && item?.name !== null) {
                              setValue('postal', item.name);
                              trigger('postal');
                              setValue('street', item.street);
                              setValue(
                                'buildingNumber',
                                (item.buildingName !== null ? item.buildingName + ' ' : '') +
                                  item.block,
                              );
                              setValue('city', 'Singapore');
                            } else {
                              setValue('postal', '');
                              setValue('street', '');
                              setValue('buildingNumber', '');
                              setValue('city', '');
                            }
                          }}
                          renderInput={(params) => (
                            <Input
                              {...params}
                              label='Postal Code'
                              value={field.value}
                              onChange={(e) => field.onChange(e.target.value)}
                            />
                          )}
                        />
                        <ErrorMessage message={errors.postal?.message} />
                      </>
                    )}
                  />
                </Grid>
                <Grid item xs={6} md={6}>
                  <Controller
                    control={control}
                    name='buildingNumber'
                    render={({field: {onChange, value}}) => (
                      <>
                        <Input
                          label='Block/House/Building Number'
                          value={value}
                          onChange={(e) => onChange(e.target.value)}
                        />
                        <ErrorMessage message={errors.buildingNumber?.message} />
                      </>
                    )}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Controller
                    control={control}
                    name='street'
                    render={({field: {onChange, value}}) => (
                      <>
                        <Input
                          label='Street'
                          value={value}
                          onChange={(e) => onChange(e.target.value)}
                        />
                        <ErrorMessage message={errors.street?.message} />
                      </>
                    )}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Controller
                    control={control}
                    name='unitNumber'
                    render={({field: {onChange, value}}) => (
                      <>
                        <Input
                          label='Unit Number'
                          value={value}
                          onChange={(e) => onChange(e.target.value)}
                        />
                        <ErrorMessage message={errors.unitNumber?.message} />
                      </>
                    )}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Controller
                    control={control}
                    name='city'
                    render={({field: {onChange, value}}) => (
                      <>
                        <Input
                          label='Estate/City'
                          value={value}
                          onChange={(e) => onChange(e.target.value)}
                        />
                        <ErrorMessage message={errors.city?.message} />
                      </>
                    )}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Render in={watch('donorType') === 'Organisation'}>
                    <Controller
                      control={control}
                      name='officePhone'
                      render={({field: {onChange, value}}) => (
                        <>
                          <Input
                            label='Office Phone No'
                            required
                            value={value}
                            onChange={(e) => onChange(e.target.value)}
                          />
                          <ErrorMessage message={errors.officePhone?.message} />
                        </>
                      )}
                    />
                  </Render>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Input
                    label='How did you know about us?'
                    required
                    select
                    {...register('knowAboutUs')}
                    defaultValue={watch('knowAboutUs')}
                    value={watch('knowAboutUs')}
                  >
                    {sourceInformations.map((item) => (
                      <MenuItem key={item.label} value={item.value}>
                        {item.label}
                      </MenuItem>
                    ))}
                  </Input>
                  <ErrorMessage message={errors.knowAboutUs?.message} />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Controller
                    control={control}
                    name='remarks'
                    render={({field: {onChange, value}}) => (
                      <>
                        <Input
                          label='Remarks'
                          value={value}
                          onChange={(e) => onChange(e.target.value)}
                        />
                        <ErrorMessage message={errors.remarks?.message} />
                      </>
                    )}
                  />
                </Grid>
                <Grid item xs={12} md={12}>
                  <Controller
                    control={control}
                    name='receiveMonthlyNewsletter'
                    render={({field: {onChange, value}}) => (
                      <>
                        <Checkbox
                          label='I would like to receive updates from Food from the Heart'
                          checked={value}
                          onChange={(_, val) => onChange(val)}
                        />
                        <ErrorMessage message={errors.receiveMonthlyNewsletter?.message} />
                      </>
                    )}
                  />
                </Grid>
              </Grid>
            </Box>
            <Stack direction='row' justifyContent={'center'} sx={{mt: 10}}>
              <Button
                type='submit'
                disabled={donationFormMutation.isLoading}
                className={classes.BtnSubmit}
              >
                Donate
                <Render in={donationFormMutation.isLoading}>
                  <CircularProgress />
                </Render>
              </Button>
            </Stack>
          </>
        </Collapse>
      </Box>
    </form>
  );
};

export default CardForm;
