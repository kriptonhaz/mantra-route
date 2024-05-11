import {getListAttendances} from '@/api/attendance.api';
import {ListAttendanceRequestType} from '@/interface/attendance.interface';
import useTokenStore from '@/store/use-token.store';
import {useQuery, useQueryClient} from '@tanstack/react-query';
import {useEffect, useState} from 'react';

const useAttendances = (props: ListAttendanceRequestType) => {
  const queryClient = useQueryClient();
  const token = useTokenStore((state) => state.accessToken);
  const [pagination, setPagination] = useState({
    page: props.page || 0,
    limit: props.limit || 1,
    count: 1,
    onPrev: () => {
      setPagination((prevState) => {
        return {
          ...prevState,
          page: (prevState.page ?? 1) - 1,
        };
      });
    },
    onNext: () => {
      setPagination((prevState) => {
        return {
          ...prevState,
          page: (prevState.page ?? 1) + 1,
        };
      });
    },
    onChange: (val: number) =>
      setPagination((prevState) => ({
        ...prevState,
        page: val,
      })),
  });
  const query = useQuery(['portal', 'attendance', props], () => getListAttendances(props), {
    enabled: !!token,
    keepPreviousData: true,
    staleTime: 5000,
  });

  useEffect(() => {
    if (!query.isPreviousData && (query.data?.metaData.totalPages || 0) <= (props.page || 0)) {
      queryClient.prefetchQuery({
        queryKey: ['portal', 'attendance', props],
        queryFn: () => getListAttendances(props),
      });
    }
  }, [props, query.data, query.isPreviousData, pagination]);

  useEffect(() => {
    if (query.data) {
      setPagination({
        ...pagination,
        page: query.data.metaData.currentPage,
        count: query.data.metaData.totalPages,
      });
    }
  }, [query.data]);

  return {query, pagination};
};

export default useAttendances;
