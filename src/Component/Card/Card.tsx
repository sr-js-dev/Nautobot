import { Card as MuiCard, CardContent, Typography } from '@mui/material';
import { CardProps } from './type';

export const Card: React.FC<CardProps> = ({ cardName, children }) => {
  return (
    <MuiCard>
      <CardContent sx={{ paddingY: 0, paddingX: 0 }}>
        <Typography
          variant='subtitle1'
          color='text.primary'
          bgcolor='#2E363C'
          padding={1}
          borderRadius='4px 4px 0 0'
          gutterBottom
        >
          {cardName}
        </Typography>
        {children}
      </CardContent>
    </MuiCard>
  );
};