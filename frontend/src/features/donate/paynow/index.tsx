import React from 'react';
import {Helmet} from 'react-helmet';
import Navbar from '../ui/Navbar';
import Banner from '../ui/Banner';
import Footer from '../ui/Footer';
import CardPaynow from './ui/CardPaynow';

const PaynowScreen = () => {
  return (
    <>
      <Helmet>
        <title>Cash Donations | Food from the Heart</title>
        <meta
          name='description'
          content='Food from the Heart fed 59,500 beneficiaries with S$7.25mil worth of food in 2021 and numbers are growing. Help us with cash donations in Singapore.'
        />
        <meta
          name='keywords'
          content='cash donations for charities Singapore, cash donation Singapore, cash donation to charity in Singapore'
        />
        <meta property='og:title' content='Cash Donations | Food from the Heart' />
        <meta
          property='og:description'
          content='Food from the Heart fed 59,500 beneficiaries with S$7.25mil worth of food in 2021 and numbers are growing. Help us with cash donations in Singapore.'
        />
        <meta property='og:type' content='website' />
        <meta property='og:url' content='https://helpnow.foodfromtheheart.sg/donate' />
        <link rel='canonical' href='https://helpnow.foodfromtheheart.sg/donate' />
        <meta property='og:image' content='https://www.foodfromtheheart.sg/assets/logo.png' />
      </Helmet>
      <Navbar />
      <Banner />
      <CardPaynow />
      <Footer />
    </>
  );
};

export default PaynowScreen;
