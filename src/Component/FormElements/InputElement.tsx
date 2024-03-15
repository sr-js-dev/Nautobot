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
import theme from '../../theme';

export const InputElement: React.FC<InputElementProps> = ({
  name,
  type,
  option,
  size,
  fullWidth,
}) => {

  const Textarea = styled(BaseTextareaAutosize)`
    box-sizing: border-box;
    width: 100%;
    min-height: 200px; /* Removed quotes around value */
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 1.5;
    padding: 8px 12px;
    border-radius: 8px;
    color: ${theme.palette.secondary.dark};
    background: #fff; /* Removed quotes around value */
    border: 1px solid ${theme.palette.primary.main};
    box-shadow: 0px 2px 2px ${theme.palette.secondary.dark};

    &:hover {
      border-color: ${theme.palette.primary.main};
    }

    &:focus {
      border-color: ${theme.palette.primary.main};
      box-shadow: 0 0 0 3px ${theme.palette.primary.light};
    }

    /* firefox */
    &:focus-visible {
      outline: 0;
    }
  `;

  const { register, setValue, watch } = useFormContext();

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
              value={watch(name) && Object.keys(watch(name)).length !== 0 ? watch(name) : { value: 0, label: '-----' }}
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
              <Select {...field} {...register(name)} size={size} id={name}>
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
