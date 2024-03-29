import { Grid, Typography } from '@mui/material';
import { InputElement } from './InputElement';
import { InputProps } from './type';

export const Input: React.FC<InputProps> = ({ label, name, size, fullWidth, option, type, onChange, value}) => {
  return (
    <Grid container spacing={1} alignItems="center">
      <Grid item xs={4}>
        <Typography align='right'>{label}</Typography>
      </Grid>
      <Grid item xs={8}>
        <InputElement
          name={name}
          size={size}
          fullWidth={fullWidth}
          type={type}
          option={option}
          onChange={onChange} 
          value={value} 
        />
      </Grid>
    </Grid>
  );
};