import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import {
  TextField,
  Autocomplete,
  FormControl,
  MenuItem,
  Select,
} from '@mui/material';
import { TextareaAutosize as BaseTextareaAutosize } from '@mui/base';
import { styled } from '@mui/system';
import { InputElementProps } from './type';

export const InputElement: React.FC<InputElementProps> = ({
  name,
  type,
  option,
  size,
  fullWidth,
  value,
  onChange,
}) => {
  const blue = {
    100: '#DAECFF',
    200: '#b6daff',
    400: '#3399FF',
    500: '#007FFF',
    600: '#0072E5',
    900: '#003A75',
  };

  const grey = {
    50: '#F3F6F9',
    100: '#E5EAF2',
    200: '#DAE2ED',
    300: '#C7D0DD',
    400: '#B0B8C4',
    500: '#9DA8B7',
    600: '#6B7A90',
    700: '#434D5B',
    800: '#303740',
    900: '#1C2025',
  };

  const Textarea = styled(BaseTextareaAutosize)(
    ({}) => `
    box-sizing: border-box;
    width: 100%;
    min-height:'200px';
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 1.5;
    padding: 8px 12px;
    border-radius: 8px;
    color: ${grey[900]};
    background: '#fff';
    border: 1px solid ${grey[700]};
    box-shadow: 0px 2px 2px ${grey[50]};

    &:hover {
      border-color: ${blue[400]};
    }

    &:focus {
      border-color: ${blue[400]};
      box-shadow: 0 0 0 3px ${blue[200]};
    }

    // firefox
    &:focus-visible {
      outline: 0;
    }
  `
  );

  const { register, setValue, getValues, watch } = useFormContext();

  let InputComponent;
  const _options = option || [];
  
  const getOptionLabel = (option: any) => {
    return String(option.label); // Convert option to string
  };

  switch (type) {
    case 'text-field':
      InputComponent = (
        <Controller
          name={name}
          render={({ field }) => (
            <TextField
              {...field}
              {...register(name)}
              size={size}
              fullWidth={fullWidth}
            />
          )}
        />
      );
      break;
    case 'autocomplete':
      InputComponent = (
        <Controller
          name={name}
          render={({ field }) => (
            <Autocomplete
              value={watch(name)!=='' ? watch(name) : { value: 0, label: '' }}
              disablePortal
              id={name}
              size={size}
              options={_options}
              getOptionLabel={getOptionLabel}
              onChange={(event, option) => setValue(name, option)}
              renderInput={(params) => <TextField {...params} />}
            />
          )}
        />
      );
      break;
    case 'select':
      InputComponent = (
        <FormControl fullWidth={fullWidth}>
          <Controller
            name={name}
            render={({ field }) => (
              <Select
                {...field}
                {...register(name)}
                size={size}
                id={name}
              >
                {_options.map((item, index) => (
                  <MenuItem key={index} value={item.value}>
                    {item.label}
                  </MenuItem>
                ))}
              </Select>
            )}
          />
        </FormControl>
      );
      break;
    case 'textarea':
      InputComponent = (
        <Controller
          name={name}
          render={({ field }) => (
            <Textarea {...field} aria-label='empty textarea' />
          )}
        />
      );
      break;
    default:
      InputComponent = null;
  }
  return InputComponent;
};
