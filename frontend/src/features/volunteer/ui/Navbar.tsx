import Logo from '@/assets/img/logo-ffth.png';
import {Box, Button, Stack, Container, Typography} from '@mui/material';
import React from 'react';
import classes from '../styles/Navbar.module.scss';

const Navbar: React.FC = () => {
  return (
    <Box className={classes.Root}>
      <Container maxWidth='xl' className={classes.Container}>
        <Stack direction='row' spacing={14} alignItems={'center'}>
          <Box>
            <img src={Logo} alt='logo ffth' />
          </Box>
          <Box className={classes.ListMenu}>
            <Box className={classes.MenuItem}>
              <Typography textTransform={'uppercase'}>About</Typography>
              <Box className={classes.DropDownMenu}>
                <Box className={classes.Links}>
                  <a href='#'>Mission & History</a>
                  <a href='#'>The Board & The Management</a>
                  <a href='#'>Financial & Report</a>
                  <a href='#'>Partners</a>
                  <a href='#'>Media</a>
                  <a href='#'>FAQ</a>
                </Box>
              </Box>
            </Box>
            <Box className={classes.MenuItem}>
              <Typography textTransform={'uppercase'}>Our Work</Typography>
              <Box className={classes.DropDownMenu}>
                <Box className={classes.Section}>
                  <Typography className={classes.Title}>Programmes</Typography>
                  <Box className={classes.Links}>
                    <a href='#'>Bread Run</a>
                    <a href='#'>Community Food Pack</a>
                    <a href='#'>School Goodie Bag</a>
                    <a href='#'>Project Belanja!</a>
                    <a href='#'>Market Place</a>
                  </Box>
                </Box>
                <Box className={classes.Divider}></Box>
                <Box className={classes.Section}>
                  <Typography className={classes.Title}>Signature Events</Typography>
                  <Box className={classes.Links}>
                    <a href='#'>Passion Ball</a>
                    <a href='#'>Clean Plate Campaign</a>
                    <a href='#'>Toy Buffet</a>
                  </Box>
                </Box>
                <Box className={classes.Divider}></Box>
                <Box className={classes.Section}>
                  <Typography className={classes.Title}>Campaign And Initiatives</Typography>
                  <Box className={classes.Links}>
                    <a href='#'>Communitoy Shop</a>
                    <a href='#'>Donate Right</a>
                    <a href='#'>Pop-Up Fresh Produce Market</a>
                  </Box>
                </Box>
              </Box>
            </Box>
            <Box className={classes.MenuItem}>
              <Typography textTransform={'uppercase'}>Opportunities To Help</Typography>
              <Box className={classes.DropDownMenu}>
                <Box className={classes.Links}>
                  <a href='#'>Tour: Opportunities to help</a>
                </Box>
                <Box className={classes.Divider}></Box>
                <Box className={classes.Section}>
                  <Typography className={classes.Title}>For Individuals</Typography>
                  <Box className={classes.Links}>
                    <a href='#'>Cash Donations</a>
                    <a href='#'>In-Kind Donations</a>
                    <a href='#'>Sign up as a volunteer</a>
                    <a href='#'>Volunteer Portal</a>
                  </Box>
                </Box>
                <Box className={classes.Divider}></Box>
                <Box className={classes.Section}>
                  <Typography className={classes.Title}>For Groups</Typography>
                  <Box className={classes.Links}>
                    <a href='#'>Corporations and institutions</a>
                    <a href='#'>Schools</a>
                    <a href='#'>Food and service vendors</a>
                  </Box>
                </Box>
              </Box>
            </Box>
            <Box className={classes.MenuItem}>
              <Typography textTransform={'uppercase'}>Contact</Typography>
            </Box>
          </Box>
        </Stack>
        <Box>
          <Button color='error'>Donate</Button>
        </Box>
      </Container>
    </Box>
  );
};

export default Navbar;
