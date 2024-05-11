import {neutral} from '@/themes/ts/colors';
import {combineClasses} from '@/utils/styles';
import {Box, Button, Container, Stack, Typography} from '@mui/material';
import React, {useEffect, useRef} from 'react';
import classes from '../styles/CardPaynow.module.scss';
import IconPayNow from '@/assets/icon-paynow.png';
import {IDonationForm} from '@/interface/donation.inteface';
import dayjs from 'dayjs';
// @ts-ignore
import PaynowQR from 'paynowqr';
import QRCodeStyling from 'qr-code-styling';
import {Link} from 'react-router-dom';

interface IDataItem {
  label: string;
  value: string;
}
const DataItem: React.FC<IDataItem> = ({label, value}) => (
  <Stack direction='row' justifyContent={'space-between'}>
    <Typography color={neutral[500]}>{label}</Typography>
    <Typography fontWeight={500}>{value}</Typography>
  </Stack>
);

const CardPaynow: React.FC = () => {
  const dataDonation: IDonationForm = JSON.parse(
    localStorage.getItem('FFTH-donation-form') || 'null',
  );
  const qrcodeCanvas = useRef<HTMLDivElement>(null);
  const options = {
    amount: dataDonation?.amount,
    editable: false,
    uen: '200721064RUOB',
    refNumber: dataDonation?.donationNo || '',
    expiry: dayjs().format('YYYYMMDD'),
    company: 'Food From the Heart',
  };
  const paynowQr = new PaynowQR(options);
  useEffect(() => {
    if (qrcodeCanvas) {
      const qrcode = new QRCodeStyling({
        type: 'svg',
        data: paynowQr.qrstring,
        image: IconPayNow,
        dotsOptions: {
          color: '#6C2566',
          type: 'square',
        },
        backgroundOptions: {
          color: '#fff',
        },
        imageOptions: {
          crossOrigin: 'anonymous',
          margin: 4,
        },
      });

      if (!qrcodeCanvas.current?.childElementCount) {
        qrcode.append(qrcodeCanvas.current || undefined);
      }
    }
  }, [qrcodeCanvas]);

  return (
    <Container maxWidth='lg' className={classes.Container} sx={{py: 10}}>
      <Typography variant='h5' fontWeight={'medium'} mb={4}>
        Donation Payment
      </Typography>
      <Container maxWidth='md'>
        <Box ref={qrcodeCanvas} className={classes.BoxQR}></Box>
        <Typography my={8}>
          Please scan the QR code with your mobile banking app. If you're on mobile, please save the
          image of the QR code to your photo library or gallery and select this picture when using
          the Scan and Pay feature in your digital payment app. Alternatively, you may donate by
          entering our UEN manually below:
        </Typography>
        <Stack direction={'column'} spacing={2} sx={{mb: 8}}>
          <DataItem label='UEN Number' value='200721064RUOB' />
          <DataItem label='Company Name' value='Food From the Heart' />
          <DataItem label='Reference Field' value={`#${dataDonation?.donationNo || '-'}`} />
        </Stack>
        <Stack direction={'column'} alignItems={'center'} spacing={4}>
          <Link to='/donate-result?isSuccess=true'>
            <Button className={combineClasses([classes.Button, classes.BtnFinish])}>
              Finish Donation
            </Button>
          </Link>
          <Link to='/donate-review'>
            <Button
              className={combineClasses([classes.Button, classes.BtnPayment])}
              variant='outlined'
              color='inherit'
            >
              Change Payment
            </Button>
          </Link>
        </Stack>
      </Container>
    </Container>
  );
};

export default CardPaynow;
