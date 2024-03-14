import { ButtonProps as MuiButtonProps } from '@mui/material/Button';

export interface ButtonProps extends MuiButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
}
