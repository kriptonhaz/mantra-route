import Checkbox from '@/components/Checkbox';
import {Modal} from '@/components/Modal';
import Radio from '@/components/Radio';
import {ESorting, ProgrammeEventRequestType} from '@/interface/programmeEvents.interface';
import {Button, Grid, RadioGroup, Typography} from '@mui/material';
import React from 'react';
import {Controller, useForm} from 'react-hook-form';

const listStatus = ['Planned', 'Started'];
export interface IModalFilterProps {
  show: boolean;
  onClose: () => void;
  onApply: (data: Partial<ProgrammeEventRequestType>) => void;
  title?: string;
}
const ModalFilter: React.FC<IModalFilterProps> = ({show, onClose, onApply, title = 'Sort'}) => {
  const {control, handleSubmit, setValue} = useForm<Partial<ProgrammeEventRequestType>>({
    mode: 'onChange',
    defaultValues: {
      date: '',
      name: '',
      status: ['Planned'],
    },
  });

  const resetFilterFields = () => {
    setValue('date', '');
    setValue('name', '');
  };

  const onSubmit = handleSubmit((data) => {
    const finalParams: Partial<ProgrammeEventRequestType> = {
      ...data,
      status: data.status?.includes('All') ? listStatus : data.status,
    };
    onApply(finalParams);
  });

  return (
    <Modal open={show} onClose={onClose} containerProps={{sx: {maxWidth: '500px !important'}}}>
      <form onSubmit={onSubmit}>
        <Modal.Header divider title={title} />
        <Modal.Body>
          <Grid container spacing={4}>
            <Grid item md={6}>
              <Typography color='text.secondary' mb={3}>
                Date
              </Typography>
              <Controller
                control={control}
                name='date'
                render={({field: {onChange, value}}) => (
                  <RadioGroup
                    sx={{gap: '4px'}}
                    value={value}
                    onChange={(e) => {
                      resetFilterFields();
                      onChange(e.target.value as ESorting);
                    }}
                  >
                    <Radio label='Newest' value={ESorting.DESC} />
                    <Radio label='Oldest' value={ESorting.ASC} />
                  </RadioGroup>
                )}
              />
            </Grid>
            <Grid item md={6}>
              <Typography color='text.secondary' mb={3}>
                Name
              </Typography>
              <Controller
                control={control}
                name='name'
                render={({field: {onChange, value}}) => (
                  <RadioGroup
                    sx={{gap: '4px'}}
                    value={value}
                    onChange={(e) => {
                      resetFilterFields();
                      onChange(e.target.value as ESorting);
                    }}
                  >
                    <Radio label='A-Z' value={ESorting.ASC} />
                    <Radio label='Z-A' value={ESorting.DESC} />
                  </RadioGroup>
                )}
              />
            </Grid>
          </Grid>
        </Modal.Body>
        <Modal.Footer divider onCancel={onClose}>
          <Button type='submit'>Apply</Button>
        </Modal.Footer>
      </form>
    </Modal>
  );
};

export default ModalFilter;
