export type Size = 'medium' | 'small';

export interface OptionType {
  label: string;
  value: string;
}

export interface InputProps {
  name: string;
  label: string;
  option?: OptionType[];
  type: string;
  style: {
    size: Size;
    fullWidth: boolean;
  };
}

export interface InputElementProps {
  name: string;
  type: string;
  option?: OptionType[];
  style: {
    size: Size;
    fullWidth: boolean;
  };
}
