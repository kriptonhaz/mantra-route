import {SxProps} from '@mui/material/styles';
import {InputTextProps} from './InputText';
import {EditableInputTextProps} from './EditableInput';

interface StyleProps {
  root: SxProps;
  label: SxProps;
  input: SxProps;
  prefix: SxProps;
  adornement: SxProps;
  textError: SxProps;
}

interface EditableInputStyleProps {
  root: SxProps;
  label: SxProps;
  inputBox: SxProps;
  input: SxProps;
  prefix: SxProps;
  adornement: SxProps;
  textError: SxProps;
}

export const styles = (props: InputTextProps): StyleProps => ({
  root: {
    margin: '1rem 0',
  },
  label: {},
  adornement: {},
  input: {
    borderRadius: '8px',
  },
  textError: {
    color: '#DB4171',
  },
  prefix: {},
});

export const editableInputStyles = (props: EditableInputTextProps): EditableInputStyleProps => ({
  root: {
    margin: '1rem 0',
    '& > :first-of-type': {
      margin: '1rem 0',
      marginTop: '1rem',
      padding: '4px',
      border: props.errormsg ? '1px solid #DB4171' : '1px solid #D1D1D6',
      borderRadius: '8px',
      display: 'flex',
      alignItems: 'center',
      '& > :first-of-type': {
        marginLeft: '16px',
        color: '#70707B',
      },
      '& > :last-child': {
        marginRight: '16px',
        color: '#70707B',
      },
    },
  },
  label: {
    fontSize: 14,
    fontWeight: 400,
    color: '#51525C',
  },
  adornement: {},
  inputBox: {
    flexGrow: 1,
    marginLeft: '16px',
  },
  input: {
    fontSize: 16,
    fontWeight: 500,
  },
  textError: {
    color: '#DB4171',
  },
  prefix: {},
});
