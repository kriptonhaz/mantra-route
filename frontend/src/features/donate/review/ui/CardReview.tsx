import logoMasterCard from '@/assets/icon-mastercard.svg';
import logoPaynow from '@/assets/icon-paynow.png';
import ErrorMessage from '@/components/ErrorMessage';
import Render from '@/components/Render';
import {useDonationHook} from '@/hooks/use-donation.hook';
import {IDonationForm} from '@/interface/donation.inteface';
import {neutral} from '@/themes/ts/colors';
import {combineClasses} from '@/utils/styles';
import {Box, Button, CircularProgress, Container, Grid, Stack, Typography} from '@mui/material';
import React, {useEffect, useState} from 'react';
import {Controller} from 'react-hook-form';
import classes from '../styles/CardReview.module.scss';
import {useNavigate} from 'react-router-dom';

const DataItem: React.FC<{label: string; value: string}> = ({label, value}) => {
  return (
    <Stack direction={{xs: 'column', md: 'row'}} justifyContent={'center'} spacing={{xs: 0, md: 2}}>
      <Typography
        sx={{flex: 1, color: `${neutral[800]} !important`}}
        textAlign={{xs: 'left', md: 'right'}}
      >
        {label} :
      </Typography>
      <Typography sx={{flex: 1, color: `${neutral[800]} !important`}}>{value}</Typography>
    </Stack>
  );
};

const CardReview: React.FC = () => {
  const navigate = useNavigate();
  const [dataDonation, setDataDonation] = useState<IDonationForm | null>(null);
  const {
    paymentMethodRhf: {
      control,
      formState: {errors},
    },
    changePaymentMutation,
    onSubmitChangePayment,
  } = useDonationHook();

  useEffect(() => {
    window.scrollTo(0, 0);
    const dataDonationStorage = localStorage.getItem('FFTH-donation-form');
    if (dataDonationStorage) {
      setDataDonation(JSON.parse(dataDonationStorage) as IDonationForm);
    } else {
      navigate('/donate');
    }
  }, []);

  return (
    <Container maxWidth='lg' className={classes.Container}>
      {dataDonation && (
        <form onSubmit={onSubmitChangePayment}>
          <Stack className={classes.Card}>
            <Typography variant='h5' fontWeight={'bold'} mb={4} textAlign={'center'}>
              Review Your Donation Results
            </Typography>
            <Typography textAlign={'center'} sx={{mb: 4}}>
              Please review your donation details below
            </Typography>
            <Stack direction='column' spacing={2} sx={{mb: 4}}>
              <DataItem label='Donation Amount' value={`S$ ${dataDonation?.amount}`} />
              <DataItem label='Frequency' value={`${dataDonation?.frequency} donation`} />
              <DataItem label='Salutation ' value={dataDonation?.title || '-'} />
              <DataItem label='Organization ' value={dataDonation?.orgName || '-'} />
              <DataItem label='Name ' value={dataDonation?.fullname || '-'} />
              <DataItem
                label='Do you wish to receive tax deduction?'
                value={dataDonation?.isTax ? 'Yes' : 'No'}
              />
              <DataItem label='Email' value={dataDonation?.email || '-'} />
              <DataItem label='Contact Number' value={dataDonation?.mobile || '-'} />
              <DataItem label='Address ' value={dataDonation?.street || '-'} />
              <DataItem label='Postal Code ' value={dataDonation?.postal || '-'} />
              <DataItem
                label='Consent to receive marketing communications'
                value={dataDonation?.receiveMonthlyNewsletter ? 'Yes' : 'No'}
              />
            </Stack>
            <Typography sx={{mt: 2}}>
              Please check your donation details and read the terms and conditions at the bottom of
              this page before proceeding to the next step,{' '}
              <a href='#'>click here to return to the donation form</a>
            </Typography>
            <Typography sx={{mt: 2}}>
              Food from the Heart is a registered not-for-profit charity with IPC status: 000634 and
              all cash donations will be eligible for 250% tax deduction.
            </Typography>

            <Box>
              <Typography variant='h6' my={6}>
                Select payment method:
              </Typography>
              <Controller
                control={control}
                name='paymentMethod'
                render={({field: {onChange, value}}) => (
                  <Grid container spacing={4}>
                    {/* TODO: will be shown after reconciliation for paynow on salesforce is complete */}
                    {/* <Render in={dataDonation.frequency === 'One-time'}>
                      <Grid item xs={12} md={6}>
                        <Box
                          className={combineClasses([
                            classes.BoxPaymentMethod,
                            value === 'PayNow' && classes.Active,
                          ])}
                          onClick={() => onChange('PayNow')}
                        >
                          <img src={logoPaynow} alt='logo paynow' />
                          <Typography>PayNow</Typography>
                        </Box>
                      </Grid>
                    </Render> */}
                    <Grid item xs={12} md={6}>
                      <Box
                        className={combineClasses([
                          classes.BoxPaymentMethod,
                          value === 'Credit Card' && classes.Active,
                        ])}
                        onClick={() => onChange('Credit Card')}
                      >
                        <img src={logoMasterCard} alt='logo master card' />
                        <Typography>Credit/Debit Card</Typography>
                      </Box>
                    </Grid>
                  </Grid>
                )}
              />
              <ErrorMessage message={errors.paymentMethod?.message} />
            </Box>

            <Stack direction='row' justifyContent={'center'} sx={{mt: 10}}>
              <Button
                color='error'
                type='submit'
                disabled={changePaymentMutation.isLoading}
                className={classes.BtnSubmit}
              >
                Continue
                <Render in={changePaymentMutation.isLoading}>
                  <CircularProgress />
                </Render>
              </Button>
            </Stack>
          </Stack>
        </form>
      )}
      <Box mt={4}>
        <Typography variant='subtitle1' fontWeight={'bold'}>
          Terms & Conditions
        </Typography>
        <Typography>Please note that donations are non-refundable.</Typography>
      </Box>
    </Container>
  );
};

export default CardReview;
