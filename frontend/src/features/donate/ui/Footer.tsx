import React from 'react';
import {Container, Typography, Box} from '@mui/material';
import classes from '../styles/Footer.module.scss';
import FeatherIcon from '@/components/FeatherIcon/FeatherIcon';
import {combineClasses} from '@/utils/styles';

const Footer: React.FC = () => {
  return (
    <Box className={classes.Root}>
      <Container maxWidth='xl' className={classes.Footer}>
        <Box>
          <Typography variant='subtitle1' className={classes.Title}>
            About
          </Typography>
          <Box className={classes.ListMenu}>
            <a href='https://www.foodfromtheheart.sg/about/'>Mission & History</a>
            <a href='https://www.foodfromtheheart.sg/about/board-and-management'>
              The Board and The Management
            </a>
            <a href='https://www.foodfromtheheart.sg/about/financials-reports'>
              Financial & Reports
            </a>
            <a href='https://www.foodfromtheheart.sg/about/partners-stakeholders'>Partners</a>
            <a href='https://www.foodfromtheheart.sg/media/'>Media</a>
            <a href='https://www.foodfromtheheart.sg/faq/'>FAQ</a>
          </Box>
        </Box>
        <Box>
          <Typography variant='subtitle1' className={classes.Title}>
            Our Work
          </Typography>
          <Box className={classes.ListMenu}>
            <a href='https://www.foodfromtheheart.sg/bread-run/'>Bread Run</a>
            <a href='https://www.foodfromtheheart.sg/community-food-pack/'>Community Food Pack</a>
            <a href='https://www.foodfromtheheart.sg/school-goodie-bag/'>School Goodie Bag</a>
            <a href='https://www.foodfromtheheart.sg/project-belanja/'>Project Belanja!</a>
            <a href='https://www.foodfromtheheart.sg/market-place/'>Market Place</a>
          </Box>
        </Box>
        <Box>
          <Typography variant='subtitle1' className={classes.Title}>
            Opportunites To Help
          </Typography>
          <Box className={classes.ListMenu}>
            <a href='https://www.foodfromtheheart.sg/opportunities-to-help/'>
              Tour: Opportunities to help
            </a>
            <a href='https://www.foodfromtheheart.sg/tour/individual-volunteer/sign-up.php'>
              Sign up as a volunteer
            </a>
            <a href='https://www.foodfromtheheart.sg/vportal/'>Volunteer portal</a>
            <a href='https://www.foodfromtheheart.sg/corporations-institutions'>
              Corporations and institutions
            </a>
            <a href='https://www.foodfromtheheart.sg/schools'>School</a>
            <a href='https://www.foodfromtheheart.sg/food-service-vendors'>
              Food and service vendors
            </a>
          </Box>
        </Box>
        <Box>
          <a href='https://helpnow.foodfromtheheart.sg/donate'>
            <Typography
              variant='subtitle1'
              className={combineClasses([classes.Title, classes.Link])}
            >
              Donate
            </Typography>
          </a>
          <a href='https://www.foodfromtheheart.sg/highlights/'>
            <Typography
              variant='subtitle1'
              className={combineClasses([classes.Title, classes.Link])}
            >
              Highlights
            </Typography>
          </a>
          <a href='https://www.foodfromtheheart.sg/contact/'>
            <Typography
              variant='subtitle1'
              className={combineClasses([classes.Title, classes.Link])}
            >
              Contacts
            </Typography>
          </a>
        </Box>
        <Box>
          <Typography variant='subtitle1' className={classes.Title}>
            Social
          </Typography>
          <Box className={classes.ListSocMed}>
            <a href='https://www.facebook.com/foodheart/'>
              <FeatherIcon icon='facebook' />
            </a>
            <a href='https://www.instagram.com/foodfromtheheartsg/'>
              <FeatherIcon icon='instagram' />
            </a>
            <a href='https://www.youtube.com/channel/UCY4yYGZK1DMJHec_D_v7Oqg'>
              <FeatherIcon icon='youtube' />
            </a>
            <a href='mailto:info@foodheart.org'>
              <FeatherIcon icon='mail' />
            </a>
          </Box>
          <Box className={classes.Address}>
            <Typography>
              <b>ADDRESS</b>: 130 Joo Seng Road #03-01 Singapore 368357
            </Typography>
            <Typography>
              <b>PHONE</b>: 6280 4483
            </Typography>
            <a href='https://www.foodfromtheheart.sg/data-protection-policy'>
              <Typography mt={4}>Data Protection Policy</Typography>
            </a>
            <a href='https://www.foodfromtheheart.sg/assets/downloads/Terms-Of-Use-11112019.pdf'>
              <Typography>Terms of Use</Typography>
            </a>
            <Typography>© Copyright 2021 Food from the Heart</Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
