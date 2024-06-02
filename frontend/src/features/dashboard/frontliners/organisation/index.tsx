import FeatherIcon from '@/components/FeatherIcon/FeatherIcon';
import DashboardLayout, {IDashboardBreadcrumb} from '@/layouts/dashboard.layout';
import {neutral} from '@/themes/ts/colors';
import IconCircle from '@/components/IconCircle';
import {
  Box,
  Card,
  Divider,
  Stack,
  Button,
  Typography,
  SxProps,
  Chip,
  Grid,
  Collapse,
  IconButton,
} from '@mui/material';
import {primary} from '@/themes/ts/colors';
import React, {useEffect, useMemo, useState} from 'react';
import BoxImport from './ui/BoxImport';
import TableVolunteer from './ui/TableVolunteer';
import ModalAddVolunteer from './ui/ModalAddVolunteer';
import {useParams} from 'react-router-dom';
import {useVolunteerRequestHook} from '@/hooks/use-volunteerRequest.hooks';
import dayjs from 'dayjs';
import {useVolunteerSessionHook} from '@/hooks/use-volunteerSession.hooks';
import ModalWithdraw from './ui/ModalWithdraw';
import Render from '@/components/Render';
import ModalBulkInsert from './ui/ModalBulkInsert';
import {appendStyle} from '@/utils/styles';
import VolunteerPacking from '@/assets/img/volunteer-packing.jpg';

enum EStatusView {
  IMPORT,
  TABLE,
}

const styles: {subtitle: SxProps; alert: SxProps; chevron: SxProps} = {
  subtitle: {
    display: 'flex',
    gap: 2,
    color: neutral[500],
    '& svg': {
      transform: 'scale(.8) translate(0px,-2px)',
      color: neutral[400],
    },
    '& p': {
      ml: -1,
    },
  },
  alert: {
    display: 'flex',
    gap: 3,
    flexDirection: {xs: 'column', md: 'row'},
    alignItems: {xs: 'flex-start', md: 'center'},
    background: primary[50],
    color: primary[800],
    p: 4,
    mb: 6,
  },
  chevron: {color: neutral[700]},
};

const DataItem: React.FC<{label: string; value: string}> = ({label, value}) => (
  <Grid item xs={6} md={6}>
    <Typography color='text.secondary' mb={1}>
      {label}
    </Typography>
    <Typography>{value}</Typography>
  </Grid>
);

