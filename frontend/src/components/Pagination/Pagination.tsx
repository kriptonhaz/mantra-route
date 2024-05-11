import {Box, Button, Pagination as MuiPagination} from '@mui/material';
import React, {useId} from 'react';
import FeatherIcon from '../FeatherIcon/FeatherIcon';
import classes from './Pagination.module.scss';

export interface PaginationProps {
  onNext: () => void;
  onPrev: () => void;
  page: number;
  onChange: (val: number) => void;
  count: number;
  defaultPage?: number;
}
const Pagination: React.FC<PaginationProps> = ({
  onNext,
  onPrev,
  page,
  count,
  onChange,
  defaultPage = 1,
}) => {
  const id = useId();

  return (
    <Box id={id} className={classes.Container}>
      <Button
        disabled={page === 1}
        variant='outlined'
        color='inherit'
        startIcon={<FeatherIcon icon='arrow-left' />}
        onClick={onPrev}
      >
        Previous
      </Button>
      <MuiPagination
        onChange={(_, page) => onChange(page)}
        count={count}
        shape='rounded'
        page={page}
        defaultPage={defaultPage}
        siblingCount={0}
        boundaryCount={2}
        hideNextButton={true}
        hidePrevButton={true}
      />
      <Button
        disabled={page === count}
        variant='outlined'
        color='inherit'
        endIcon={<FeatherIcon icon='arrow-right' />}
        onClick={onNext}
      >
        Next
      </Button>
    </Box>
  );
};

export default Pagination;
