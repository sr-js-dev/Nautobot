import { Grid } from '@mui/material';
import { InputElement } from './InputElement';
import { InputProps } from './type';

export const Input: React.FC<InputProps> = ({ label, name, style }) => {
  return (
    <Grid container justifyContent='flex-end' padding={2} spacing={1}>
      <Grid
        item
        xs={4}
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
        }}
      >
        {label}
      </Grid>
      <Grid item xs={8}>
        <InputElement name={name} style={style} />
      </Grid>
    </Grid>
  );
};
