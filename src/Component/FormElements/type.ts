export type Size = 'medium' | 'small';

export interface InputProps {
  name: string;
  label: string;
  size?: 'small' | 'medium'; 
  fullWidth?: boolean;
}

export interface InputElementProps {
  name: string;
  size?: 'small' | 'medium' 
  fullWidth?: boolean;
}
