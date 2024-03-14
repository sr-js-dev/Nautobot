import { Card as MuiCard, CardContent, Typography } from '@mui/material';
import { CardProps } from './type';

export const Card: React.FC<CardProps> = ({ cardName, children }) => {
  return (
    <MuiCard>
      <CardContent style={{ paddingTop: 0, paddingLeft: 0, paddingRight: 0 }}>
        <Typography
          sx={{ fontSize: 14 }}
          color='#FFF'
          bgcolor='#2E363C'
          padding={1}
          gutterBottom
        >
          {cardName}
        </Typography>
        {children}
      </CardContent>
    </MuiCard>
  );
};
