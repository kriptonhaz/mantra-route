import {ICalendarEvent} from '@/components/Calendar';
import {useProgrammeEventsHook} from '@/hooks/use-programmeEvents.hooks';
import {useVolunteerRequestHook} from '@/hooks/use-volunteerRequest.hooks';
import {ProgrammeEventRequestType} from '@/interface/programmeEvents.interface';
import {VrRequestType} from '@/interface/volunteerRequest.interface';
import dayjs from 'dayjs';
import {useEffect, useState} from 'react';

const useCalendar = () => {
  const [listEvents, setListEvents] = useState<ICalendarEvent[]>([]);
  const [PEpropsRequest, setPEpropsRequest] = useState<ProgrammeEventRequestType>({
    page: 1,
    startDate: dayjs().startOf('year').format('YYYY-MM-DD'),
    endDate: dayjs().endOf('year').format('YYYY-MM-DD'),
  });
  const [VRpropsRequest, setVRpropsRequest] = useState<VrRequestType>({
    page: 1,
    limit: 100,
  });
  const {listProgrammeEvents} = useProgrammeEventsHook();
  const {listVolunteerRequest, listVolunteerRequestSessionCalendar} = useVolunteerRequestHook();
  const {data: dataProgrammeEvent, isLoading: isLoadingPE} = listProgrammeEvents(PEpropsRequest);
  const {data: dataVolunteerRequest, isLoading: isLoadingVR} = listVolunteerRequest(VRpropsRequest);
  const {data: dataVolunteerSession} = listVolunteerRequestSessionCalendar();

  useEffect(() => {
    let combinedMappedEvents: ICalendarEvent[] = [];
    if (dataProgrammeEvent) {
      const mappedEventsPE: ICalendarEvent[] = dataProgrammeEvent.programmeDatas.map((item) => {
        const isAfter = dayjs().isAfter(dayjs(item.End_Date_Time__c, 'day'));
        return {
          id: item.Id,
          title: item.Name,
          start: dayjs(item.Start_Date_Time__c).format('YYYY-MM-DD'),
          end: dayjs(item.Start_Date_Time__c).format('YYYY-MM-DD'),
          className: isAfter ? 'neutral' : 'info',
          href: `/dashboard/upcoming/${item.Id}`,
        };
      });
      combinedMappedEvents = [...combinedMappedEvents, ...mappedEventsPE];
    }
    if (dataVolunteerSession) {
      const mapsEventVrSessionRegistered: ICalendarEvent[] = dataVolunteerSession.registred.map(
        (item) => {
          const isAfter = dayjs().isAfter(item.Session_Date__c, 'day');
          return {
            id: item.Id,
            title: item.Session_Title__c,
            start: item.Session_Date__c,
            end: item.Session_Date__c,
            className: isAfter ? ['neutral', 'border'] : ['primary', 'border'],
            href: `/dashboard/volunteer/${item.Id}/assignment`,
          };
        },
      );
      combinedMappedEvents = [...combinedMappedEvents, ...mapsEventVrSessionRegistered];
    }
    if (dataVolunteerRequest) {
      const mapsEventVrRegular: ICalendarEvent[] = dataVolunteerRequest.volunteerRequests
        .filter((ar) => ar.RecordType.Name === 'Regular')
        .map((item) => {
          const isAfter = dayjs().isAfter(item.Start_Date__c, 'day');
          return {
            id: item.Id,
            title: item.Name,
            start: item.Start_Date__c,
            end: item.Start_Date__c,
            className: isAfter ? 'neutral' : 'primary',
            href: `/dashboard/volunteer/${item.Id}`,
          };
        });
      combinedMappedEvents = [...combinedMappedEvents, ...mapsEventVrRegular];
    }
    setListEvents(combinedMappedEvents);
  }, [dataVolunteerSession, dataVolunteerRequest]);

  const updateYear = (year: string) => {
    setPEpropsRequest((prev) => ({
      ...prev,
      startDate: `${year}-01-01`,
      endDate: dayjs(`${year}-01-01`).add(1, 'year').format('YYYY-MM-DD'),
    }));
    setVRpropsRequest((prev) => ({
      ...prev,
      startDate: `${year}-01-01`,
      endDate: dayjs(`${year}-01-01`).add(1, 'year').format('YYYY-MM-DD'),
    }));
  };

  return {updateYear, listEvents, isLoading: isLoadingPE && isLoadingVR};
};

export default useCalendar;
