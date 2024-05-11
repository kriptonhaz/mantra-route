import {PaginationProps} from '@/components/Pagination/Pagination';
import {useState} from 'react';

export interface usePaginationInterface {
  count?: number;
  page?: number;
}

const usePagination = ({count = 10, page = 1}: usePaginationInterface) => {
  const [paginationState, setPaginationState] = useState<PaginationProps>({
    count: count,
    page: page,
    onPrev: () => {
      setPaginationState((prevState: PaginationProps) => {
        return {
          ...paginationState,
          page: prevState.page - 1,
        };
      });
    },
    onNext: () => {
      setPaginationState((prevState: PaginationProps) => {
        return {
          ...paginationState,
          page: prevState.page + 1,
        };
      });
    },
    onChange: (val) =>
      setPaginationState({
        ...paginationState,
        page: val,
      }),
  });

  return paginationState;
};

export default usePagination;
