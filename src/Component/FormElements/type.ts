export type Size = 'medium' | 'small';

export interface OptionType {
  label: string;
  value: string;
}

export interface InputProps {
  name: string;
  label: string;
  size?: 'small' | 'medium'; 
  fullWidth?: boolean;
  option?: OptionType[];
  type: string;
}

export interface InputElementProps {
  name: string;
  type: string;
  option?: OptionType[];
  size?: 'small' | 'medium' 
  fullWidth?: boolean;
}
