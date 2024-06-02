import {Modal} from '@/components/Modal';
import {useVolunteerSessionHook} from '@/hooks/use-volunteerSession.hooks';
import {Box, Button, CircularProgress, Typography} from '@mui/material';
import React from 'react';
import UploadFile from '@/components/UploadFile';
import Papa from 'papaparse';
import {useForm, Controller} from 'react-hook-form';
import * as Yup from 'yup';
import ErrorMessage from '@/components/ErrorMessage';
import {yupResolver} from '@hookform/resolvers/yup';
import {
  IAssignedVolunteerCSVFormat,
  IBulkInsertAssignedVolunteerPayload,
} from '@/interface/volunteerSession.interface';
import {useParams} from 'react-router-dom';
import Render from '@/components/Render';

export interface IModalBulkInsertVolunteerProps {
  show: boolean;
  onClose: () => void;
}

interface IUploadForm {
  csvFile: File;
}

const validationSchema = Yup.object().shape({
  csvFile: Yup.mixed().required(),
});

const ModalBulkInsert: React.FC<IModalBulkInsertVolunteerProps> = ({show, onClose}) => {
  const {bulkInsertMutation} = useVolunteerSessionHook();
  const {sessionId} = useParams();
  const {
    handleSubmit,
    control,
    reset,
    setError,
    formState: {errors},
  } = useForm<IUploadForm>({
    mode: 'onChange',
    // @ts-ignore
    resolver: yupResolver(validationSchema),
  });

  const mutation = bulkInsertMutation({
    onSuccess: () => {
      onClose();
      reset();
    },
    onError(err) {
      setError('csvFile', {message: err.response?.data?.error});
    },
  });

  const onSubmit = handleSubmit((data) => {
    Papa.parse(data.csvFile as File, {
      complete: (result) => {
        const finalData: IAssignedVolunteerCSVFormat[] = result.data.filter((e) => {
          const item = e as IAssignedVolunteerCSVFormat;
          return !!item.Fullname;
        }) as IAssignedVolunteerCSVFormat[];
        const payload: IBulkInsertAssignedVolunteerPayload = {
          sessionId: sessionId || '',
          upload: finalData,
          update: [],
        };
        mutation.mutate(payload);
      },
      header: true, // Set to true if your CSV file has headers
    });
  });

  return (
    <Modal open={show} onClose={onClose} containerProps={{sx: {maxWidth: '600px !important'}}}>
      <form onSubmit={onSubmit}>
        <Modal.Header title='Upload File' subtitle='Add Volunteer' divider />
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

export default ModalBulkInsert;
