import {Modal} from '@/components/Modal';
import {
  Button,
  CircularProgress,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Stack,
} from '@mui/material';
import React, {useEffect} from 'react';
import {useForm, Controller} from 'react-hook-form';
import * as Yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import Render from '@/components/Render';
import {useQueryClient} from '@tanstack/react-query';
import {PostCreateJobsType} from '@/interface/jobs.interface';
import {DatePicker, LocalizationProvider} from '@mui/x-date-pickers';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import {useJobsHook} from '@/hooks/use-jobs.hooks';
dayjs.extend(utc);
export interface IModalAddJobsProps {
  show: boolean;
  companyId: string;
  onClose: () => void;
}

const validationSchema = Yup.object().shape({
  company: Yup.string().required('This field is required'),
  generated_month: Yup.string().required('This field is required'),
});

const ModalAddJobs: React.FC<IModalAddJobsProps> = ({show, onClose, companyId}) => {
  const queryClient = useQueryClient();
  const {postCreateJobsCompanyMutation} = useJobsHook();
  const {
    handleSubmit,
    control,
    reset,
    watch,
    setValue,
    formState: {errors},
  } = useForm<PostCreateJobsType>({
    mode: 'onChange',
    defaultValues: {
      generated_month: dayjs().format('YYYY-MM'),
      resynchronize_distance: false,
      recounting_api: false,
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

  const mutation = postCreateJobsCompanyMutation({
    onSuccess: () => {
      queryClient.invalidateQueries(['job', 'list', companyId]);
      onClose();
      reset();
    },
    onError(err) {
      console.log(err);
    },
  });

  const onSubmit = handleSubmit((data) => {
    mutation.mutate(data);
  });

  return (
    <Modal open={show} onClose={onClose} containerProps={{sx: {maxWidth: '600px !important'}}}>
      <form onSubmit={onSubmit}>
        <Modal.Header title='Create Jobs' divider />
        <Modal.Body>
          <Stack rowGap={5}>
            <Stack direction={'row'} alignItems={'center'} spacing={3}>
              <FormControl fullWidth>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    views={['year', 'month']}
                    label='Month'
                    slotProps={{
                      textField: {
                        helperText: errors?.generated_month?.message,
                        error: !!errors?.generated_month?.message,
                      },
                    }}
                    value={dayjs.utc(watch('generated_month'))}
                    onChange={(date) => {
                      if (date) {
                        setValue('generated_month', dayjs(date).format('YYYY-MM'));
                      }
                    }}
                    sx={{width: '100%'}}
                    format='YYYY-MM'
                  />
                </LocalizationProvider>
              </FormControl>

              <FormControl fullWidth>
                <InputLabel error={!!errors.resynchronize_distance}>
                  Resynchronize Distance
                </InputLabel>
                <Controller
                  control={control}
                  name='resynchronize_distance'
                  render={({field: {onChange, value}}) => (
                    <Select
                      value={value ? '1' : '0'}
                      label='Resynchronize Distance'
                      error={!!errors.resynchronize_distance}
                      onChange={(e) => {
                        const target = e.target as HTMLInputElement;
                        if (target.value === '1') {
                          onChange(true);
                        } else {
                          onChange(false);
                        }
                      }}
                    >
                      <MenuItem value={'1'}>YES</MenuItem>
                      <MenuItem value={'0'}>NO</MenuItem>
                    </Select>
                  )}
                />
                {
                  <FormHelperText error={!!errors.resynchronize_distance}>
                    {errors.resynchronize_distance?.message}
                  </FormHelperText>
                }
              </FormControl>
            </Stack>
            <Stack direction={'row'} alignItems={'center'} spacing={3}>
              <Grid container spacing={3}>
                <Grid item xs={6}>
                  <FormControl fullWidth>
                    <InputLabel error={!!errors.recounting_api}>Recounting API</InputLabel>
                    <Controller
                      control={control}
                      name='recounting_api'
                      render={({field: {onChange, value}}) => (
                        <Select
                          value={value ? '1' : '0'}
                          label='Recounting API'
                          error={!!errors.recounting_api}
                          onChange={(e) => {
                            const target = e.target as HTMLInputElement;
                            if (target.value === '1') {
                              onChange(true);
                            } else {
                              onChange(false);
                            }
                          }}
                        >
                          <MenuItem value={'1'}>YES</MenuItem>
                          <MenuItem value={'0'}>NO</MenuItem>
                        </Select>
                      )}
                    />
                    {
                      <FormHelperText error={!!errors.recounting_api}>
                        {errors.recounting_api?.message}
                      </FormHelperText>
                    }
                  </FormControl>
                </Grid>
              </Grid>
            </Stack>
          </Stack>
        </Modal.Body>
        <Modal.Footer divider onCancel={onClose}>
          <Button type='submit' disabled={mutation.isLoading}>
            Create
            <Render in={mutation.isLoading}>
              <CircularProgress sx={{ml: 2}} />
            </Render>
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
  );
};

export default ModalAddJobs;
