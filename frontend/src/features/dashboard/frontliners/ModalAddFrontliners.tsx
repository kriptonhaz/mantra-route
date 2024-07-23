import {Modal} from '@/components/Modal';
import {
  Box,
  Button,
  CircularProgress,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
  Select,
  MenuItem,
} from '@mui/material';
import React, {useEffect} from 'react';
import UploadFile from '@/components/UploadFile';
import Papa from 'papaparse';
import {useForm, Controller} from 'react-hook-form';
import * as Yup from 'yup';
import ErrorMessage from '@/components/ErrorMessage';
import {yupResolver} from '@hookform/resolvers/yup';
import Render from '@/components/Render';
import FeatherIcon from '@/components/FeatherIcon/FeatherIcon';
import {
  IFormAddFrontliner,
  IFrontliner,
  IFrontlinerCsv,
  ModeAddEnum,
  TypeModeAdd,
} from '@/interface/frontliners.interface';
import {useFrontlinersHook} from '@/hooks/use-frontliners.hook';
import {useQueryClient} from '@tanstack/react-query';
import InputFloating from '@/components/InputFloating';
import {OffDayFrontliner} from '@/assets/data/frontliner';

export interface IModalAddFrontlinersProps {
  show: boolean;
  companyId: string;
  onClose: () => void;
}

interface IUploadForm {
  csvFile: File;
}

const validationSchema = Yup.object().shape({
  modeAdd: Yup.string()
    .oneOf(Object.keys(ModeAddEnum) as TypeModeAdd[])
    .required(),
  frontliner_id: Yup.string().when('modeAdd', {
    is: 'single',
    then: (schema) => schema.required('This field is required'),
    otherwise: (schema) => schema.nullable(),
  }),
  name: Yup.string().when('modeAdd', {
    is: 'single',
    then: (schema) => schema.required('This field is required'),
    otherwise: (schema) => schema.nullable(),
  }),
  company: Yup.string().required('This field is required'),
  position: Yup.string().when('modeAdd', {
    is: 'single',
    then: (schema) => schema.required('This field is required'),
    otherwise: (schema) => schema.nullable(),
  }),
  id_project: Yup.string().when('modeAdd', {
    is: 'single',
    then: (schema) => schema.required('This field is required'),
    otherwise: (schema) => schema.nullable(),
  }),
  latitude: Yup.number().when('modeAdd', {
    is: 'single',
    then: (schema) =>
      schema
        .transform((value) => (Number.isNaN(value) ? null : value))
        .nullable()
        .required('This field is required'),
    otherwise: (schema) =>
      schema
        .transform((value) => (Number.isNaN(value) ? null : value))
        .nullable()
        .notRequired(),
  }),
  longitude: Yup.number().when('modeAdd', {
    is: 'single',
    then: (schema) =>
      schema
        .transform((value) => (Number.isNaN(value) ? null : value))
        .nullable()
        .required('This field is required'),
    otherwise: (schema) =>
      schema
        .transform((value) => (Number.isNaN(value) ? null : value))
        .nullable()
        .notRequired(),
  }),
  max_visit_per_day: Yup.number().when('modeAdd', {
    is: 'single',
    then: (schema) =>
      schema
        .transform((value) => (Number.isNaN(value) ? null : value))
        .nullable()
        .required('This field is required'),
    otherwise: (schema) =>
      schema
        .transform((value) => (Number.isNaN(value) ? null : value))
        .nullable()
        .notRequired(),
  }),
  off_day: Yup.string().when('modeAdd', {
    is: 'single',
    then: (schema) => schema.required('This field is required'),
    otherwise: (schema) => schema.nullable(),
  }),
  channel_outlet: Yup.string().when('modeAdd', {
    is: 'single',
    then: (schema) => schema.required('This field is required'),
    otherwise: (schema) => schema.nullable(),
  }),
  max_travel_time: Yup.number().when('modeAdd', {
    is: 'single',
    then: (schema) =>
      schema
        .transform((value) => (Number.isNaN(value) ? null : value))
        .nullable()
        .required('This field is required'),
    otherwise: (schema) =>
      schema
        .transform((value) => (Number.isNaN(value) ? null : value))
        .nullable()
        .notRequired(),
  }),
  max_duration_visit: Yup.number().when('modeAdd', {
    is: 'single',
    then: (schema) =>
      schema
        .transform((value) => (Number.isNaN(value) ? null : value))
        .nullable()
        .required('This field is required'),
    otherwise: (schema) =>
      schema
        .transform((value) => (Number.isNaN(value) ? null : value))
        .nullable()
        .notRequired(),
  }),
  csvFile: Yup.mixed().when('modeAdd', {
    is: 'bulk',
    then: (schema) => schema.required('This field is required'),
    otherwise: (schema) => schema.nullable(),
  }),
});

