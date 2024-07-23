import {Modal} from '@/components/Modal';
import {
  Box,
  Button,
  CircularProgress,
  Typography,
  ToggleButton,
  ToggleButtonGroup,
  Stack,
  Divider,
  Grid,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  FormHelperText,
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
import {useQueryClient} from '@tanstack/react-query';
import {
  IFormAddOutlet,
  IOutlets,
  IOutletsCsv,
  ModeAddEnum,
  TypeModeAdd,
} from '@/interface/outlets.interface';
import {useOutletsHook} from '@/hooks/use-outlets.hook';
import InputFloating from '@/components/InputFloating';
import {OffDayFrontliner} from '@/assets/data/frontliner';

export interface IModalAddOutletsProps {
  show: boolean;
  companyId: string;
  onClose: () => void;
}

const validationSchema = Yup.object().shape({
  modeAdd: Yup.string()
    .oneOf(Object.keys(ModeAddEnum) as TypeModeAdd[])
    .required(),
  outlet_id: Yup.string().when('modeAdd', {
    is: 'single',
    then: (schema) => schema.required('This field is required'),
    otherwise: (schema) => schema.nullable(),
  }),
  name: Yup.string().when('modeAdd', {
    is: 'single',
    then: (schema) => schema.required('This field is required'),
    otherwise: (schema) => schema.nullable(),
  }),
  must_visit_day: Yup.string().when('modeAdd', {
    is: 'single',
    then: (schema) => schema.nullable(),
    otherwise: (schema) => schema.nullable(),
  }),
  cycle: Yup.number().when('modeAdd', {
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
  interval: Yup.number().when('modeAdd', {
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
  frontliner_external_id: Yup.string().when('modeAdd', {
    is: 'single',
    then: (schema) => schema.required('This field is required'),
    otherwise: (schema) => schema.nullable(),
  }),
  off_day: Yup.string().when('modeAdd', {
    is: 'single',
    then: (schema) => schema.nullable(),
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
  company: Yup.string().required('This field is required'),
  csvFile: Yup.mixed().when('modeAdd', {
    is: 'bulk',
    then: (schema) => schema.required('This field is required'),
    otherwise: (schema) => schema.nullable(),
  }),
});

const ModalAddOutlets: React.FC<IModalAddOutletsProps> = ({show, onClose, companyId}) => {
  const queryClient = useQueryClient();
  const {postSingleAddOutletsCompanyMutation, postBulkAddOutletsCompanyMutation} = useOutletsHook();
  const {
    handleSubmit,
    control,
    reset,
    watch,
    setValue,
    register,
    formState: {errors},
  } = useForm<IFormAddOutlet>({
    mode: 'onChange',
    defaultValues: {
      modeAdd: 'single',
      off_day: '',
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

  const mutationSingle = postSingleAddOutletsCompanyMutation({
    onSuccess: () => {
      queryClient.invalidateQueries(['outlets', 'list', companyId]);
      onClose();
      reset();
    },
    onError(err) {
      console.log(err);
    },
  });

  const mutationBulk = postBulkAddOutletsCompanyMutation({
    onSuccess: () => {
      queryClient.invalidateQueries(['outlets', 'list', companyId]);
      onClose();
      reset();
    },
    onError(err) {
      console.log(err);
    },
  });

  const handleChangeModeAdd = (event: React.MouseEvent<HTMLElement>) => {
    const eTarget = event.target as React.ButtonHTMLAttributes<HTMLInputElement>;
    let tmpModeAdd = eTarget.value as 'single' | 'bulk';
    setValue('modeAdd', tmpModeAdd);
  };

  const onSubmit = handleSubmit((data) => {
    if (data.modeAdd === 'single') {
      mutationSingle.mutate(data);
    } else {
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
              company: companyId,
            };
          });
          mutationBulk.mutate(payload);
        },
        header: true, // Set to true if your CSV file has headers
      });
    }
  });

  return (
    <Modal open={show} onClose={onClose} containerProps={{sx: {maxWidth: '600px !important'}}}>
      <form onSubmit={onSubmit}>
        <Modal.Header title='Add Outlets' divider />
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
                  label='Outlet ID'
                  {...register('outlet_id')}
                  error={!!errors?.outlet_id?.message}
                  helperText={errors?.outlet_id?.message}
                />
                <InputFloating
                  label='Outlet Name'
                  {...register('name')}
                  error={!!errors?.name?.message}
                  helperText={errors?.name?.message}
                />
              </Stack>
              <Stack direction={'row'} alignItems={'center'} spacing={3}>
                <InputFloating
                  label='Must Visit Day'
                  {...register('must_visit_day')}
                  error={!!errors?.must_visit_day?.message}
                  helperText={errors?.must_visit_day?.message}
                />
                <InputFloating
                  label='Cycle'
                  type='number'
                  {...register('cycle')}
                  error={!!errors?.cycle?.message}
                  helperText={errors?.cycle?.message}
                />
              </Stack>
              <Stack direction={'row'} alignItems={'center'} spacing={3}>
                <InputFloating
                  label='Interval'
                  type='number'
                  {...register('interval')}
                  error={!!errors?.interval?.message}
                  helperText={errors?.interval?.message}
                />
                <InputFloating
                  label='Frontliner External ID'
                  {...register('frontliner_external_id')}
                  error={!!errors?.frontliner_external_id?.message}
                  helperText={errors?.frontliner_external_id?.message}
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
                <Grid container spacing={3}>
                  <Grid item xs={6}>
                    <FormControl fullWidth>
                      <InputLabel error={!!errors.off_day}>Off Day</InputLabel>
                      <Controller
                        control={control}
                        name='off_day'
                        render={({field: {onChange, value}}) => (
                          <Select
                            value={value}
                            label='Off Day'
                            error={!!errors.off_day}
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
                      {
                        <FormHelperText error={!!errors.off_day}>
                          {errors.off_day?.message}
                        </FormHelperText>
                      }
                    </FormControl>
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
                href='/outlets-template.csv'
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
          <Button type='submit' disabled={mutationBulk.isLoading}>
            {watch('modeAdd') === 'single' ? 'Submit' : 'Upload'}
            <Render in={mutationBulk.isLoading}>
              <CircularProgress sx={{ml: 2}} />
            </Render>
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
  );
};

export default ModalAddOutlets;
