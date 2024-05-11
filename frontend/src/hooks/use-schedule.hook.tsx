import {
  getAllVolunteerRequestSessionAdmin,
  submitGenerateSession,
} from '@/api/volunteerSession.api';
import {ICalendarGeneratorEvent} from '@/components/Calendar';
import {locationType} from '@/components/Form/ScheduleGenerator';
import {
  IListVolunteerSessionResponse,
  ISubmitScheduleForm,
} from '@/interface/volunteerSession.interface';
import useErrorStore from '@/store/use-error.store';
import {useMutation, useQuery} from '@tanstack/react-query';
import {AxiosError} from 'axios';
import dayjs from 'dayjs';

const useSchedule = () => {
  const errorStore = useErrorStore((state) => state);

  const getAllSessionQuery = (year: number) =>
    useQuery(
      ['schedule', 'session', {year}],
      () => getAllVolunteerRequestSessionAdmin({year: year}),
      {
        enabled: !!year,
        select: (res) => {
          let listEventCalendar: ICalendarGeneratorEvent[] = res.volunteerSessions.map((item) => {
            let event: ICalendarGeneratorEvent = {
              id: Math.floor(Math.random() * 100) + 1 + dayjs().valueOf().toString(),
              sfId: item.Id,
              title: item.Session_Title__c,
              start: dayjs(item.Session_Date__c).format('YYYY-MM-DD'),
              end: dayjs(item.Session_Date__c).format('YYYY-MM-DD'),
              className: dayjs(item.Session_Date__c).isBefore(dayjs().format('YYYY-MM-DD'))
                ? 'neutral'
                : item.Volunteer_Type__c === 'Individual'
                ? 'info'
                : 'success',
              startDate: dayjs(item.Session_Date__c).format('YYYY-MM-DD'),
              endDate: dayjs(item.Session_Date__c).format('YYYY-MM-DD'),
              volunteerType:
                item.Volunteer_Type__c === 'Individual' ? 'individual' : 'organisation',
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
            };
            return event;
          });

          return listEventCalendar;
        },
      },
    );

  const generateScheduleMutation = (params: {
    onSuccess?: (
      data: IListVolunteerSessionResponse,
      variables: ISubmitScheduleForm,
      context: unknown,
    ) => void;
    onError?: (error: unknown, variables: ISubmitScheduleForm, context: unknown) => unknown;
  }) =>
    useMutation({
      mutationKey: ['schedule', 'session', 'generate'],
      mutationFn: submitGenerateSession,
      onSuccess: (data, variables, context) => {
        if (params.onSuccess) {
          params.onSuccess(data, variables, context);
        }
      },
      onError: (err: AxiosError | Error, variables, context) => {
        if (err instanceof AxiosError) {
          const statusCode = err.status || 0;
          if (400 <= statusCode && statusCode < 500 && params.onError) {
            return params.onError(err as AxiosError, variables, context);
          }
        }
        errorStore.open(err);
      },
    });

  return {getAllSessionQuery, generateScheduleMutation};
};

export default useSchedule;
