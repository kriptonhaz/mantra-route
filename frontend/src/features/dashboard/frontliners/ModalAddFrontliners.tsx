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
import {IFrontliner, IFrontlinerCsv} from '@/interface/frontliners.interface';
import {useFrontlinersHook} from '@/hooks/use-frontliners.hook';
import {useQueryClient} from '@tanstack/react-query';

export interface IModalAddFrontlinersProps {
  show: boolean;
  onClose: () => void;
}

interface IUploadForm {
  csvFile: File;
}

const validationSchema = Yup.object().shape({
  csvFile: Yup.mixed().required(),
});

const ModalAddFrontliners: React.FC<IModalAddFrontlinersProps> = ({show, onClose}) => {
  const queryClient = useQueryClient();
  const {postAddFrontlinerCompanyMutation} = useFrontlinersHook();
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

  const mutation = postAddFrontlinerCompanyMutation({
    onSuccess: () => {
      queryClient.invalidateQueries(['frontliner', 'list', import.meta.env.VITE_COMPANY_ID]);
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
        const csvData: IFrontlinerCsv[] = result.data as IFrontlinerCsv[];
        const payload: IFrontliner[] = csvData.map((item) => {
          return {
            frontliner_id: item['Frontliner ID'],
            name: item.Name,
            company: companyId,
            position: item.Position,
            id_project: item['ID Project'],
            latitude: parseFloat(item.Latitude),
            longitude: parseFloat(item.Longitude),
            max_visit_per_day: parseInt(item['Max Visit Per Day']),
            off_day: item['Off Day'],
            channel_outlet: item['Channel Outlet'],
            max_travel_time: parseInt(item['Max Travel Time']),
            max_duration_visit: parseInt(item['Max Duration Visit']),
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
        <Modal.Header title='Upload File' subtitle='Add Frontliner' divider />
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
              href='/frontliners-template.csv'
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

export default ModalAddFrontliners;
