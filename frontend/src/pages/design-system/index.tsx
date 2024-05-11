import Pagination from '@/components/Pagination/Pagination';
import usePagination from '@/hooks/use-pagination.hook';
import {Box} from '@mui/material';
import React from 'react';

const DesignSystemPage: React.FC = () => {
  const pagination = usePagination({});

  return (
    <Box sx={{width: '100vw'}}>
      <Pagination {...pagination} />
    </Box>
  );
};

export default DesignSystemPage;
