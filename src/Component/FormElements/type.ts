export type Size = 'medium' | 'small';

export interface InputProps {
  name: string;
  label: string;
  // control: any;
  style: {
    size: Size;
    fullWidth: boolean;
  };
}

export interface InputElementProps {
  name: string;
  // control: any;
  style: {
    size: Size;
    fullWidth: boolean;
  };
}
