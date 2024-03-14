import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { TextField } from '@mui/material';
import { InputElementProps } from './type';

export const InputElement: React.FC<InputElementProps> = ({ name, size, fullWidth }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <Controller
      name={name}
      render={({ field }) => (
        <TextField
          {...field}  
          {...register(name)}
          size={size ?? 'medium'}
          fullWidth={fullWidth}
        />
      )}
    />
  );
};