const VolunteerOrganisation: React.FC = () => {
  const {sessionId} = useParams();
  const [showModalAdd, setShowModalAdd] = useState(false);
  const [showModalBulkInsert, setshowModalBulkInsert] = useState(false);
  const [showModalWithdraw, setShowModalWithdraw] = useState(false);
  const [statusView, setStatusView] = useState<EStatusView>(EStatusView.IMPORT);
  const {volunteerSessionDetail} = useVolunteerRequestHook();
  const {getAllQuery, registerMutation, volunteerStore} = useVolunteerSessionHook();
  const {data: dataSessionDetail} = volunteerSessionDetail({sessionId: sessionId || ''});
  const {data: listVrSession, isLoading: loadingListVr, isFetching: fetchingListVr} = getAllQuery();
  const [isExpandDescription, setIsExpandDescription] = useState(false);

  const volunteerSession = useMemo(() => dataSessionDetail?.volunteerSession, [dataSessionDetail]);
  const isRegister = useMemo(() => listVrSession?.isRegistred, [listVrSession]);

  const listAssignedVolunteer = useMemo(
    () => listVrSession?.assignedVolunteers || [],
    [listVrSession],
  );

  const [breadcrumbs, setBreadcrumbs] = useState<IDashboardBreadcrumb[]>([
    {
      type: 'icon',
      content: <FeatherIcon icon='home' />,
      href: '/dashboard/home',
    },
    {
      type: 'text',
      content: 'Volunteer',
      href: '/dashboard/volunteer',
    },
  ]);

  useEffect(() => {
    if (volunteerSession) {
      let newBreadCrumbs: IDashboardBreadcrumb = {
        type: 'text',
        content: volunteerSession?.Volunteer_Request__r?.Name,
        href: `/dashboard/volunteer/${volunteerSession?.Volunteer_Request__r?.Id}`,
      };
      let finalBreadCrumbs = [...breadcrumbs].concat(newBreadCrumbs);
      setBreadcrumbs(finalBreadCrumbs);
    }
  }, [volunteerSession]);

  const register = registerMutation({
    vrId: volunteerSession?.Volunteer_Request__r.Id || '',
    sessionId: sessionId || '',
  });

  const AlertInfo: React.FC = () => {
    return (
      <Box sx={styles.alert}>
        <IconCircle icon='check-circle' color='success' />
        <Typography>
          Join us for a rewarding volunteer opportunity as a food packer and make a difference in
          our community!
        </Typography>
      </Box>
    );
  };

  const renderTitle = (title: string): string => {
    let newTitle = title;
    if (title.length === 0) {
      return title;
    } else if (title.toLowerCase().substring(0, 2) === 'fp') {
      newTitle = title.replace('FP', 'Food Packing');
    }
    let indexSession = newTitle.toLowerCase().indexOf('session');
    if (indexSession >= -1) {
      let firstSegment = newTitle.substring(0, indexSession);
      let secondSegment = newTitle.substring(indexSession + 7).trim();
      if (secondSegment.toLowerCase().substring(0, 1) === 'm') {
        secondSegment = 'Morning-' + secondSegment.substring(1, 2);
      } else if (secondSegment.toLowerCase().substring(0, 1) === 'a') {
        secondSegment = 'Afternoon-' + secondSegment.substring(1, 2);
      }
      newTitle = `${firstSegment} ${secondSegment} (${volunteerSession?.Session_Type__c})`;
    }
    return newTitle;
  };

  return (
    <DashboardLayout
      title={volunteerSession?.Volunteer_Request__r?.Name || '-'}
      withBackBtn
      breadCrumbs={breadcrumbs}
    >
      <DashboardLayout.Content>
        <Card sx={{p: 0}}>
          <Box p={6} sx={{position: 'relative'}}>
            <Box mb={2}>
              <Chip
                label='Food Packing'
                color='success'
                sx={{display: {xs: 'inline-block', md: 'none'}}}
              />
            </Box>
            <Typography mb={1} fontWeight='medium' variant='h6'>
              {renderTitle(volunteerSession?.Session_Title__c || '')}
            </Typography>
            <Box sx={styles.subtitle}>
              <FeatherIcon icon='calendar' />
              <Typography variant='body2'>
                {dayjs(volunteerSession?.Session_Date__c).format('DD/MM/YYYY')}
              </Typography>
            </Box>
            <Chip
              label={volunteerSession?.Session_Type__c}
              color='info'
              sx={{position: 'absolute', right: 24, top: 24, display: {xs: 'none', md: 'block'}}}
            />
          </Box>
          <Divider />
          <Box p={6}>
            <AlertInfo />
            <Typography mb={4} fontWeight={'medium'}>
              Basic Information
            </Typography>
            <Grid container spacing={4}>
              <Grid item xs={12}>
                <Stack
                  direction='row'
                  justifyContent={'space-between'}
                  spacing={4}
                  sx={{
                    border: '1px solid #E4E4E7',
                    padding: '16px',
                    borderRadius: '4px',
                    position: 'relative',
                  }}
                >
                  <Stack
                    direction={{xs: 'column', md: 'row'}}
                    spacing={4}
                    sx={{
                      flex: 1,
                    }}
                  >
                    <Box>
                      <Box
                        sx={{
                          width: {xs: '100%', md: '200px'},
                          borderRadius: '8px',
                          overflow: 'hidden',
                          display: 'inline-block',
                          position: 'relative',
                          flexDirection: 'row',
                          justifyContent: 'center',
                          alignItems: 'center',
                          aspectRatio: '2/2',
                          '& img': {
                            minWidth: '100%',
                            maxWidth: '280px',
                            maxHeight: '280px',
                            width: 'auto',
                            minHeight: '100%',
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%,-50%)',
                            aspectRatio: 1 / 1,
                            objectFit: 'contain',
                          },
                        }}
                      >
                        {volunteerSession?.Session_Picture__c ? (
                          <div
                            dangerouslySetInnerHTML={{
                              __html: volunteerSession?.Session_Picture__c,
                            }}
                          />
                        ) : (
                          <img src={VolunteerPacking} />
                        )}
                      </Box>
                    </Box>
                    <Box>
                      <Typography color='text.secondary' mb={1}>
                        Introduction
                      </Typography>
                      <Typography>
                        <div
                          dangerouslySetInnerHTML={{
                            __html: volunteerSession?.Introduction__c || '-',
                          }}
                        />
                      </Typography>
                      <Typography color='text.secondary' mb={1} mt={4}>
                        Description
                      </Typography>
                      <Typography
                        sx={[
                          ...appendStyle(
                            !isExpandDescription
                              ? {
                                  WebkitLineClamp: 3,
                                  display: '-webkit-box',
                                  overflow: 'hidden',
                                  WebkitBoxOrient: 'vertical',
                                }
                              : {},
                          ),
                          {
                            wordWrap: 'break-word',
                            whiteSpace: 'pre-wrap',
                          },
                        ]}
                      >
                        <div
                          dangerouslySetInnerHTML={{
                            __html: volunteerSession?.Description__c || '-',
                          }}
                        />
                      </Typography>
                    </Box>
                  </Stack>
                  <IconButton
                    onClick={() => setIsExpandDescription(!isExpandDescription)}
                    sx={{
                      '& svg': {
                        strokeWidth: '2.8px',
                        width: '32px',
                        height: '32px',
                      },
                      position: {xs: 'absolute', md: 'relative'},
                      top: 10,
                      right: 10,
                      background: '#fff',
                      border: {xs: '1px solid #ddd', md: 'none'},
                      width: '50px',
                      height: '50px',
                    }}
                  >
                    {isExpandDescription ? (
                      <FeatherIcon icon='chevron-up' />
                    ) : (
                      <FeatherIcon icon='chevron-down' />
                    )}
                  </IconButton>
                </Stack>
              </Grid>

              <DataItem label='My Status' value={volunteerSession?.Session_Status__c ?? '-'} />
              <DataItem
                label='Date'
                value={dayjs(volunteerSession?.Session_Date__c).format('DD/MM/YYYY')}
              />
              <DataItem
                label='Start Time'
                value={dayjs(volunteerSession?.Start_Time__c.split('.')[0], 'HH:mm:ss').format(
                  'hh:mm A',
                )}
              />
              <DataItem
                label='End Time'
                value={dayjs(volunteerSession?.End_Time__c.split('.')[0], 'HH:mm:ss').format(
                  'hh:mm A',
                )}
              />
              <DataItem
                label='Number of Signup'
                value={volunteerSession?.Number_of_Sign_ups__c || '-'}
              />
              <DataItem
                label='Max Number of Volunteer Required'
                value={volunteerSession?.Max_Num_of_Volunteer__c?.toString() || '-'}
              />
            </Grid>

            {isRegister && volunteerSession?.Volunteer_Type__c === 'Organization' && (
              <>
                <Collapse in={!listAssignedVolunteer?.length}>
                  <BoxImport
                    onUpload={() => setshowModalBulkInsert(true)}
                    onAdd={() => setShowModalAdd(true)}
                  />
                </Collapse>
                <Collapse in={!!listAssignedVolunteer?.length}>
                  <TableVolunteer
                    listAssignedVolunteer={listAssignedVolunteer}
                    onClear={() => setStatusView(EStatusView.IMPORT)}
                    onAdd={() => setShowModalAdd(true)}
                    loading={loadingListVr || fetchingListVr}
                  />
                </Collapse>
              </>
            )}
          </Box>
          <Divider />
          <Box p={6}>
            <Render in={isRegister === false}>
              <Stack direction={'row'} justifyContent={'center'} spacing={4}>
                <Button
                  disabled={volunteerStore.isLoading}
                  onClick={() => {
                    register.mutate(sessionId || '');
                    volunteerStore.setIsLoading(true);
                  }}
                >
                  Register
                </Button>
              </Stack>
            </Render>
            <Render in={isRegister === true}>
              <Stack direction='row' justifyContent={'center'}>
                <Button color='error' onClick={() => setShowModalWithdraw(true)}>
                  Withdraw
                </Button>
              </Stack>
            </Render>
          </Box>
        </Card>

        <ModalAddVolunteer show={showModalAdd} onClose={() => setShowModalAdd(false)} />
        <ModalBulkInsert show={showModalBulkInsert} onClose={() => setshowModalBulkInsert(false)} />

        <ModalWithdraw
          open={showModalWithdraw}
          sessionId={sessionId || ''}
          vrId={volunteerSession?.Volunteer_Request__r.Id || ''}
          onClose={() => setShowModalWithdraw(false)}
        />
      </DashboardLayout.Content>
    </DashboardLayout>
  );
};

export default VolunteerOrganisation;
