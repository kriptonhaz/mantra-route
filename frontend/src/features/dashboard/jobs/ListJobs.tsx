import {useState} from 'react';
import {Box, Button, Divider, Stack} from '@mui/material';
import {useCompanyHook} from '@/hooks/use-company.hook';
import Select from '@/components/Select';
import Render from '@/components/Render';
import {EmptyStateBox} from '@/components/EmptyState/EmptyState';
import {useJobsHook} from '@/hooks/use-jobs.hooks';
import ModalAddJobs from './ModalAddJobs';

const ListJobs: React.FC = () => {
  const {getCompanyQuery} = useCompanyHook();
  const {getJobsCompanyQuery} = useJobsHook();
  const [selectedCompany, setSelectedCompany] = useState<string>('');
  const [showModalAddJobs, setShowModalAddJobs] = useState(false);
  const {data: dataListCompany} = getCompanyQuery();
  const {data: dataJobsCompany} = getJobsCompanyQuery(selectedCompany);
  return (
    <Box>
      <Stack
        direction={{xs: 'column', md: 'row'}}
        justifyContent={'space-between'}
        alignItems={{xs: 'flex-start', md: 'center'}}
      >
        <Stack direction='row' spacing={2} sx={{width: '50vw'}} alignItems={'center'}>
          <Select
            label='Company'
            sx={{width: '250px'}}
            onChange={(event) => {
              setSelectedCompany(event.target.value as string);
            }}
            value={selectedCompany}
            options={
              dataListCompany !== undefined
                ? dataListCompany.data.map((item, index) => {
                    let tmpData = {
                      label: item.name,
                      value: item.id,
                    };
                    return tmpData;
                  })
                : []
            }
          />
          <Button
            onClick={() => setShowModalAddJobs(true)}
            sx={{
              minHeight: '55px',
            }}
            disabled={selectedCompany === ''}
          >
            Create Jobs
          </Button>
        </Stack>
      </Stack>
      <Divider sx={{my: 6}} />
      <Render in={true}>
        <EmptyStateBox title='No jobs found' message='Let’s create Jobs!' />
      </Render>
      <ModalAddJobs
        show={showModalAddJobs}
        onClose={() => setShowModalAddJobs(false)}
        companyId={selectedCompany}
      />
    </Box>
  );
};

export default ListJobs;
