import {Modal} from '@/components/Modal';
import {Box, Button, CircularProgress, Typography} from '@mui/material';
import React from 'react';
import UploadFile from '@/components/UploadFile';
import Papa from 'papaparse';
import {useForm, Controller} from 'react-hook-form';
import * as Yup from 'yup';
import ErrorMessage from '@/components/ErrorMessage';
import {yupResolver} from '@hookform/resolvers/yup';
import Render from '@/components/Render';
import FeatherIcon from '@/components/FeatherIcon/FeatherIcon';
import {useQueryClient} from '@tanstack/react-query';
import {IOutlets, IOutletsCsv} from '@/interface/outlets.interface';
import {useOutletsHook} from '@/hooks/use-outlets.hook';

export interface IModalAddOutletsProps {
  show: boolean;
  onClose: () => void;
}

interface IUploadForm {
  csvFile: File;
}

const validationSchema = Yup.object().shape({
  csvFile: Yup.mixed().required(),
});

const ModalAddOutlets: React.FC<IModalAddOutletsProps> = ({show, onClose}) => {
  const queryClient = useQueryClient();
  const {postBulkAddOutletsCompanyMutation} = useOutletsHook();
  const {
    handleSubmit,
    control,
    reset,
    formState: {errors},
  } = useForm<IUploadForm>({
    mode: 'onChange',
    // @ts-ignore
    resolver: yupResolver(validationSchema),
  });

  const mutation = postBulkAddOutletsCompanyMutation({
    onSuccess: () => {
      queryClient.invalidateQueries(['outlets', 'list', import.meta.env.VITE_COMPANY_ID]);
      onClose();
      reset();
    },
    onError(err) {
      console.log(err);
    },
  });

  const onSubmit = handleSubmit((data) => {
    // TODO: will be replaced after being wired with auth
    const companyId = import.meta.env.VITE_COMPANY_ID;
    Papa.parse(data.csvFile as File, {
      complete: (result) => {
        const csvData: IOutletsCsv[] = result.data as IOutletsCsv[];
        // @ts-ignore
        const payload: IOutlets[] = csvData.map((item) => {
          return {
            outlet_id: item['Outlet ID'],
            name: item.Outlet,
            must_visit_day: item['must visit day'],
            cycle: parseInt(item.cycle),
            interval: parseInt(item['Interval(jeda kunjungan)']),
            frontliner_external_id: item['ID Frontliner'],
            off_day: item['toko tutup'],
            latitude: parseFloat(item.Latitude),
            longitude: parseFloat(item.Longitude),
            company: import.meta.env.VITE_COMPANY_ID,
          };
        });
        mutation.mutate(payload);
      },
      header: true, // Set to true if your CSV file has headers
    });
  });

  return (
    <Modal open={show} onClose={onClose} containerProps={{sx: {maxWidth: '600px !important'}}}>
      <form onSubmit={onSubmit}>
        <Modal.Header title='Upload File' subtitle='Add Outlets' divider />
        <Modal.Body>
          <Box>
            <Typography color='text.secondary' mb={2}>
              Select a file
            </Typography>
            <Controller
              control={control}
              name='csvFile'
              render={({field: {onChange}}) => (
                <UploadFile
                  description='CSV (max. 2 MB)'
                  onChange={(file) => {
                    onChange(file as File);
                  }}
                />
              )}
            />
            <ErrorMessage message={errors?.csvFile?.message} />
            <Button
              href='/outlets-template.csv'
              startIcon={<FeatherIcon icon='download' />}
              variant='outlined'
              color='inherit'
              sx={{background: '#fff', mt: 4}}
            >
              Download Template
            </Button>
          </Box>
        </Modal.Body>
        <Modal.Footer divider onCancel={onClose}>
          <Button type='submit' disabled={mutation.isLoading}>
            Upload
            <Render in={mutation.isLoading}>
              <CircularProgress sx={{ml: 2}} />
            </Render>
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
  );
};

export default ModalAddOutlets;
