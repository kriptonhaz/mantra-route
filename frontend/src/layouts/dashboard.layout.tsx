import FeatherIcon from '@/components/FeatherIcon/FeatherIcon';
import Render from '@/components/Render/Render';
import {info, neutral} from '@/themes/ts/colors';
import {Badge, BadgeProps, Box, BoxProps, Button, Stack, Typography} from '@mui/material';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import React, {PropsWithChildren} from 'react';
import {Link, useNavigate} from 'react-router-dom';

const Content: React.FC<BoxProps> = ({children, ...boxProps}) => {
  return (
    <Box {...boxProps} sx={{flex: 1, width: {md: 'auto', xs: '100%'}}}>
      {children}
    </Box>
  );
};
const Activity: React.FC<BoxProps> = ({children, ...boxProps}) => {
  return (
    <Box {...boxProps} sx={{width: '100%', maxWidth: {xs: 'auto', md: '350px'}}}>
      {children}
    </Box>
  );
};

export interface IDashboardBreadcrumb {
  type: 'icon' | 'text';
  content: string | React.ReactNode;
  href: string;
}
export interface IDashboardLayoutProps extends PropsWithChildren {
  title: string;
  subtitle?: string;
  badgeProps?: BadgeProps;
  breadCrumbs?: IDashboardBreadcrumb[];
  withBackBtn?: boolean;
}
const DashboardLayout = ({
  children,
  title,
  subtitle,
  breadCrumbs,
  badgeProps,
  withBackBtn,
}: IDashboardLayoutProps) => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        position: 'relative',
        paddingTop: {xs: 'calc(32px*2)', md: '32px'},
        paddingBottom: '64px',
        px: {xs: 4, md: 8},
      }}
    >
      <Box>
        <Render in={!!withBackBtn}>
          <Box mb={6}>
            <Button
              sx={{ml: -3, mt: -1}}
              variant='text'
              color='inherit'
              onClick={() => {
                navigate(-1);
              }}
              startIcon={<FeatherIcon icon='arrow-left' />}
            >
              Back
            </Button>
          </Box>
        </Render>
        <Typography
          variant={'h5'}
          sx={{display: {xs: 'block', md: 'none'}}}
          fontWeight={500}
          mb={1}
        >
          {title}
        </Typography>
        <Typography
          variant={'h4'}
          sx={{display: {xs: 'none', md: 'block'}}}
          fontWeight={500}
          mb={1}
        >
          {title}
        </Typography>
        <Render in={!!subtitle}>
          <Typography color='text.secondary'>{subtitle}</Typography>
        </Render>
        <Render in={!!breadCrumbs}>
          <Breadcrumbs separator='/'>
            {breadCrumbs?.map((item, i) => {
              if (item.type === 'icon') {
                return (
                  <Link to={item.href}>
                    <Typography sx={{color: neutral[500], transform: 'translateY(3px)'}}>
                      {item.content}
                    </Typography>
                  </Link>
                );
              }
              if (item.type === 'text') {
                if (i < breadCrumbs.length - 1) {
                  return (
                    <Link to={item.href}>
                      <Typography>{item.content}</Typography>
                    </Link>
                  );
                }
                return (
                  <Typography color={info[700]} fontWeight={'medium'}>
                    {item.content}
                  </Typography>
                );
              }
              return <></>;
            })}
          </Breadcrumbs>
        </Render>
      </Box>
      <Box sx={{position: 'absolute', top: {xs: 'calc(26px*2)', md: 32}, right: {xs: 16, md: 32}}}>
        <Badge
          {...badgeProps}
          badgeContent={badgeProps?.badgeContent ? badgeProps?.badgeContent : undefined}
          max={9}
          color='primary'
        >
          <Box sx={{display: {xs: 'block', md: 'none'}}}>
            <Button
              data-shape='icon'
              size={'lg'}
              variant='outlined'
              color='inherit'
              sx={{border: `2px solid ${neutral[300]}`, borderRadius: '12px'}}
            >
              <FeatherIcon
                icon='bell'
                sx={{
                  '& svg': {
                    width: '800px !important',
                    strokeWidth: '2px',
                    marginTop: 2,
                    transform: 'scale(1)',
                  },
                  color: neutral[500],
                }}
              />
            </Button>
          </Box>
          <Box sx={{display: {xs: 'none', md: 'block'}}}>
            <Link to='/notification'>
              <Button
                data-shape='icon'
                size={'2xl'}
                variant='outlined'
                color='inherit'
                sx={{border: `2px solid ${neutral[300]}`, borderRadius: '12px'}}
              >
                <FeatherIcon
                  icon='bell'
                  sx={{
                    '& svg': {
                      width: '800px !important',
                      strokeWidth: '2.5px',
                      marginTop: 1,
                      transform: 'scale(1.1)',
                    },
                    color: neutral[500],
                  }}
                />
              </Button>
            </Link>
          </Box>
        </Badge>
      </Box>
      <Stack
        direction={{xs: 'column', md: 'row'}}
        justifyContent={'space-between'}
        sx={{width: '100%', mt: 8}}
        alignItems={'flex-start'}
        spacing={6}
      >
        {children}
      </Stack>
    </Box>
  );
};

DashboardLayout.Content = Content;
DashboardLayout.Activity = Activity;
export default DashboardLayout;
