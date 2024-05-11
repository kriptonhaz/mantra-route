import Logo from '@/assets/img/logo-ffth.png';
import {Box, Button, Stack, Container, Typography, useMediaQuery, IconButton} from '@mui/material';
import React, {useState} from 'react';
import classes from '../styles/Navbar.module.scss';
import Render from '@/components/Render';
import {combineClasses} from '@/utils/styles';
import FeatherIcon from '@/components/FeatherIcon/FeatherIcon';
import {Link} from 'react-router-dom';

const Navbar: React.FC = () => {
  const isMobile = useMediaQuery('(max-width:600px)');
  const [isOpenDropDown, setIsOpenDropDown] = useState(false);

  const toggleDropdown = () => setIsOpenDropDown(!isOpenDropDown);

  return (
    <Box className={classes.Root}>
      <Container
        maxWidth='xl'
        className={combineClasses([classes.Container, isMobile && classes.Mobile])}
      >
        <Render in={!isMobile}>
          <Stack direction='row' spacing={14} alignItems={'center'}>
            <Box>
              <img src={Logo} alt='logo ffth' />
            </Box>
            <Box className={classes.ListMenu}>
              <Box className={classes.MenuItem}>
                <Typography textTransform={'uppercase'}>About</Typography>
                <Box className={classes.DropDownMenu}>
                  <Box className={classes.Links}>
                    <a href='https://www.foodfromtheheart.sg/about/'>Mission & History</a>
                    <a href='https://www.foodfromtheheart.sg/about/board-and-management'>
                      The Board & The Management
                    </a>
                    <a href='https://www.foodfromtheheart.sg/about/financials-reports'>
                      Financial & Report
                    </a>
                    <a href='https://www.foodfromtheheart.sg/about/partners-stakeholders'>
                      Partners
                    </a>
                    <a href='https://www.foodfromtheheart.sg/media/'>Media</a>
                    <a href='https://www.foodfromtheheart.sg/faq/'>FAQ</a>
                  </Box>
                </Box>
              </Box>
              <Box className={classes.MenuItem}>
                <Typography textTransform={'uppercase'}>Our Work</Typography>
                <Box className={classes.DropDownMenu}>
                  <Box className={classes.Section}>
                    <Typography className={classes.Title}>Programmes</Typography>
                    <Box className={classes.Links}>
                      <a href='https://www.foodfromtheheart.sg/bread-run/'>Bread Run</a>
                      <a href='https://www.foodfromtheheart.sg/community-food-pack/'>
                        Community Food Pack
                      </a>
                      <a href='https://www.foodfromtheheart.sg/school-goodie-bag/'>
                        School Goodie Bag
                      </a>
                      <a href='https://www.foodfromtheheart.sg/project-belanja/'>
                        Project Belanja!
                      </a>
                      <a href='https://www.foodfromtheheart.sg/market-place/'>Market Place</a>
                    </Box>
                  </Box>
                  <Box className={classes.Divider}></Box>
                  <Box className={classes.Section}>
                    <Typography className={classes.Title}>Signature Events</Typography>
                    <Box className={classes.Links}>
                      <a href='https://www.foodfromtheheart.sg/passion-ball/'>Passion Ball</a>
                      <a href='https://www.foodfromtheheart.sg/clean-plate-campaign/'>
                        Clean Plate Campaign
                      </a>
                      <a href='https://www.foodfromtheheart.sg/toy-buffet/'>Toy Buffet</a>
                    </Box>
                  </Box>
                  <Box className={classes.Divider}></Box>
                  <Box className={classes.Section}>
                    <Typography className={classes.Title}>Campaign And Initiatives</Typography>
                    <Box className={classes.Links}>
                      <a href='https://www.foodfromtheheart.sg/community-shop/'>Communitoy Shop</a>
                      <a href='https://www.foodfromtheheart.sg/donate-right/'>Donate Right</a>
                      <a href='https://www.foodfromtheheart.sg/pop-up-fresh-produce-market/'>
                        Pop-Up Fresh Produce Market
                      </a>
                    </Box>
                  </Box>
                </Box>
              </Box>
              <Box className={classes.MenuItem}>
                <Typography textTransform={'uppercase'}>Opportunities To Help</Typography>
                <Box className={classes.DropDownMenu}>
                  <Box className={classes.Links}>
                    <a href='https://www.foodfromtheheart.sg/opportunities-to-help/'>
                      Tour: Opportunities to help
                    </a>
                  </Box>
                  <Box className={classes.Divider}></Box>
                  <Box className={classes.Section}>
                    <Typography className={classes.Title}>For Individuals</Typography>
                    <Box className={classes.Links}>
                      <a href='https://helpnow.foodfromtheheart.sg/donate'>Cash Donations</a>
                      <a href='https://www.foodfromtheheart.sg/in-kind-donations'>
                        In-Kind Donations
                      </a>
                      <a href='https://www.foodfromtheheart.sg/tour/individual-volunteer/sign-up.php'>
                        Sign up as a volunteer
                      </a>
                      <a href='https://www.foodfromtheheart.sg/vportal/'>Volunteer Portal</a>
                    </Box>
                  </Box>
                  <Box className={classes.Divider}></Box>
                  <Box className={classes.Section}>
                    <Typography className={classes.Title}>For Groups</Typography>
                    <Box className={classes.Links}>
                      <a href='https://www.foodfromtheheart.sg/corporations-institutions'>
                        Corporations and institutions
                      </a>
                      <a href='https://www.foodfromtheheart.sg/schools'>Schools</a>
                      <a href='https://www.foodfromtheheart.sg/food-service-vendors'>
                        Food and service vendors
                      </a>
                    </Box>
                  </Box>
                </Box>
              </Box>
              <Box className={classes.MenuItem}>
                <a href='https://www.foodfromtheheart.sg/contact/'>
                  <Typography textTransform={'uppercase'}>Contact</Typography>
                </a>
              </Box>
            </Box>
          </Stack>
          <Box>
            <Link to='/donate'>
              <Button color='error'>Donate</Button>
            </Link>
          </Box>
        </Render>
        <Render in={isMobile}>
          <Stack
            direction='row'
            justifyContent={'space-between'}
            alignItems={'center'}
            className={classes.NavbarMobile}
            sx={{width: '100%'}}
          >
            <Box className={classes.Logo}>
              <img src={Logo} alt='logo ffth' />
            </Box>
            <IconButton onClick={toggleDropdown}>
              <FeatherIcon icon={isOpenDropDown ? 'x' : 'menu'} />
            </IconButton>
          </Stack>
          <Box className={combineClasses([classes.DropDownMobile, isOpenDropDown && classes.Open])}>
            <Stack direction={'column'} spacing={4}>
              <Box>
                <Typography textTransform={'uppercase'}>About</Typography>
                <Box className={classes.DropDownMenu}>
                  <Box className={classes.Links}>
                    <a href='https://www.foodfromtheheart.sg/about/'>Mission & History</a>
                    <a href='https://www.foodfromtheheart.sg/about/board-and-management'>
                      The Board & The Management
                    </a>
                    <a href='https://www.foodfromtheheart.sg/about/financials-reports'>
                      Financial & Report
                    </a>
                    <a href='https://www.foodfromtheheart.sg/about/partners-stakeholders'>
                      Partners
                    </a>
                    <a href='https://www.foodfromtheheart.sg/media/'>Media</a>
                    <a href='https://www.foodfromtheheart.sg/faq/'>FAQ</a>
                  </Box>
                </Box>
              </Box>
              <Box>
                <Typography textTransform={'uppercase'}>Our Work</Typography>
                <Box className={classes.DropDownMenu}>
                  <Box className={classes.Section}>
                    <Typography className={classes.Title}>Programmes</Typography>
                    <Box className={classes.Links}>
                      <a href='https://www.foodfromtheheart.sg/bread-run/'>Bread Run</a>
                      <a href='https://www.foodfromtheheart.sg/community-food-pack/'>
                        Community Food Pack
                      </a>
                      <a href='https://www.foodfromtheheart.sg/school-goodie-bag/'>
                        School Goodie Bag
                      </a>
                      <a href='https://www.foodfromtheheart.sg/project-belanja/'>
                        Project Belanja!
                      </a>
                      <a href='https://www.foodfromtheheart.sg/market-place/'>Market Place</a>
                    </Box>
                  </Box>
                  <Box className={classes.Divider}></Box>
                  <Box className={classes.Section}>
                    <Typography className={classes.Title}>Signature Events</Typography>
                    <Box className={classes.Links}>
                      <a href='https://www.foodfromtheheart.sg/passion-ball/'>Passion Ball</a>
                      <a href='https://www.foodfromtheheart.sg/clean-plate-campaign/'>
                        Clean Plate Campaign
                      </a>
                      <a href='https://www.foodfromtheheart.sg/toy-buffet/'>Toy Buffet</a>
                    </Box>
                  </Box>
                  <Box className={classes.Divider}></Box>
                  <Box className={classes.Section}>
                    <Typography className={classes.Title}>Campaign And Initiatives</Typography>
                    <Box className={classes.Links}>
                      <a href='https://www.foodfromtheheart.sg/community-shop/'>Communitoy Shop</a>
                      <a href='https://www.foodfromtheheart.sg/donate-right/'>Donate Right</a>
                      <a href='https://www.foodfromtheheart.sg/pop-up-fresh-produce-market/'>
                        Pop-Up Fresh Produce Market
                      </a>
                    </Box>
                  </Box>
                </Box>
              </Box>
              <Box>
                <Typography textTransform={'uppercase'}>Opportunities To Help</Typography>
                <Box className={classes.DropDownMenu}>
                  <Box className={classes.Links}>
                    <a href='https://www.foodfromtheheart.sg/opportunities-to-help/'>
                      Tour: Opportunities to help
                    </a>
                  </Box>
                  <Box className={classes.Divider}></Box>
                  <Box className={classes.Section}>
                    <Typography className={classes.Title}>For Individuals</Typography>
                    <Box className={classes.Links}>
                      <a href='https://helpnow.foodfromtheheart.sg/donate'>Cash Donations</a>
                      <a href='https://www.foodfromtheheart.sg/in-kind-donations'>
                        In-Kind Donations
                      </a>
                      <a href='https://www.foodfromtheheart.sg/tour/individual-volunteer/sign-up.php'>
                        Sign up as a volunteer
                      </a>
                      <a href='https://www.foodfromtheheart.sg/vportal/'>Volunteer Portal</a>
                    </Box>
                  </Box>
                  <Box className={classes.Divider}></Box>
                  <Box className={classes.Section}>
                    <Typography className={classes.Title}>For Groups</Typography>
                    <Box className={classes.Links}>
                      <a href='https://www.foodfromtheheart.sg/corporations-institutions'>
                        Corporations and institutions
                      </a>
                      <a href='https://www.foodfromtheheart.sg/schools'>Schools</a>
                      <a href='https://www.foodfromtheheart.sg/food-service-vendors'>
                        Food and service vendors
                      </a>
                    </Box>
                  </Box>
                </Box>
              </Box>
              <Box>
                <a href='https://www.foodfromtheheart.sg/contact/'>
                  <Typography textTransform={'uppercase'}>Contact</Typography>
                </a>
              </Box>
            </Stack>
          </Box>
        </Render>
      </Container>
    </Box>
  );
};

export default Navbar;
