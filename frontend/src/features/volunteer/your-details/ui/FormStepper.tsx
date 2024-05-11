import React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';

const steps = [
  'Food Deliveries',
  'Warehouse Logistics',
  'Events',
  'Professional Expertise and Support',
  'Self-initiated projects',
  'Volunteer Sign-Up',
  'Your Detail',
];

const FormStepper: React.FC = () => {
  return (
    <Box sx={{width: '100%'}}>
      <Stepper activeStep={7} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
};

export default FormStepper;
