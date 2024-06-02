import IconCircle from '@/components/IconCircle';
import FeatherIcon from '@/components/FeatherIcon/FeatherIcon';
import {VolunteerRequestItemType, VrSessionItemType} from '@/interface/volunteerRequest.interface';
import {neutral, primary} from '@/themes/ts/colors';
import {
  Box,
  Button,
  Card,
  Chip,
  Divider,
  Grid,
  IconButton,
  Stack,
  SxProps,
  Typography,
} from '@mui/material';
import dayjs from 'dayjs';
import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import CardSessionItem from './CardSessionItem';
import ModalRegister from './ModalRegister';
import ModalWithdraw from './ModalWithdraw';
import Render from '@/components/Render';
import {useVolunteerRequestHook} from '@/hooks/use-volunteerRequest.hooks';
import {appendStyle} from '@/utils/styles';
import VolunteerPacking from '@/assets/img/volunteer-packing.jpg';

const styles: {alert: SxProps; chevron: SxProps} = {
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

const AlertInfo: React.FC = () => {
  return (
    <Box sx={styles.alert}>
      <IconCircle icon='check-circle' color='success' />
      <Typography>
        Join us for a rewarding volunteer opportunity as a food packer and make a difference in our
        community!
      </Typography>
    </Box>
  );
};

type CardVolunteerDetailProps = {
  vrDetail?: VolunteerRequestItemType;
  listSession?: VrSessionItemType[];
  isRegister?: boolean;
};

const CardVolunteerDetail: React.FC<CardVolunteerDetailProps> = (
  props?: CardVolunteerDetailProps,
) => {
  const navigate = useNavigate();
  const {volunteerStore, registerMutationRegular, withdrawnMutationRegular} =
    useVolunteerRequestHook();
  const [modalRegister, setModalRegister] = useState<{
    show: boolean;
    dataSession: VrSessionItemType | null;
  }>({
    show: false,
    dataSession: null,
  });
  const [modalWithdraw, setModalWithdraw] = useState<{
    show: boolean;
    dataSession: VrSessionItemType | null;
  }>({
    show: false,
    dataSession: null,
  });
  const [isExpandDescription, setIsExpandDescription] = useState(false);

  const handleCloseModalRegister = () => {
    setModalRegister({
      ...modalRegister,
      show: false,
      dataSession: null,
    });
  };

  const handleCloseModalWithdraw = () => {
    setModalWithdraw({
      ...modalWithdraw,
      show: false,
      dataSession: null,
    });
  };

  const register = registerMutationRegular({
    idVr: props?.vrDetail?.Id || '',
  });

  const withdraw = withdrawnMutationRegular({
    idVr: props?.vrDetail?.Id || '',
    reason: 'test',
  });

  const DataItem: React.FC<{label: string; value: string}> = ({label, value}) => {
    return (
      <Grid item md={6}>
        <Typography mb={1} color='text.secondary'>
          {label}
        </Typography>
        <Typography>{value}</Typography>
      </Grid>
    );
  };

  const renderTitle = (title: string, type: string | null): string => {
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
      newTitle = `${firstSegment} ${secondSegment} (${type})`;
    }
    return newTitle;
  };

  return (
    <Card sx={{p: 0}}>
      <Box sx={{p: 6}}>
        <Stack direction={{xs: 'column-reverse', md: 'row'}} justifyContent={'space-between'}>
          <Box>
            <Typography variant='h6' fontWeight={'medium'} mb={1}>
              {props?.vrDetail?.Name}
            </Typography>
            <Typography color='text.secondary'>Learn more about this opportunity</Typography>
          </Box>
          <Box>
            <Chip label={props?.vrDetail?.RecordType.Name} color='success' />
          </Box>
        </Stack>
      </Box>
      <Divider />
      {props?.vrDetail?.RecordType.Name === 'Regular' ? (
        <Box sx={{p: 6}}>
          <AlertInfo />
          <Typography mb={4} fontWeight={'medium'}>
            Basic Information
          </Typography>
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
                  {props.vrDetail?.Session_Picture__c ? (
                    <div
                      dangerouslySetInnerHTML={{
                        __html: props.vrDetail?.Session_Picture__c,
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
                      __html: props.vrDetail?.Introduction__c || '-',
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
                      __html: props.vrDetail?.Description__c || '-',
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
          <Grid container spacing={4} mt={2}>
            <DataItem label='Frequency' value={props.vrDetail?.Frequency_Type__c || '-'} />
            <DataItem
              label='Max Number of Volunteer Required'
              value={props.vrDetail?.Number_of_Volunteers_Required__c?.toString() || '-'}
            />
            <DataItem
              label='Start Date'
              value={dayjs(props.vrDetail?.Start_Date__c).format('DD/MM/YYYY')}
            />
            <DataItem
              label='End Date'
              value={dayjs(props.vrDetail?.End_Date__c).format('DD/MM/YYYY')}
            />
            <DataItem
              label='Start Time'
              value={props.vrDetail?.Start_Time__c?.substring(0, 5) as string}
            />
            <DataItem
              label='End Time'
              value={props.vrDetail?.End_Time__c?.substring(0, 5) as string}
            />
          </Grid>
          {/* TODO: add import assigned volunteer for organisation */}
          <Box p={6}>
            <Render in={props.isRegister === false}>
              <Stack direction={'row'} justifyContent={'center'} spacing={4}>
                <Button
                  disabled={volunteerStore.isLoading}
                  onClick={() => {
                    register.mutate(props.vrDetail?.Id || '');
                    volunteerStore.setIsLoading(true);
                  }}
                >
                  Register
                </Button>
              </Stack>
            </Render>
            <Render in={props.isRegister === true}>
              <Stack direction='row' justifyContent={'center'}>
                <Button
                  color='error'
                  disabled={volunteerStore.isLoading}
                  onClick={() => {
                    withdraw.mutate({vrId: props.vrDetail?.Id || '', reason: '-'});
                    volunteerStore.setIsLoading(true);
                  }}
                >
                  Withdraw
                </Button>
              </Stack>
            </Render>
          </Box>
        </Box>
      ) : (
        <Box sx={{p: 6}}>
          <AlertInfo />
          <Box>
            <Typography fontWeight={'medium'} mb={4}>
              Available Sessions
            </Typography>
            <Stack direction='column' spacing={4}>
              {props?.listSession?.map((item) => (
                <CardSessionItem
                  key={item.Id}
                  title={renderTitle(item.Session_Title__c, item.Session_Type__c)}
                  date={dayjs(item.Session_Date__c).format('DD/MM/YYYY')}
                  startTime={item.Start_Time__c}
                  endTime={item.End_Time__c}
                  required={item.Max_Num_of_Volunteer__c}
                  signedUp={item.Number_of_Sign_ups__c}
                  openModal={() => navigate(`/dashboard/volunteer/${item.Id}/assignment`)}
                  status={item.assigneeStatus}
                  isRegister={item.assignedVolunteerId !== null}
                />
              ))}
            </Stack>
          </Box>
        </Box>
      )}
      <ModalRegister
        show={modalRegister.show}
        dataSession={modalRegister.dataSession}
        onClose={handleCloseModalRegister}
      />
      <ModalWithdraw
        show={modalWithdraw.show}
        dataSession={modalWithdraw.dataSession}
        onClose={handleCloseModalWithdraw}
      />
    </Card>
  );
};

export default CardVolunteerDetail;
