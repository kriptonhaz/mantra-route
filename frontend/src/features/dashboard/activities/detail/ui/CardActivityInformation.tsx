import React, {PropsWithChildren, useState} from 'react';
import {
  Card,
  Typography,
  Box,
  Grid,
  Divider,
  Stack,
  Chip,
  IconButton,
  Button,
  CircularProgress,
} from '@mui/material';
import {ProgrammeEventDetailResponseType} from '@/interface/programmeEvents.interface';
import dayjs from 'dayjs';
import {appendStyle} from '@/utils/styles';
import FeatherIcon from '@/components/FeatherIcon/FeatherIcon';
import VolunteerPacking from '@/assets/img/volunteer-packing.jpg';
import Render from '@/components/Render';

export interface IDataItemProps extends PropsWithChildren {
  label: string;
  value?: string;
}
const DataItem: React.FC<IDataItemProps> = ({label, value, children}) => {
  return (
    <Grid item md={6}>
      <Typography mb={1} color='text.secondary'>
        {label}
      </Typography>
      <Render in={!!value}>
        <Typography>{value}</Typography>
      </Render>
      <Render in={!value}>{children}</Render>
    </Grid>
  );
};

interface CardActivityInformationProps {
  data: ProgrammeEventDetailResponseType | undefined;
  onRegister: () => void;
  onWithdrawCancel: (status: 'withdraw' | 'cancel') => void;
  loadingSubmit?: boolean;
}

const CardActivityInformation: React.FC<CardActivityInformationProps> = (
  props: CardActivityInformationProps,
) => {
  const {data, loadingSubmit, onRegister, onWithdrawCancel} = props;
  const [isExpandDescription, setIsExpandDescription] = useState(false);
  return (
    <Card sx={{p: 0}}>
      <Box p={6} sx={{position: 'relative'}}>
        <Stack direction='row' justifyContent='space-between'>
          <Box>
            <Typography variant='h6' fontWeight={'medium'} mb={1}>
              {data?.programmeEvent.Name}
            </Typography>
            <Typography color='text.secondary'>Learn more about this activity</Typography>
          </Box>
          <Box>
            <Chip
              label={data?.programmeEvent.Programme_Stage__c}
              color='warning'
              sx={{position: 'absolute', right: 24, top: 24, display: {xs: 'none', md: 'block'}}}
            />
          </Box>
        </Stack>
      </Box>
      <Divider />
      <Box p={6}>
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
                    <img src={VolunteerPacking} />
                  </Box>
                </Box>
                <Box>
                  <Typography color='text.secondary' mb={1}>
                    Introduction
                  </Typography>
                  <Typography>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: data?.programmeEvent.Introduction__c
                          ? data?.programmeEvent.Introduction__c
                          : '-',
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
                        __html: data?.programmeEvent.Programme_Description__c
                          ? data?.programmeEvent.Programme_Description__c
                          : '-',
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
          <DataItem
            label='Venue of Event'
            value={data?.programmeEvent.Venue_of_Event_or_Mobilisation__c ?? '-'}
          />
          <DataItem
            label='Event Attire'
            value={
              data?.programmeEvent.Event_Attire__c
                ? data?.programmeEvent.Event_Attire__c === 'Other'
                  ? data?.programmeEvent.Event_Attire_Other__c ?? '-'
                  : data?.programmeEvent.Event_Attire__c
                : '-'
            }
          />
          <DataItem
            label='Start Date'
            value={
              data?.programmeEvent.Start_Date_Time__c
                ? dayjs(data?.programmeEvent.Start_Date_Time__c).format('DD/MM/YYYY')
                : '-'
            }
          />
          <DataItem
            label='End Date'
            value={
              data?.programmeEvent.End_Date_Time__c
                ? dayjs(data?.programmeEvent.End_Date_Time__c).format('DD/MM/YYYY')
                : '-'
            }
          />
          <DataItem
            label='Start Time'
            value={
              data?.programmeEvent.Start_Date_Time__c
                ? dayjs
                    .tz(dayjs(data?.programmeEvent.Start_Date_Time__c), 'Asia/Singapore')
                    .format('HH:mm')
                : '-'
            }
          />
          <DataItem
            label='End Time'
            value={
              data?.programmeEvent.End_Date_Time__c
                ? dayjs
                    .tz(dayjs(data?.programmeEvent.End_Date_Time__c), 'Asia/Singapore')
                    .format('HH:mm')
                : '-'
            }
          />
          <DataItem
            label='Frequency'
            value={data?.programmeEvent.Frequency__c ? data?.programmeEvent.Frequency__c : '-'}
          />
          <DataItem label='Registration Status'>
            <Chip
              label={!!data?.participantData ? data.participantData.Status__c : 'UNREGISTERED'}
              color={!!data?.participantData ? 'info' : 'default'}
            />
          </DataItem>
        </Grid>
      </Box>
      <Divider />
      <Box pt={3} pb={6} sx={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
        <Render
          in={
            data?.participantData === null ||
            data?.participantData.Status__c === 'Withdraw' ||
            data?.participantData.Status__c === 'Cancel'
          }
        >
          <Button disabled={loadingSubmit} onClick={onRegister}>
            <Render in={!!loadingSubmit}>
              <CircularProgress sx={{mr: 2}} />
            </Render>
            Register
          </Button>
        </Render>
        <Render in={data?.participantData?.Status__c === 'Registered'}>
          <Stack direction='column' alignItems={'center'} spacing={2} sx={{textAlign: 'center'}}>
            <Typography fontWeight={600}>Waiting for approval</Typography>
            <Typography color={'text.secondary'}>
              Thanks for applying, currently we’re checking your information and we’ll get back to
              you shortly!
            </Typography>
            <Button
              disabled={loadingSubmit}
              variant='outlined'
              color='inherit'
              sx={{marginTop: '20px !important'}}
              className='btn-neutral'
              onClick={() => onWithdrawCancel('withdraw')}
            >
              <Render in={!!loadingSubmit}>
                <CircularProgress sx={{mr: 2}} />
              </Render>
              Withdraw Application
            </Button>
          </Stack>
        </Render>
        <Render in={data?.participantData?.Status__c === 'Accepted'}>
          <Stack direction='column' alignItems={'center'} spacing={2} sx={{textAlign: 'center'}}>
            <Typography fontWeight={600}>You’re approved!</Typography>
            <Typography color={'text.secondary'}>We can’t wait to see you!</Typography>
            <Button
              disabled={loadingSubmit}
              variant='outlined'
              color='inherit'
              sx={{marginTop: '20px !important'}}
              className='btn-neutral'
              onClick={() => onWithdrawCancel('cancel')}
            >
              <Render in={!!loadingSubmit}>
                <CircularProgress sx={{mr: 2}} />
              </Render>
              Cancel
            </Button>
          </Stack>
        </Render>
      </Box>
    </Card>
  );
};

export default CardActivityInformation;
