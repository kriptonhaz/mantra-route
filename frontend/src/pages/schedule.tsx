import {BigCalendar, ICalendarGeneratorEvent} from '@/components/Calendar';
import {
  ScheduleGenerator,
  locationType,
  scheduleGeneratorInput,
} from '@/components/Form/ScheduleGenerator';
import ModalConfirm, {
  IModalConfirmProps,
} from '@/features/dashboard/activities/detail/ui/ModalConfirm';
import {ISessionModalProps, ModalSessionDetail} from '@/features/dashboard/home/ui/SessionDetail';
import useSchedule from '@/hooks/use-schedule.hook';
import {ISubmitGeneratedEvent} from '@/interface/volunteerSession.interface';
import DashboardLayout from '@/layouts/dashboard.layout';
import {EventClickArg} from '@fullcalendar/core';
import {Box} from '@mui/material';
import dayjs from 'dayjs';
import React, {useEffect, useState} from 'react';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './schedule.style.css';
import {getAllVolunteerRequestSessionAdmin} from '@/api/volunteerSession.api';

export const SchedulePage: React.FC = () => {
  const [modalDetail, setModalDetail] = useState<ISessionModalProps>({
    show: false,
    isEdit: true,
    event: null,
    onClose: () => setHideModalConfirm(),
    onConfirm: () => null,
  });
  const [modalConfirm, setModalConfirm] = useState<IModalConfirmProps>({
    show: false,
    title: '',
    description: '',
    color: 'info',
    onClose: () => hideModalConfirm(),
  });
  const [listEvents, setListEvents] = useState<ICalendarGeneratorEvent[]>([]);
  const [scheduleYear, setScheduleYear] = useState(dayjs().format('YYYY'));
  const {getAllSessionQuery, generateScheduleMutation} = useSchedule();
  // const sessionQuery = getAllSessionQuery(parseInt(scheduleYear));
  const scheduleMutation = generateScheduleMutation({
    onSuccess: () => {
      setModalConfirm({
        ...modalConfirm,
        show: true,
        title: 'Success',
        description: 'Schedule has been submitted',
        color: 'success',
      });
      getListEvent();
    },
    onError: (err) => {
      setModalConfirm({
        ...modalConfirm,
        show: true,
        title: 'Error',
        description: 'Internal server error',
        color: 'error',
      });
    },
  });

  // useEffect(() => {
  //   setListEvents(sessionQuery.data || []);
  // }, [sessionQuery.data]);

  const hideModalConfirm = () => {
    setModalConfirm({...modalConfirm, show: false});
  };

  useEffect(() => {
    getListEvent();
  }, []);

  const getListEvent = () => {
    // TODO: should move this function to another custom hook with react query
    getAllVolunteerRequestSessionAdmin({year: parseInt(scheduleYear)}).then((res) => {
      let eventCalendar: ICalendarGeneratorEvent[] = res.volunteerSessions.map((item) => {
        let tmpEvent: ICalendarGeneratorEvent = {
          id: Math.floor(Math.random() * 100) + 1 + dayjs().valueOf().toString(),
          sfId: item.Id,
          title: item.Session_Title__c,
          start: dayjs(item.Session_Date__c).format('YYYY-MM-DD'),
          end: dayjs(item.Session_Date__c).format('YYYY-MM-DD'),
          className: dayjs(item.Session_Date__c).isBefore(dayjs().format('YYYY-MM-DD'))
            ? ['neutral', 'border'] //TODO: this is only example for filling the border, if you want to change the border color, need to look into BigCalendar.module.scss
            : item.Volunteer_Type__c === 'Individual'
            ? ['info', 'border']
            : ['success', 'border'],
          startDate: dayjs(item.Session_Date__c).format('YYYY-MM-DD'),
          endDate: dayjs(item.Session_Date__c).format('YYYY-MM-DD'),
          volunteerType: item.Volunteer_Type__c === 'Individual' ? 'individual' : 'organisation',
          assignedVolunteer: item.Number_of_Sign_ups__c,
          maxVolunteer: item.Max_Num_of_Volunteer__c,
          scheduleType: item.Session_Type__c === 'Regular' ? 'regular' : 'adhoc',
          numberSession: item.Session_Shift__c === 'Morning' ? 0 : 1,
          sessionType: item.Session_Shift__c === 'Morning' ? 'morning' : 'afternoon',
          timeStart: dayjs(item.Start_Time__c, 'HH:mm:ss'),
          timeEnd: dayjs(item.End_Time__c, 'HH:mm:ss'),
          location: item.Volunteer_Location__c as locationType,
          // TODO: should have postal code and unit number in the response props
          // postalCode?: string;
          // unitNumber?: string;
          companyName: item.Company_Name__c || '',
          contactName: item.Name_Booked_by__c || '',
        };
        return tmpEvent;
      });
      setListEvents(eventCalendar);
    });
  };

  const setHideModalConfirm = () => {
    setModalDetail({
      ...modalDetail,
      show: false,
    });
  };

  const handleClickDate = (e: EventClickArg) => {
    let _event: ICalendarGeneratorEvent = {
      ...e.event._def.extendedProps,
    } as ICalendarGeneratorEvent;
    _event.title = e.event._def.title;
    _event.id = e.event.id;
    setModalDetail({
      ...modalDetail,
      event: _event,
      show: true,
      isEdit: _event?.sfId ? false : true,
    });
  };

  const onClearEvent = () => {
    let tmpListEvent = [...listEvents].filter((ar) => ar.sfId !== undefined);
    setListEvents(tmpListEvent);
  };

  const onDeleteEvent = () => {
    if (modalDetail.event) {
      setModalDetail({
        ...modalDetail,
        event: null,
        show: false,
        isEdit: false,
      });
      let tmpListEvent = [...listEvents].filter((ar) => ar.id !== modalDetail.event?.id);
      setListEvents(tmpListEvent);
    }
  };

  const onSaveEvent = (item: ICalendarGeneratorEvent) => {
    if (modalDetail.event) {
      setModalDetail({
        ...modalDetail,
        event: null,
        show: false,
        isEdit: false,
      });
      let tmpListEvent = [...listEvents].map((event) => {
        if (event.id === item.id) {
          event = item;
        }
        return event;
      });
      setListEvents(tmpListEvent);
    }
  };

  const onSubmitEvent = () => {
    let generatedEvent: ISubmitGeneratedEvent[] = [...listEvents]
      .filter((ar) => ar.sfId === undefined)
      .map((item) => {
        let tmpItem: ISubmitGeneratedEvent = {
          activityType: 'Food Packing',
          assignedVolunteer: item.assignedVolunteer,
          backgroundColor: 'black',
          date: item.startDate,
          end_time: dayjs(item.timeEnd).format('hh:mm A'),
          id: Number(item.id),
          numberSession: item.numberSession.toString(),
          numberVolunteer: item.maxVolunteer.toString(),
          schedule_type: item.scheduleType,
          session: item.sessionType,
          start_time: dayjs(item.timeStart).format('hh:mm A'),
          textColor: 'white',
          title: item.title,
          volunteer_loc: item.location,
          volunteer_type: item.volunteerType,
        };
        return tmpItem;
      });
    if (generatedEvent.length === 0) {
      setModalConfirm({
        ...modalConfirm,
        show: true,
        title: 'Warning',
        description: 'Please create event first',
        color: 'warning',
      });
    } else {
      scheduleMutation.mutate({sessions: generatedEvent});
    }
  };

  const handleOpenDetailSf = (sfId?: string) => {
    if (sfId) {
      window.open(`${import.meta.env.VITE_SF_URL}${sfId}`);
    }
  };

  return (
    <Box component='main'>
      <DashboardLayout title='Schedule' subtitle='Track and manage volunteers'>
        <DashboardLayout.Content>
          <ScheduleGenerator
            listEvent={listEvents}
            setListEvent={(val) => setListEvents(val)}
            onClearEvent={onClearEvent}
            onSubmitEvent={onSubmitEvent}
            isLoading={scheduleMutation.isLoading}
          />
          <Box sx={{'& .fc.fc-media-screen': {minHeight: {xs: '520px', md: 'auto'}}}}>
            <BigCalendar
              onChangeDate={(val) => setScheduleYear(val.split('-')[0])}
              events={listEvents}
              onClickEvent={handleClickDate}
            />
          </Box>
          <ModalSessionDetail
            isEdit={modalDetail.isEdit}
            show={modalDetail.show}
            onClose={modalDetail.onClose}
            event={modalDetail.event}
            listEvent={listEvents}
            onConfirm={() => handleOpenDetailSf(modalDetail.event?.sfId)}
            onDelete={onDeleteEvent}
            onSave={onSaveEvent}
          />
          <ModalConfirm
            show={modalConfirm.show}
            title={modalConfirm.title}
            description={modalConfirm.description}
            color={modalConfirm.color}
            onClose={modalConfirm.onClose}
          />
        </DashboardLayout.Content>
      </DashboardLayout>
    </Box>
  );
};
