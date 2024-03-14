import { ChangeEvent } from 'react';

export type Size = 'medium' | 'small';

export interface OptionType {
  label: string;
  value: number;
}

export interface InputProps {
  name: string;
  label: string;
  size?: 'small' | 'medium'; 
  fullWidth?: boolean;
  option?: OptionType[];
  type: string;
  value?: any;
  onChange?: (event: ChangeEvent<HTMLInputElement>, value: any) => void;
}

export interface InputElementProps {
  name: string;
  type: string;
  option?: OptionType[];
  size?: 'small' | 'medium' 
  fullWidth?: boolean;
  value?: any;
  onChange?: (event: ChangeEvent<HTMLInputElement>, value: any) => void;
}
