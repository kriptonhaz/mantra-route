import React from 'react';
import Navbar from '../ui/Navbar';
import Banner from '../ui/Banner';
import Footer from '../ui/Footer';
import FormYourDetails from './FormYourDetails';

const YourDetailsScreen: React.FC = () => {
  return (
    <>
      <Navbar />
      <Banner title='Your Details' />
      <FormYourDetails />
      <Footer />
    </>
  );
};

export default YourDetailsScreen;
