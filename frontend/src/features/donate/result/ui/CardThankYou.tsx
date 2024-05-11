import {useDonationHook} from '@/hooks/use-donation.hook';
import {IDonationForm, IDonationFormResponse} from '@/interface/donation.inteface';
import {Box, Container, Typography} from '@mui/material';
import React, {useEffect, useState} from 'react';
import classes from '../styles/CardThankYou.module.scss';
import Render from '@/components/Render';

interface ICardThankYoutProps {
  setTitle: React.Dispatch<React.SetStateAction<string>>;
}
const CardThankYou: React.FC<ICardThankYoutProps> = ({setTitle}) => {
  const [dataForm, setDataForm] = useState<IDonationForm | null>(null);
  const [donationRes, setDonationRes] = useState<IDonationFormResponse | null>(null);
  const [donationStatus, setDonationStatus] = useState<boolean | null>(null);
  const {updateStatusMutation} = useDonationHook();
  useEffect(() => {
    window.scrollTo(0, 0);
    let _dataForm: IDonationForm = JSON.parse(localStorage.getItem('FFTH-donation-form') || 'null');
    setDataForm(_dataForm);
    let _donationRes: IDonationFormResponse = JSON.parse(
      localStorage.getItem('FFTH-donation-res') || 'null',
    );
    setDonationRes(_donationRes);
    let payload = {
      donationID: _donationRes?.data?.donation?.id,
      donationNumber: _donationRes?.data?.donation?.Name,
      checkoutToken: _donationRes?.data?.checkoutToken?.session?.id,
    };
    if (
      getParameterByName('resultIndicator') === _donationRes?.data?.checkoutToken?.successIndicator
    ) {
      setDonationStatus(true);
      setTitle('Donation Success');
      updateStatusMutation.mutate(payload);
    } else {
      if (getParameterByName('isSuccess') === 'true') {
        setDonationStatus(true);
        setTitle('Donation Success');
      } else {
        setTitle('Donation Failed');
        setDonationStatus(false);
      }
    }
  }, []);

  function getParameterByName(name: string, url = window.location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
      results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
  }
  return (
    <Container maxWidth={'lg'} className={classes.Container}>
      <Render in={donationStatus === true}>
        <Typography variant='h5' fontWeight={'medium'} mb={4}>
          Thank you for your donation!
        </Typography>
        <Typography color='text.secondary'>Your donation is successful.</Typography>
      </Render>
      <Render in={donationStatus === false}>
        <Typography variant='h5' fontWeight={'medium'} mb={4}>
          Ooops there is something wrong
        </Typography>
        <Typography color='text.secondary'>Your donation is failed</Typography>
      </Render>
      <Box mt={4}>
        <Typography variant='h6'>Donation Details</Typography>
        <Box my={3}>
          <Typography>
            Amount donated: S$
            {dataForm?.amount}
          </Typography>
          <Typography>
            Donation Type:{' '}
            {dataForm?.frequency === 'One-time' ? 'One-time donation' : 'Monthly donation'}
          </Typography>
          <Typography>Donation ID: {donationRes?.data?.donation?.Name}</Typography>
        </Box>
        <Typography>
          An email with your donation information has been sent to you. Please contact us if you do
          not receive it.
        </Typography>
      </Box>
    </Container>
  );
};

export default CardThankYou;