const ModalAddFrontliners: React.FC<IModalAddFrontlinersProps> = ({show, onClose, companyId}) => {
  const queryClient = useQueryClient();
  const {postAddFrontlinerSingleCompanyMutation, postAddFrontlinerBulkCompanyMutation} =
    useFrontlinersHook();
  const {
    handleSubmit,
    control,
    reset,
    setValue,
    watch,
    register,
    formState: {errors},
  } = useForm<IFormAddFrontliner>({
    mode: 'onChange',
    defaultValues: {
      modeAdd: 'single',
      off_day: '',
      company: '',
    },
    // @ts-ignore
    resolver: yupResolver(validationSchema),
  });

  useEffect(() => {
    if (!show) {
      reset();
    } else {
      setValue('company', companyId);
    }
  }, [show]);

  useEffect(() => {
    console.log(errors);
  }, [errors]);

  const mutationSingle = postAddFrontlinerSingleCompanyMutation({
    onSuccess: () => {
      queryClient.invalidateQueries(['frontliner', 'list', companyId]);
      onClose();
      reset();
    },
    onError(err) {
      console.log(err);
    },
  });

  const mutationBulk = postAddFrontlinerBulkCompanyMutation({
    onSuccess: () => {
      queryClient.invalidateQueries(['frontliner', 'list', companyId]);
      onClose();
      reset();
    },
    onError(err) {
      console.log(err);
    },
  });

  const onSubmit = handleSubmit((data) => {
    if (data.modeAdd === 'single') {
      mutationSingle.mutate(data);
    } else {
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
          mutationBulk.mutate(payload);
        },
        header: true, // Set to true if your CSV file has headers
      });
    }
  });

  const handleChangeModeAdd = (event: React.MouseEvent<HTMLElement>) => {
    const eTarget = event.target as React.ButtonHTMLAttributes<HTMLInputElement>;
    let tmpModeAdd = eTarget.value as 'single' | 'bulk';
    setValue('modeAdd', tmpModeAdd);
  };

  return (
    <Modal open={show} onClose={onClose} containerProps={{sx: {maxWidth: '600px !important'}}}>
      <form onSubmit={onSubmit}>
        <Modal.Header title='Add Frontliner' subtitle='' divider />
        <Modal.Body>
          <ToggleButtonGroup
            color='primary'
            value={watch('modeAdd')}
            exclusive
            onChange={handleChangeModeAdd}
            aria-label='Platform'
            fullWidth
          >
            <ToggleButton value='single' fullWidth>
              Single
            </ToggleButton>
            <ToggleButton value='bulk' fullWidth>
              Bulk
            </ToggleButton>
          </ToggleButtonGroup>
          <Divider sx={{marginY: '15px'}} />
          {watch('modeAdd') === 'single' ? (
            <Stack rowGap={2}>
              <Stack direction={'row'} alignItems={'center'} spacing={3}>
                <InputFloating
                  label='Frontliner ID'
                  {...register('frontliner_id')}
                  error={!!errors?.frontliner_id?.message}
                  helperText={errors?.frontliner_id?.message}
                />
                <InputFloating
                  label='Name'
                  {...register('name')}
                  error={!!errors?.name?.message}
                  helperText={errors?.name?.message}
                />
              </Stack>
              <Stack direction={'row'} alignItems={'center'} spacing={3}>
                <InputFloating
                  label='Position'
                  {...register('position')}
                  error={!!errors?.position?.message}
                  helperText={errors?.position?.message}
                />
                <InputFloating
                  label='ID Project'
                  {...register('id_project')}
                  error={!!errors?.id_project?.message}
                  helperText={errors?.id_project?.message}
                />
              </Stack>
              <Stack direction={'row'} alignItems={'center'} spacing={3}>
                <InputFloating
                  label='Latitude'
                  type='number'
                  step='any'
                  {...register('latitude')}
                  error={!!errors?.latitude?.message}
                  helperText={errors?.latitude?.message}
                />
                <InputFloating
                  label='Longitude'
                  type='number'
                  step='any'
                  {...register('longitude')}
                  error={!!errors?.longitude?.message}
                  helperText={errors?.longitude?.message}
                />
              </Stack>

              <Stack direction={'row'} alignItems={'center'} spacing={3}>
                <InputFloating
                  label='Max Visit Per Day'
                  type='number'
                  {...register('max_visit_per_day')}
                  error={!!errors?.max_visit_per_day?.message}
                  helperText={errors?.max_visit_per_day?.message}
                />
                <FormControl fullWidth>
                  <InputLabel id='demo-simple-select-helper-label'>Off Day</InputLabel>
                  <Controller
                    control={control}
                    name='off_day'
                    render={({field: {onChange, onBlur, value, ref}}) => (
                      <Select
                        value={value}
                        label='Off Day'
                        onChange={(e) => {
                          const target = e.target as HTMLInputElement;
                          onChange(target.value);
                        }}
                      >
                        {OffDayFrontliner.map((item) => (
                          <MenuItem value={item.value}>{item.label}</MenuItem>
                        ))}
                      </Select>
                    )}
                  />
                </FormControl>
              </Stack>

              <Stack direction={'row'} alignItems={'center'} spacing={3}>
                <InputFloating
                  label='Channel Outlet'
                  {...register('channel_outlet')}
                  error={!!errors?.channel_outlet?.message}
                  helperText={errors?.channel_outlet?.message}
                />
                <InputFloating
                  label='Max Travel Time'
                  type='number'
                  {...register('max_travel_time')}
                  error={!!errors?.max_travel_time?.message}
                  helperText={errors?.max_travel_time?.message}
                />
              </Stack>
              <Stack direction={'row'} alignItems={'center'} spacing={3}>
                <Grid container spacing={3}>
                  <Grid item xs={6}>
                    <InputFloating
                      label='Max Duration Visit'
                      type='number'
                      {...register('max_duration_visit')}
                      error={!!errors?.max_duration_visit?.message}
                      helperText={errors?.max_duration_visit?.message}
                    />
                  </Grid>
                </Grid>
              </Stack>
            </Stack>
          ) : (
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
          )}
        </Modal.Body>
        <Modal.Footer divider onCancel={onClose}>
          <Button type='submit' disabled={mutationSingle.isLoading || mutationBulk.isLoading}>
            {watch('modeAdd') === 'single' ? 'Submit' : 'Upload'}
            <Render in={mutationSingle.isLoading || mutationBulk.isLoading}>
              <CircularProgress sx={{ml: 2}} />
            </Render>
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
  );
};

export default ModalAddFrontliners;
